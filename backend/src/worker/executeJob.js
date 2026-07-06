const prisma = require("../config/prisma");
const retryJob = require("./retryJob");

async function executeJob(job) {
  const startedAt = new Date();

  // Create execution record
  const execution = await prisma.jobExecution.create({
    data: {
      jobId: job.id,
      workerId: job.claimedBy,
      startedAt,
      status: "RUNNING",
    },
  });

  // Log start
  await prisma.jobLog.create({
    data: {
      jobId: job.id,
      level: "INFO",
      message: `Started execution of ${job.type}`,
    },
  });

  // Mark job running
  await prisma.job.update({
    where: {
      id: job.id,
    },
    data: {
      status: "RUNNING",
    },
  });

  console.log(`Executing ${job.type}`);

  try {
    // Simulate execution time
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 40% failure chance
    const shouldFail = Math.random() < 0.4;

    if (shouldFail) {
      throw new Error("Simulated worker failure");
    }

    const finishedAt = new Date();

    // Complete Job
    await prisma.job.update({
      where: {
        id: job.id,
      },
      data: {
        status: "COMPLETED",
      },
    });

    // Update execution history
    await prisma.jobExecution.update({
      where: {
        id: execution.id,
      },
      data: {
        status: "SUCCESS",
        finishedAt,
        durationMs: finishedAt.getTime() - startedAt.getTime(),
      },
    });

    // Log success
    await prisma.jobLog.create({
      data: {
        jobId: job.id,
        level: "INFO",
        message: "Job completed successfully",
      },
    });

    console.log(`Completed ${job.id}`);
  } catch (err) {
    console.log(`Job ${job.id} failed`);

    const finishedAt = new Date();

    // Update execution history
    await prisma.jobExecution.update({
      where: {
        id: execution.id,
      },
      data: {
        status: "FAILED",
        finishedAt,
        durationMs: finishedAt.getTime() - startedAt.getTime(),
        errorMessage: err.message,
      },
    });

    // Log failure
    await prisma.jobLog.create({
      data: {
        jobId: job.id,
        level: "ERROR",
        message: err.message,
      },
    });

    // Retry
    const nextRun = await retryJob(job);

    if (nextRun) {
      console.log(`Retry scheduled at ${nextRun}`);
    } else {
      console.log("Maximum retries exceeded.");

      // Mark job DEAD
      await prisma.job.update({
        where: {
          id: job.id,
        },
        data: {
          status: "DEAD",
        },
      });

      // Insert into Dead Letter Queue
      await prisma.deadLetterQueue.create({
        data: {
          jobId: job.id,
          reason: err.message,
        },
      });

      // Log DLQ
      await prisma.jobLog.create({
        data: {
          jobId: job.id,
          level: "ERROR",
          message: "Moved to Dead Letter Queue",
        },
      });
    }
  }
}

module.exports = executeJob;