const prisma = require("../config/prisma");

async function heartbeat(workerId) {
  await prisma.worker.update({
    where: {
      id: workerId,
    },
    data: {
      lastHeartbeatAt: new Date(),
    },
  });

  await prisma.workerHeartbeat.create({
    data: {
      workerId,
    },
  });
}

module.exports = heartbeat;