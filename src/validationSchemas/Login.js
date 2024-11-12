import { z } from "zod";

export const loginSchema = z.object({
    email: z
      .string()
      .trim()
      .min(1, { message: "email is required" })
      .email({ message: "Invalid email id" }),
    password: z
      .string()
      .trim()
      .min(1, { message: "password is required" })
      .min(5, { message: "password must be atleat 5 character" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  });