import { apiClient } from "./base";

export interface Contact {
  id: string;
  name: string;
  title: string;
  phone?: string;
  email?: string;
  address?: string;
  content: string;
  isConfirmed: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface PaginatedContacts {
  data: Contact[];
  total: number;
  page: number;
  limit: number;
}

export const getContacts = (
  page = 1,
  limit = 10,
): Promise<PaginatedContacts> => {
  return apiClient.get(`contacts?page=${page}&limit=${limit}`);
};

export const getContactById = (id: string): Promise<Contact> => {
  return apiClient.get(`contacts/${id}`);
};

export const updateContactStatus = (
  id: string,
  isConfirmed: boolean,
): Promise<Contact> => {
  return apiClient.patch(`contacts/${id}/status`, { isConfirmed });
};

export const deleteContact = (id: string): Promise<void> => {
  return apiClient.delete(`contacts/${id}`);
};

