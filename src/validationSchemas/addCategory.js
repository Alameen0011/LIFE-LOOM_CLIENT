import { z } from 'zod';



export const addCategorySchema  =z.object({
    categoryName: z.string()
    .trim() // Trim whitespace from both ends
    .min(1, "Category name is required") ,// Ensure it's not empty
    
  description: z.string()
    .trim() // Trim whitespace
    .min(10, "Description must be at least 10 characters long") // Min length validation



})