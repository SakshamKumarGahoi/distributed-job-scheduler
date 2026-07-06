const AppError = require("../utils/AppError");

module.exports = (err, req, res, next) => {

    console.error(err);

    if (err.name === "ZodError") {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: err.issues,
        });
    }

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
};