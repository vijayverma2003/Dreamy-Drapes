import { z } from "zod";

export const collectionSchema = z.object({
  name: z
    .string()
    .max(256, "Name should be less than 256 characters")
    .min(1, "Name is required"),
});

export const productSchema = z.object({
  name: z
    .string()
    .max(256, "Name should be less than 256 characters")
    .min(1, "Name is required"),
  description: z
    .string()
    .max(5120, "Description should be less than 5120 characters")
    .min(1, "Description is required"),
  price: z
    .number({ invalid_type_error: "Price is required" })
    .min(0, "Price should be greater than 0"),
  inventory: z.number({ invalid_type_error: "Inventory is required" }),
  collectionId: z.number().optional().nullable(),
});

export const productImageSchema = z.object({
  image: z.string(),
});
