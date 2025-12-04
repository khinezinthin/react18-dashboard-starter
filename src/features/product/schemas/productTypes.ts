// types/product.ts
import { z } from "zod";
import type { productSchema, productsResponseSchema } from "./productSchema";

export type params = {
  page?: number;
  size?: number;
  limit?: number;
};

export type Product = z.infer<typeof productSchema>;
export type ProductsResponse = z.infer<typeof productsResponseSchema>;
