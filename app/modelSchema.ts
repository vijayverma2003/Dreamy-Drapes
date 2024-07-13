import { z } from "zod";

export const collectionSchema = z.object({
  name: z
    .string()
    .max(256, "Name should be less than 256 characters")
    .min(1, "Name is required"),
});
