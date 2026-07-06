const registerWorker = require("./registerWorker");
const heartbeat = require("./heartbeat");
const claimJob = require("./claimJob");
const executeJob = require("./executeJob");
const offlineMonitor = require("./offlineMonitor");
async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {

  const worker = await registerWorker();

  console.log("Worker started:", worker.id);

  setInterval(() => heartbeat(worker.id), 5000);

  setInterval(() => {

    heartbeat(worker.id);

    offlineMonitor();

  },10000);

  while (true) {

    await prisma.worker.update({
    where: { id: worker.id },
    data: {
        status: "IDLE"
      }
    });

    const job = await claimJob(worker.id);

    await prisma.worker.update({
    where: { id: worker.id },
    data: {
        status: "BUSY"
      }
    });

    if (!job) {
      await sleep(3000);
      continue;
    }

    await executeJob(job);

  }


  process.on("SIGINT", async () => {

    console.log("Stopping worker...");

    await prisma.worker.update({
        where: {
            id: worker.id
        },
        data: {
            status: "OFFLINE"
        }
    });

    process.exit(0);

  });

  process.on("SIGTERM", async () => {

    await prisma.worker.update({
        where: {
            id: worker.id
        },
        data: {
            status: "OFFLINE"
        }
    });

    process.exit(0);

  });

}

main();