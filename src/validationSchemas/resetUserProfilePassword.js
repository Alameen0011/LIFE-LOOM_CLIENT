import { z } from "zod";

export const ResetPasswordUserProfileSchema = z
  .object({
    currentPassword: z
      .string()
      .trim()
      .min(1, { message: "Current password is required" }),
    newPassword: z
      .string()
      .trim()
      .min(5, { message: "New password must be at least 5 characters" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });