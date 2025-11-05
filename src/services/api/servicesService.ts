import { apiClient } from "./base";

export interface CompanyService {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  content?: string | null;
  image?: string | null;
  order: number;
  isActive: boolean;
  parent?: CompanyService | null;
  children?: CompanyService[];
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface CreateServiceDto {
  name: string;
  slug: string;
  description?: string | null;
  content?: string | null;
  image?: string | null;
  order?: number;
  isActive?: boolean;
  parentId?: string | null;
}

export interface UpdateServiceDto {
  name?: string;
  slug?: string;
  description?: string | null;
  content?: string | null;
  image?: string | null;
  order?: number;
  isActive?: boolean;
  parentId?: string | null;
}

export const servicesService = {
  create: (body: CreateServiceDto) => apiClient.post<CompanyService>("/services", body),
  getAll: (parentId?: string) =>
    apiClient.get<CompanyService[]>(parentId ? `/services?parent_id=${parentId}` : "/services"),
  getById: (id: string) => apiClient.get<CompanyService>(`/services/${id}`),
  update: (id: string, body: UpdateServiceDto) => apiClient.patch<CompanyService>(`/services/${id}`, body),
  remove: (id: string) => apiClient.delete<void>(`/services/${id}`),
};


