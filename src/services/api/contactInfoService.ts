import { apiClient } from "./base";
import type { ContactInfo, UpdateContactInfoDto } from "@/types/contact-info";

const CONTACT_INFO_ENDPOINT = "contact-info";

export const contactInfoService = {
  get: (): Promise<ContactInfo> => {
    return apiClient.get(CONTACT_INFO_ENDPOINT);
  },

  update: (data: UpdateContactInfoDto): Promise<ContactInfo> => {
    return apiClient.put(CONTACT_INFO_ENDPOINT, data);
  },
};
