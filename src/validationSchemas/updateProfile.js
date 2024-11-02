import {z} from  "zod"


export const profileSchema =  z
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
    .regex(/^[0-9]+$/, { message: "Phone number must contain only digits" })
})