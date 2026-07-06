const prisma = require("../config/prisma");

async function claimJob(workerId) {

  const jobs = await prisma.$queryRawUnsafe(`
UPDATE "Job"
SET
    status='CLAIMED',
    "claimedBy"='${workerId}',
    "claimedAt"=NOW()
WHERE id = (
    SELECT id
    FROM "Job"
    WHERE status='QUEUED'
      AND (
            "scheduledFor" IS NULL
            OR "scheduledFor" <= NOW()
      )
    ORDER BY "createdAt"
    LIMIT 1
    FOR UPDATE SKIP LOCKED
)
RETURNING *;
`);

  return jobs[0] ?? null;

}

module.exports = claimJob;