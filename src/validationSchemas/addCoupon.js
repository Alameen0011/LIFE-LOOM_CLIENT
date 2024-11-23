import { z } from "zod";

const couponSchema = z.object({
  code: z
    .string()
    .min(1, "Coupon code is required")
    .regex(
      /^[A-Z0-9]+$/,
      "Coupon code must contain only uppercase letters and numbers"
    ),

  description: z
    .string()
    .min(1, "description is required")
    .max(50, "Description cannot exceed 50 characters"),

  discountValue: z
    .string()
    .nonempty("Discount value is required")
    .transform((value) => parseFloat(value))
    .refine((value) => !isNaN(value) && value >= 0 && value <= 100, {
      message: "Discount value must be between 0 and 100",
    }),

  minPurchaseAmount: z
    .string()
    .transform((value) => parseFloat(value)) // Transform to number
    .refine((value) => !isNaN(value) && value >= 0, {
      message: "Minimum purchase amount must be 0 or greater",
    }),

  maxDiscountAmount: z
    .string()
    .transform((value) => parseFloat(value)) // Transform to number
    .refine((value) => !isNaN(value) && value >= 0, {
      message: "Maximum discount amount must be 0 or greater",
    }),

  expiryDate: z
    .preprocess(
      (value) => {
        if (typeof value === "string" && value.trim() === "") {
          return null; // Handle empty string as invalid
        }
        if (typeof value !== "string" && !(value instanceof Date)) {
          return null; // Return null for unexpected types
        }
        const date = typeof value === "string" ? new Date(value) : value;
        return date instanceof Date && !isNaN(date) ? date : null;
      },
      z.date({
        required_error: "Expiry date is required",
        invalid_type_error: "Expiry date must be a valid date",
      })
    )
    .refine(
      (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to the start of the current day
        return date >= today;
      },
      {
        message: "Expiry date must be in the future",
      }
    )
    .transform((date) => date.toISOString()),
  usageLimit: z
    .string() // Expecting the input as a string
    .transform((value) => parseInt(value)) // Transform to number
    .refine((value) => !isNaN(value) && value >= 1, {
      message: "Usage limit must be 1 or greater",
    }),
});

export default couponSchema;
