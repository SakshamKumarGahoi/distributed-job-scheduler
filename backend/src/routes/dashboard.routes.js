const router = require("express").Router();

const auth = require("../middleware/auth");

const controller = require("../controllers/dashboard.controller");

router.use(auth);

router.get("/", controller.getDashboard);

module.exports = router;