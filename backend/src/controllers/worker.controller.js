const asyncHandler = require("../middleware/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const workerService = require("../services/worker.service");

exports.getAll = asyncHandler(async (req, res) => {

  const workers = await workerService.getWorkers();

  ApiResponse.success(res, workers);

});