const prisma = require("../config/prisma");

function calculateDelay(strategy, baseDelay, attempt) {
  switch (strategy) {
    case "FIXED":
      return baseDelay;

    case "LINEAR":
      return baseDelay * attempt;

    case "EXPONENTIAL":
      return baseDelay * Math.pow(2, attempt - 1);

    default:
      return baseDelay;
  }
}

async function retryJob(job) {
  const fullJob = await prisma.job.findUnique({
    where: {
      id: job.id,
    },
    include: {
      queue: {
        include: {
          retryPolicy: true,
        },
      },
    },
  });

  const retryPolicy = fullJob.queue.retryPolicy;

  const nextAttempt = fullJob.attempt + 1;

  if (nextAttempt > fullJob.maxAttempts) {
    return null;
  }

  const delay = calculateDelay(
    retryPolicy.strategy,
    retryPolicy.baseDelayMs,
    nextAttempt
  );

  const scheduledFor = new Date(Date.now() + delay);

  await prisma.job.update({
    where: {
      id: job.id,
    },
    data: {
      attempt: nextAttempt,
      status: "SCHEDULED",
      scheduledFor,
    },
  });

  return scheduledFor;
}

module.exports = retryJob;