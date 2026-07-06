const router = require("express").Router();

const auth = require("../middleware/auth");
const validate = require("../middleware/validate");

const controller = require("../controllers/queue.controller");

const {
  createQueueSchema,
  updateQueueSchema,
} = require("../validators/queue.validator");

router.use(auth);

router.post(
  "/",
  validate(createQueueSchema),
  controller.create
);

router.get("/", controller.getAll);

router.get("/:id", controller.getOne);

router.patch(
  "/:id",
  validate(updateQueueSchema),
  controller.update
);

router.patch("/:id/pause", controller.pause);

router.patch("/:id/resume", controller.resume);

module.exports = router;