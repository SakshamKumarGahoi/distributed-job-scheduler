const asyncHandler = require("../middleware/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const projectService = require("../services/project.service");

exports.create = asyncHandler(async(req,res)=>{

    const project = await projectService.createProject(
        req.user.id,
        req.body
    );

    ApiResponse.success(
        res,
        project,
        "Project created",
        201
    );

});

exports.getAll = asyncHandler(async(req,res)=>{

    const projects = await projectService.getProjects(
        req.user.id
    );

    ApiResponse.success(
        res,
        projects
    );

});

exports.getOne = asyncHandler(async(req,res)=>{

    const project = await projectService.getProjectById(
        req.user.id,
        req.params.id
    );

    ApiResponse.success(
        res,
        project
    );

});

exports.update = asyncHandler(async(req,res)=>{

    const project = await projectService.updateProject(
        req.user.id,
        req.params.id,
        req.body
    );

    ApiResponse.success(
        res,
        project,
        "Project updated"
    );

});

exports.delete = asyncHandler(async(req,res)=>{

    await projectService.deleteProject(
        req.user.id,
        req.params.id
    );

    ApiResponse.success(
        res,
        {},
        "Project deleted"
    );

});