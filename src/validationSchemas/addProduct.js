import { z } from 'zod';


// Zod validation schema
export const productSchema = z.object({
    productName: z.string().min(3).max(20),
    description: z.string().min(10),
    category: z.string().nonempty(),
    brand: z.string().nonempty(),
    gender: z.enum(["Men", "Women", "Kids", "Unisex"]),
    price: z.number().positive(),
    sizes: z.array(z.object({
      size: z.string().nonempty(),
      stock: z.number().min(0),
    })),
  
    sku: z.string().nonempty(),
    status: z.boolean(),
  });