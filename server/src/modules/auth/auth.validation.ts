import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must contain at least 3 characters")
    .max(20, "Name is too long"),

  email: z
    .email({error:"Please enter a valid email"})
    .transform((email) => email.trim().toLowerCase()),

  passwordHash: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .max(20, "Password is too long"),
});


export const loginSchema = z.object({
  email: z
    .email("Invalid email address")
    .transform((email) => email.trim().toLowerCase()),

  password: z
    .string()
    .min(1, "Password is required"),
});