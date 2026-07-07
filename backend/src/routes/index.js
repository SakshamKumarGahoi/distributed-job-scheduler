const router = require("express").Router();

router.use("/auth", require("./auth.routes"));
router.use("/projects", require("./project.routes"));
router.use("/queues", require("./queue.routes"));
router.use("/", require("./job.routes"));
router.use("/workers", require("./worker.routes"));
router.use("/dashboard", require("./dashboard.routes"));
module.exports = router;