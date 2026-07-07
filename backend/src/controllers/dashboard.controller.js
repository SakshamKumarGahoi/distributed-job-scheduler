const asyncHandler = require("../middleware/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const dashboardService = require("../services/dashboard.service");

exports.getDashboard = asyncHandler(async (req, res) => {

  const dashboard = await dashboardService.getDashboard(req.user.id);

  ApiResponse.success(res, dashboard);

});