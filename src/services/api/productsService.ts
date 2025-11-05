import { apiClient } from './base';

export interface ProductCategoryRef { 
  id: number; 
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description?: Record<string, unknown> | null;
  technicalSpecs?: Record<string, unknown> | null;
  price?: number | null;
  warrantyPolicy?: string | null;
  images?: string[] | null;
  category: ProductCategoryRef;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductDto {
  name: string;
  description?: Record<string, unknown>;
  technicalSpecs?: Record<string, unknown>;
  price?: number;
  warrantyPolicy?: string;
  images?: string[];
  categoryId: number;
}

export interface UpdateProductDto {
  name?: string;
  description?: Record<string, unknown> | null;
  technicalSpecs?: Record<string, unknown> | null;
  price?: number | null;
  warrantyPolicy?: string | null;
  images?: string[] | null;
  categoryId?: number;
}

export const productsService = {
  getAll: async () => {
    const res = await apiClient.get<{ data: Product[]; total: number; page: number; limit: number }>("/products");
    return res.data;
  },
  getPaginated: (params: { page: number; limit: number; search?: string }) => {
    const query = new URLSearchParams();
    query.set("page", String(params.page));
    query.set("limit", String(params.limit));
    if (params.search && params.search.trim()) {
      query.set("search", params.search.trim());
    }
    return apiClient.get<{ data: Product[]; total: number; page: number; limit: number }>(`/products?${query.toString()}`);
  },
  getById: (id: number) => apiClient.get<Product>(`/products/${id}`),
  create: (body: CreateProductDto) => apiClient.post<Product>("/products", body),
  update: (id: number, body: UpdateProductDto) => apiClient.patch<Product>(`/products/${id}`, body),
  remove: (id: number) => apiClient.delete<void>(`/products/${id}`),
};
