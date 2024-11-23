import { z } from "zod";

export const offerSchema = z.object({
  name: z.string().min(1, "Offer name is required"),
  offerPercentage: z
    .string()
    .nonempty("Offer percentage is required")
    .transform((value) => parseFloat(value))
    .refine((value) => !isNaN(value) && value >= 0 && value <= 100, {
      message: "Value must be between 0 and 100",
    }),
  endDate: z
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
  offerType: z.enum(["category", "product"], "Offer type is required"),
  targetId: z.string().min(1, "Target ID is required"),
  targetName: z.string().min(1, "Target name is required"),
});
