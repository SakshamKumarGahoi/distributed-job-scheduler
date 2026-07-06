const router = require("express").Router();

router.use("/auth", require("./auth.routes"));
router.use("/projects", require("./project.routes"));
router.use("/queues", require("./queue.routes"));
module.exports = router;