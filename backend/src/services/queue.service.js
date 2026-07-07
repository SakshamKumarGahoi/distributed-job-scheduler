const prisma = require("../config/prisma");
const AppError = require("../utils/AppError");

/**
 * Create Queue
 */
async function createQueue(userId, data) {
  // Verify the project belongs to the logged-in user
  const project = await prisma.project.findFirst({
    where: {
      id: data.projectId,
      userId,
    },
  });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  // Reuse an existing retry policy if one matches
  let retryPolicy = await prisma.retryPolicy.findFirst({
    where: {
      strategy: data.retryPolicy.strategy,
      baseDelayMs: data.retryPolicy.baseDelayMs,
      maxRetries: data.retryPolicy.maxRetries,
    },
  });

  // Otherwise create it
  if (!retryPolicy) {
    retryPolicy = await prisma.retryPolicy.create({
      data: {
        strategy: data.retryPolicy.strategy,
        baseDelayMs: data.retryPolicy.baseDelayMs,
        maxRetries: data.retryPolicy.maxRetries,
      },
    });
  }

  // Create queue
  return prisma.queue.create({
    data: {
      name: data.name,
      projectId: data.projectId,
      concurrencyLimit: data.concurrencyLimit,
      retryPolicyId: retryPolicy.id,
    },
    include: {
      project: true,
      retryPolicy: true,
    },
  });
}

/**
 * Get all queues of the logged-in user
 */
async function getQueues(userId) {
  return prisma.queue.findMany({
    where: {
      project: {
        userId,
      },
    },
    include: {
      project: true,
      retryPolicy: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Get single queue
 */
async function getQueue(userId, queueId) {
  const queue = await prisma.queue.findFirst({
    where: {
      id: queueId,
      project: {
        userId,
      },
    },
    include: {
      project: true,
      retryPolicy: true,
    },
  });

  if (!queue) {
    throw new AppError("Queue not found", 404);
  }

  return queue;
}

/**
 * Update queue
 */
async function updateQueue(userId, queueId, data) {
  await getQueue(userId, queueId);

  return prisma.queue.update({
    where: {
      id: queueId,
    },
    data,
    include: {
      project: true,
      retryPolicy: true,
    },
  });
}

/**
 * Pause queue
 */
async function pauseQueue(userId, queueId) {
  await getQueue(userId, queueId);

  return prisma.queue.update({
    where: {
      id: queueId,
    },
    data: {
      isPaused: true,
    },
  });
}

/**
 * Resume queue
 */
async function resumeQueue(userId, queueId) {
  await getQueue(userId, queueId);

  return prisma.queue.update({
    where: {
      id: queueId,
    },
    data: {
      isPaused: false,
    },
  });
}

async function getQueueStats(userId, queueId) {

  const queue = await prisma.queue.findFirst({
    where: {
      id: queueId,
      project: {
        userId,
      },
    },
  });

  if (!queue) {
    throw new AppError("Queue not found", 404);
  }

  const grouped = await prisma.job.groupBy({
    by: ["status"],
    where: {
      queueId,
    },
    _count: {
      status: true,
    },
  });

  const stats = {
    QUEUED: 0,
    SCHEDULED: 0,
    CLAIMED: 0,
    RUNNING: 0,
    COMPLETED: 0,
    FAILED: 0,
    DEAD: 0,
  };

  grouped.forEach((row) => {
    stats[row.status] = row._count.status;
  });

  return stats;
}

module.exports = {
    createQueue,
    getQueues,
    getQueue,
    updateQueue,
    pauseQueue,
    resumeQueue,
    getQueueStats
}