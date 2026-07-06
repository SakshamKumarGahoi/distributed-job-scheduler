const asyncHandler = require("../middleware/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const queueService = require("../services/queue.service");

exports.create = asyncHandler(async (req, res) => {

  const queue = await queueService.createQueue(
    req.user.id,
    req.body
  );

  ApiResponse.success(res, queue, "Queue created", 201);

});

exports.getAll = asyncHandler(async (req, res) => {

  const queues = await queueService.getQueues(req.user.id);

  ApiResponse.success(res, queues);

});

exports.getOne = asyncHandler(async (req, res) => {

  const queue = await queueService.getQueue(
    req.user.id,
    req.params.id
  );

  ApiResponse.success(res, queue);

});

exports.update = asyncHandler(async (req, res) => {

  const queue = await queueService.updateQueue(
    req.user.id,
    req.params.id,
    req.body
  );

  ApiResponse.success(res, queue, "Queue updated");

});

exports.pause = asyncHandler(async (req, res) => {

  const queue = await queueService.pauseQueue(
    req.user.id,
    req.params.id
  );

  ApiResponse.success(res, queue, "Queue paused");

});

exports.resume = asyncHandler(async (req, res) => {

  const queue = await queueService.resumeQueue(
    req.user.id,
    req.params.id
  );

  ApiResponse.success(res, queue, "Queue resumed");

});