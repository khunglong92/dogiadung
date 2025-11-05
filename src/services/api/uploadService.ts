import { apiClient } from "./base";

export interface UploadImageResponse {
  url: string;
  public_id: string;
  width?: number;
  height?: number;
  bytes?: number;
  format?: string;
}

export const uploadService = {
  async uploadImage(file: File, folder?: string): Promise<UploadImageResponse> {
    const form = new FormData();
    form.append("file", file);
    if (folder) form.append("folder", folder);
    return apiClient.post<UploadImageResponse, FormData>("/uploads/image", form);
  },
};


