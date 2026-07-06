const prisma = require("../config/prisma");
const os = require("os");

async function registerWorker() {
  return prisma.worker.create({
    data: {
      hostname: os.hostname(),
      version: "1.0.0",
      pid: process.pid,
      status: "IDLE",
      lastHeartbeatAt: new Date(),
    },
  });
}

module.exports = registerWorker;