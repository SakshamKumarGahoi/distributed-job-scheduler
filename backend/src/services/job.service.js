const prisma = require("../config/prisma");
const AppError = require("../utils/AppError");
const crypto = require("crypto");

async function createJob(userId, queueId, data) {
  // Verify queue belongs to current user
  const queue = await prisma.queue.findFirst({
    where: {
      id: queueId,
      project: {
        userId,
      },
    },
    include: {
      retryPolicy: true,
    },
  });

  if (!queue) {
    throw new AppError("Queue not found", 404);
  }

  if (queue.isPaused) {
    throw new AppError("Queue is paused", 400);
  }

  const status = data.scheduledFor ? "SCHEDULED" : "QUEUED";

  const job = await prisma.job.create({
    data: {
      queueId,
      createdById: userId,

      type: data.type,
      payload: data.payload,

      status,
      priority: data.priority,

      scheduledFor: data.scheduledFor
        ? new Date(data.scheduledFor)
        : null,

      cronExpr: data.cronExpr,
      cronIntervalMs: data.cronIntervalMs,

      maxAttempts: queue.retryPolicy?.maxRetries ?? 3,s
    },
  });

  return job;
}

async function getJobs(userId) {
  return prisma.job.findMany({
    where: {
      queue: {
        project: {
          userId,
        },
      },
    },
    include: {
      queue: true,
      executions: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

async function getJob(userId, jobId) {
  const job = await prisma.job.findFirst({
    where: {
      id: jobId,
      queue: {
        project: {
          userId,
        },
      },
    },
    include: {
      queue: true,
      executions: true,
      logs: true,
    },
  });

  if (!job) {
    throw new AppError("Job not found", 404);
  }

  return job;
}

module.exports = {
  createJob,
  getJobs,
  getJob,
};