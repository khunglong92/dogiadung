export interface ContactInfo {
  id?: string;
  companyName?: string;
  address?: string;
  phone?: string;
  email?: string;
  workingHours?: string;
  googleMapUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type UpdateContactInfoDto = Partial<
  Omit<ContactInfo, "id" | "createdAt" | "updatedAt">
>;
