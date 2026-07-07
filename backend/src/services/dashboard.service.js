const prisma = require("../config/prisma");

async function getDashboard(userId) {

  const [projects, queues, jobs, workers] = await Promise.all([

    prisma.project.count({
      where: {
        userId,
      },
    }),

    prisma.queue.count({
      where: {
        project: {
          userId,
        },
      },
    }),

    prisma.job.count({
      where: {
        queue: {
          project: {
            userId,
          },
        },
      },
    }),

    prisma.worker.count(),

  ]);

  return {
    projects,
    queues,
    jobs,
    workers,
  };

}

module.exports = {
  getDashboard,
};