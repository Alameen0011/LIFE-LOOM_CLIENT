import {z} from "zod"


export const ResetPasswordSchema = z.object({
    currentPassword: z
    .string()
    .trim()
    .min(1, { message: "password is required" })
    .min(5, { message: "password must be atleat 5 character" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    newPassword:z
    .string()
    .trim()
    .min(1, { message: "New password is required" })
    .min(5, { message: "New password must be atleat 5 character" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z
    .string()
    .trim()
    .min(1, { message: "confirm password is required" })
    .min(5, { message: "password must be atleast 5 characters" }),
}).refine((data) => data.newPassword == data.confirmPassword, {
    message: "passsword does not match",
    path: ["confirmPassword"],
  });