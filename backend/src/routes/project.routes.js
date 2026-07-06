const router = require("express").Router();

const auth = require("../middleware/auth");
const validate = require("../middleware/validate");

const controller = require("../controllers/project.controller");

const {
    createProjectSchema,
    updateProjectSchema,
} = require("../validators/project.validator");

router.use(auth);

router.post(
    "/",
    validate(createProjectSchema),
    controller.create
);

router.get(
    "/",
    controller.getAll
);

router.get(
    "/:id",
    controller.getOne
);

router.patch(
    "/:id",
    validate(updateProjectSchema),
    controller.update
);

router.delete(
    "/:id",
    controller.delete
);

module.exports = router;