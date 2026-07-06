const authService = require("../services/auth.service");
const asyncHandler = require("../middleware/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

exports.register = asyncHandler(async (req, res) => {
  const result = await authService.register(
    req.body.email,
    req.body.password
  );

  ApiResponse.success(
    res,
    result,
    "User registered successfully",
    201
  );
});

exports.login = asyncHandler(async (req, res) => {
  const result = await authService.login(
    req.body.email,
    req.body.password
  );

  ApiResponse.success(
    res,
    result,
    "Login successful"
  );
});