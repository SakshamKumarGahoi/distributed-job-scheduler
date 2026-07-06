const prisma = require("../config/prisma");

async function offlineMonitor() {

    const cutoff = new Date(Date.now() - 15000);

    await prisma.worker.updateMany({

        where: {
            lastHeartbeatAt: {
                lt: cutoff
            }
        },

        data: {
            status: "OFFLINE"
        }

    });

}

module.exports = offlineMonitor;