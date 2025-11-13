import { apiClient } from "./base";

export interface ProductCategoryRef {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description?: ProductDescription;
  technicalSpecs?: string;
  price?: number | null;
  warrantyPolicy?: string | null;
  images?: string[] | null;
  category: ProductCategoryRef;
  createdAt?: string;
  updatedAt?: string;
  isFeatured?: boolean;
}
export interface ProductDescription {
  overview?: string;
  details?: string;
}

export interface CreateProductDto {
  name: string;
  description?: Record<string, unknown>;
  technicalSpecs?: Record<string, unknown>;
  price?: number;
  warrantyPolicy?: string;
  images?: string[];
  categoryId: number;
  isFeatured?: boolean;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  technicalSpecs?: string;
  price?: number | null;
  warrantyPolicy?: string | null;
  images?: string[] | null;
  categoryId?: number;
  isFeatured?: boolean;
}

export interface FeaturedProductsResponse {
  pagination: {
    total: number;
    page: number;
    perpage: number;
  };
  data: Product[];
}

export const productsService = {
  findAll: (params: {
    page?: number;
    limit?: number;
    categoryId?: number;
    search?: string;
  }) => {
    const query = new URLSearchParams();
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));
    if (params.categoryId) query.set("categoryId", String(params.categoryId));
    if (params.search && params.search.trim()) {
      query.set("search", params.search.trim());
    }
    return apiClient.get<{
      data: Product[];
      total: number;
      page: number;
      limit: number;
    }>(`/products?${query.toString()}`);
  },
  getById: (id: number) => apiClient.get<Product>(`/products/${id}`),
  getFeatured: (params: { page: number; perpage: number }) => {
    const query = new URLSearchParams();
    query.set("page", String(params.page));
    query.set("perpage", String(params.perpage));
    return apiClient.get<FeaturedProductsResponse>(
      `/products/featured?${query.toString()}`
    );
  },
  create: (body: CreateProductDto) =>
    apiClient.post<Product>("/products", body),
  update: (id: number, body: UpdateProductDto) =>
    apiClient.patch<Product>(`/products/${id}`, body),
  remove: (id: number) => apiClient.delete<void>(`/products/${id}`),
};
