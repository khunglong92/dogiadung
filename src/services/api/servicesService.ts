import { apiClient } from "./base";

export enum ServiceStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

export enum ThemeVariant {
  LIGHT = "light",
  DARK = "dark",
  AUTO = "auto",
}

export interface CompanyService {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  short_description: string;
  content: string;
  features: string;
  technologies: string;
  benefits: string;
  customers: string;
  image_urls: string[];
  icon: string;
  cta_label: string;
  cta_link: string;
  order_index: number;
  tags: string[];
  seo_title: string;
  seo_description: string;
  alt_text: string;
  status: ServiceStatus;
  theme_variant: ThemeVariant;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export type CreateServiceDto = Omit<
  CompanyService,
  "id" | "created_at" | "updated_at" | "deleted_at"
>;

export type UpdateServiceDto = Partial<CreateServiceDto>;

export interface PaginatedServicesResponse {
  data: CompanyService[];
  pagination: {
    total: number;
    page: number;
    perpage: number;
  };
}

export const servicesService = {
  create: (body: CreateServiceDto) =>
    apiClient.post<CompanyService>("/services", body),

  findAll: (params: { page?: number; perpage?: number; search?: string }) => {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.append("page", String(params.page));
    if (params.perpage) searchParams.append("perpage", String(params.perpage));
    if (params.search) searchParams.append("search", params.search);
    return apiClient.get<PaginatedServicesResponse>(
      `/services?${searchParams.toString()}`
    );
  },

  findFeatured: (params: { page?: number; perpage?: number }) => {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.append("page", String(params.page));
    if (params.perpage) searchParams.append("perpage", String(params.perpage));
    return apiClient.get<PaginatedServicesResponse>(
      `/services/featured?${searchParams.toString()}`
    );
  },

  findOne: (id: string) => apiClient.get<CompanyService>(`/services/${id}`),

  update: (id: string, body: UpdateServiceDto) =>
    apiClient.patch<CompanyService>(`/services/${id}`, body),

  remove: (id: string) => apiClient.delete<void>(`/services/${id}`),
};
