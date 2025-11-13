import { apiClient } from "./base";

export interface UploadImageResponse {
  url: string;
  public_id: string;
  width?: number;
  height?: number;
  bytes?: number;
  format?: string;
}

export enum UploadFolder {
  PRODUCTS = "products",
  CATEGORIES = "categories",
  GENERAL = "general",
  SERVICES = "services",
}

export const uploadService = {
  async uploadImage(
    file: File,
    folder: UploadFolder = UploadFolder.GENERAL
  ): Promise<UploadImageResponse> {
    const form = new FormData();
    form.append("file", file);
    form.append("folder", folder);
    return apiClient.post<UploadImageResponse, FormData>(
      "/uploads/image",
      form
    );
  },
};
