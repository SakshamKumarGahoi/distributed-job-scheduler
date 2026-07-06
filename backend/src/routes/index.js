const router = require("express").Router();

router.use("/auth", require("./auth.routes"));
router.use("/projects", require("./project.routes"));
module.exports = router;