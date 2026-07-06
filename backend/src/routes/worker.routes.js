const router = require("express").Router();

const auth = require("../middleware/auth");
const controller = require("../controllers/worker.controller");

router.use(auth);

router.get("/", controller.getAll);

module.exports = router;