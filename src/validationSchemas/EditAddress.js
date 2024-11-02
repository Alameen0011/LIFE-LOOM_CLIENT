import {z} from "zod"



export const EditAddressSchema = z.object({

      state: z
      .string()
      .trim()
      .min(1,{message:"state is required"})
      .regex(/^[A-Za-z\s]+$/,{message: "state can only contain letters"}),
      district:z
      .string()
      .trim()
      .min(1, {message:"district is required"})
      .regex(/^[A-Za-z\s]+$/,{message:"district can only contain letters"}),
      city:z
      .string()
      .trim()
      .min(1,{message:"city is required"})
      .regex(/^[A-Za-z\s]+$/,{message:"city can only contain letters"}),
      address:z
      .string()
      .min(3,{message:"Address is required"}),
      addressName:z
      .string()
      .min(2,{message:"Address Type is required"}),
      pincode:z
      .string()
      .length(6, { message: 'Pincode must be 6 digits' })
      .regex(/^\d+$/, { message: 'Pincode must only contain numbers' }),


    
})