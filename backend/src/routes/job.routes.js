const router = require("express").Router();

const auth = require("../middleware/auth");
const validate = require("../middleware/validate");

const controller = require("../controllers/job.controller");

const {
  createJobSchema,
} = require("../validators/job.validator");

router.use(auth);

// Create Job
router.post(
  "/queues/:queueId/jobs",
  validate(createJobSchema),
  controller.create
);

// Get All Jobs
router.get(
  "/jobs",
  controller.getAll
);

// Get One Job
router.get(
  "/jobs/:id",
  controller.getOne
);

module.exports = router;