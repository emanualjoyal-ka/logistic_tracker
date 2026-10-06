import {z} from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});


export const registerSchema = z.object({
  name: z.string().min(3, "Username must be atleast 3 characters").max(20,"username cannot exceed 20 characters"),
  email: z.email({error:"Please enter a valid email"}),
  password: z.string().min(8, "Password must be at least 8 characters").max(20,"Password cannot not exceed 20 characters"),
});