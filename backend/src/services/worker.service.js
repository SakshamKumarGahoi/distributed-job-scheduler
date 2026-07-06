const prisma = require("../config/prisma");

async function getWorkers() {
  return prisma.worker.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

module.exports = {
  getWorkers,
};