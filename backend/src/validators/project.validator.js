const { z } = require("zod");

const createProjectSchema = z.object({
    name: z.string().min(3).max(100)
});

const updateProjectSchema = z.object({
    name: z.string().min(3).max(100)
});

module.exports = {
    createProjectSchema,
    updateProjectSchema,
};