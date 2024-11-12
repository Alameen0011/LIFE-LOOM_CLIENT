import { z } from "zod";

  //Form vaidation - zod and resolver - we have to create schema
 export const registerSchema = z
    .object({
      firstName: z
      .string()
      .min(3, { message: "First name is required" })
      .regex(/^[A-Za-z\s]+$/, { message: "First name can only contain letters" }),
      lastName: z
      .string()
      .min(3, { message: "last is required" })
      .regex(/^[A-Za-z\s]+$/, { message: "last name can only contain letters" }),
      email: z
        .string()
        .trim()
        .min(1, { message: "email is required" })
        .email({ message: "Invalid email id" }),
      phone: z
        .string()
        .trim()
        .min(1, { message: "phone is required" })
        .min(10, { message: "Number must be atleast 10 characters" })
        .max(10,{message:"Number cannot be more than 10 characters"})
        .regex(/^[0-9]+$/, { message: "Phone number must contain only digits" }),
      password: z
        .string()
        .trim()
        .min(1, { message: "password is required" })
        .min(5, { message: "password must be atleat 5 character" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" }),
      confirmPassword: z
        .string()
        .trim()
        .min(1, { message: "confirm password is required" })
        .min(5, { message: "password must be atleast 5 characters" }),
    })
    .refine((data) => data.password == data.confirmPassword, {
      message: "passsword does not match",
      path: ["confirm password"],
    });