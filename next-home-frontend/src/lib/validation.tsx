import { z } from "zod";

export const ListingSchemaClient = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title cannot exceed 100 characters" }),
  
  unitNumber: z
    .string()
    .min(1, { message: "Unit number is required" }),
  
  project: z
    .string()
    .min(3, { message: "Project name must be at least 3 characters long" }),

  price: z
    .string()
    .regex(/^\d+$/, { message: "Price must be a valid number" }),

  bedrooms: z
    .number({ invalid_type_error: "Bedrooms must be a number" })
    .min(1, { message: "At least 1 bedroom is required" })
    .max(10, { message: "Maximum 10 bedrooms are allowed" }),

  bathrooms: z
    .number({ invalid_type_error: "Bathrooms must be a number" })
    .min(1, { message: "At least 1 bathroom is required" })
    .max(10, { message: "Maximum 10 bathrooms are allowed" }),

  area: z
    .number({ invalid_type_error: "Area must be a number" })
    .min(20, { message: "Area must be at least 20 sqm" }),

  location: z
    .string()
    .min(3, { message: "Location must be at least 3 characters long" })
    .max(100, { message: "Location cannot exceed 100 characters" }),

  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(500, { message: "Description cannot exceed 500 characters" }),

  type: z.enum(["rent", "sale"], {
    required_error: "Type is required",
    invalid_type_error: "Type must be either 'rent' or 'sale'",
  }),

  image: z
    .string()
    .optional()
    .default(""),
});

export type ListingClientType = z.infer<typeof ListingSchemaClient>;
