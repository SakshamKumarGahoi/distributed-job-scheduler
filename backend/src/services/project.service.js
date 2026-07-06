const prisma = require("../config/prisma");
const AppError = require("../utils/AppError");

async function createProject(userId, data) {

    return prisma.project.create({
        data: {
            name: data.name,
            userId,
        },
    });

}

async function getProjects(userId) {

    return prisma.project.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

}

async function getProjectById(userId, projectId) {

    const project = await prisma.project.findFirst({
        where: {
            id: projectId,
            userId,
        },
    });

    if (!project)
        throw new AppError("Project not found",404);

    return project;

}

async function updateProject(userId, projectId, data){

    await getProjectById(userId, projectId);

    return prisma.project.update({
        where:{
            id:projectId,
        },
        data,
    });

}

async function deleteProject(userId, projectId){

    await getProjectById(userId, projectId);

    await prisma.project.delete({
        where:{
            id:projectId,
        },
    });

}

module.exports={
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
}