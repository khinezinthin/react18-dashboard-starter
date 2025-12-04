// schemas/product.schema.ts
import { z } from "zod";

export const reviewSchema = z.object({
  rating: z.number(),
  comment: z.string(),
  date: z.string(), // ISO string
  reviewerName: z.string(),
  reviewerEmail: z.string(),
});

export const dimensionsSchema = z.object({
  width: z.number(),
  height: z.number(),
  depth: z.number(),
});

export const metaSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  barcode: z.string(),
  qrCode: z.string().url(),
});

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  tags: z.array(z.string()),
  brand: z.string(),
  sku: z.string(),
  weight: z.number(),
  dimensions: dimensionsSchema,
  warrantyInformation: z.string(),
  shippingInformation: z.string(),
  availabilityStatus: z.string(),
  reviews: z.array(reviewSchema),
  returnPolicy: z.string(),
  minimumOrderQuantity: z.number(),
  meta: metaSchema,
  images: z.array(z.string().url()),
  thumbnail: z.string().url(),
});

export const productsResponseSchema = z.object({
  products: z.array(productSchema),
});
