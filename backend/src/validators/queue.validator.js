const { z } = require("zod");

const retryPolicySchema = z.object({
  strategy: z.enum(["FIXED", "LINEAR", "EXPONENTIAL"]),
  baseDelayMs: z.number().int().positive(),
  maxRetries: z.number().int().nonnegative(),
});

const createQueueSchema = z.object({
  projectId: z.string().uuid(),
  name: z.string().min(3).max(100),
  concurrencyLimit: z.number().int().positive(),
  retryPolicy: retryPolicySchema,
});

const updateQueueSchema = z.object({
  name: z.string().min(3).max(100).optional(),
  concurrencyLimit: z.number().int().positive().optional(),
});

module.exports = {
  createQueueSchema,
  updateQueueSchema,
};