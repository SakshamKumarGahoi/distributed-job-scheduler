const { z } = require("zod");

const createQueueSchema = z.object({
  projectId: z.string().uuid(),
  name: z.string().min(3).max(100),
  concurrencyLimit: z.number().int().positive(),
  retryPolicyId: z.string().uuid().optional(),
});

const updateQueueSchema = z.object({
  name: z.string().min(3).max(100).optional(),
  concurrencyLimit: z.number().int().positive().optional(),
  retryPolicyId: z.string().uuid().optional(),
});

module.exports = {
  createQueueSchema,
  updateQueueSchema,
};