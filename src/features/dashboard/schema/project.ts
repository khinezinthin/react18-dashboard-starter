import z from "zod";

export const PROJECT_STATUSES = ["draft", "active", "finished"] as const;

export const projectSchema = z.object({
  name: z.string().min(1),
  status: z.enum(PROJECT_STATUSES),
  description: z.string().optional().default(""),
  password: z.string().optional().default(""),
  confirmPassword: z.string().optional().default(""),
  image: z.any().optional(),
  image2: z.any().optional(),
  notifications: z.object({
    email: z.boolean(),
    sms: z.boolean(),
    push: z.boolean(),
  }),
  users: z
    .array(z.object({ email: z.email() }))
    .min(1)
    .max(5),
});
