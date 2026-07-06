const prisma = require("../config/prisma");
const AppError = require("../utils/AppError");

async function createQueue(userId, data) {

  const project = await prisma.project.findFirst({
    where: {
      id: data.projectId,
      userId,
    },
  });

  if (!project)
    throw new AppError("Project not found", 404);

  return prisma.queue.create({
    data: {
      projectId: data.projectId,
      name: data.name,
      concurrencyLimit: data.concurrencyLimit,
      retryPolicyId: data.retryPolicyId,
    },
  });

}

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

async function getQueue(userId, queueId) {

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

  if (!queue)
    throw new AppError("Queue not found", 404);

  return queue;

}

async function updateQueue(userId, queueId, data) {

  await getQueue(userId, queueId);

  return prisma.queue.update({
    where: {
      id: queueId,
    },
    data,
  });

}

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

module.exports = {
  createQueue,
  getQueues,
  getQueue,
  updateQueue,
  pauseQueue,
  resumeQueue,
};