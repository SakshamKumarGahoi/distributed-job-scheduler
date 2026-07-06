const asyncHandler = require("../middleware/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const jobService = require("../services/job.service");

exports.create = asyncHandler(async (req, res) => {
  const job = await jobService.createJob(
    req.user.id,
    req.params.queueId,
    req.body
  );

  ApiResponse.success(
    res,
    job,
    "Job created",
    201
  );
});

exports.getAll = asyncHandler(async (req, res) => {
  const jobs = await jobService.getJobs(req.user.id);

  ApiResponse.success(res, jobs);
});

exports.getOne = asyncHandler(async (req, res) => {
  const job = await jobService.getJob(
    req.user.id,
    req.params.id
  );

  ApiResponse.success(res, job);
});