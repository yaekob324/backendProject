import * as z from "zod";

export const loginSchema = z.object({
    email: z.string().email().trim().toLowerCase(),
    password: z.string().min(8,"the password must be at least 8 characters long").regex(/^[a-zA-Z0-9_]+$/,"the password can only contain letters, numbers and underscores").trim()
});

export const registerSchema = z.object({
    name: z.string().min(2,"the name must be at least 2 characters long").max(50,"the name must be at most 50 characters long").trim(),
    email: z.string().email().trim().toLowerCase(),
    password: z.string().min(8,"the password must be at least 8 characters long").regex(/^[a-zA-Z0-9_]+$/,"the password can only contain letters, numbers and underscores").trim()
});

export type loginType=z.infer<typeof loginSchema>;
export type registerType=z.infer<typeof registerSchema>;