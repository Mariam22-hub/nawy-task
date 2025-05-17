import { z } from "zod";

export const ListingSchemaDTO = z.object({
  _id: z
    .string()
    .optional(),
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
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
    .number()
    .min(1, { message: "At least 1 bedroom is required" })
    .max(10, { message: "Maximum 10 bedrooms are allowed" }),
  bathrooms: z
    .number()
    .min(1, { message: "At least 1 bathroom is required" })
    .max(10, { message: "Maximum 10 bathrooms are allowed" }),
  area: z
    .number()
    .min(20, { message: "Area must be at least 20 sqm" }),
  location: z
    .string()
    .min(3, { message: "Location must be at least 3 characters long" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
  image: z
    .union([
      z.string().url({ message: "Image must be a valid URL" }),
      z.literal("")
    ])
    .optional(),
  type: z
    .enum(["rent", "sale"], { required_error: "Type is required" }),
});

export type ListingTypeDTO = z.infer<typeof ListingSchemaDTO>