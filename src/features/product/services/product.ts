import api from "@/lib/axios";
import type {
  params,
  Product,
  ProductsResponse,
} from "../schemas/productTypes";

export const getProducts = async (params?: params) => {
  const res = await api.get<ProductsResponse>("/products", {
    params: {
      page: params?.page ?? 1,
      size: params?.size ?? 10,
      limit: params?.limit ?? 10
    },
  });
  return res.data;
};

export const getProduct = async (id: number) => {
  const res = await api.get<ProductsResponse>(`/products/${id}`);
  return res.data;
};

export const createProduct = async (data: { name: string }) => {
  const res = await api.post<Product>("/products", data);
  return res.data;
};

export const updateProduct = async ({
  id,
  data,
}: {
  id: number;
  data: { name: string };
}) => {
  const res = await api.put<Product>(`/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id: number) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};
