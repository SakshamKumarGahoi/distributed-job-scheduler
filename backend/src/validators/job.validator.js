const { z } = require("zod");

const createJobSchema = z.object({
  type: z.string().min(2),

  payload: z.record(z.any()).default({}),

  priority: z.enum([
    "LOW",
    "NORMAL",
    "HIGH"
    ]).default("NORMAL"),

  scheduledFor: z.string().datetime().optional(),

  cronExpr: z.string().optional(),

  cronIntervalMs: z.number().int().positive().optional(),
});

module.exports = {
  createJobSchema,
};