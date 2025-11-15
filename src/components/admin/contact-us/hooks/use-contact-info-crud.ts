import { useEffect, useState } from "react";
import {
  useGetContactInfo,
  useUpdateContactInfo,
} from "@/services/hooks/useContactInfo";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  companyName: z.string().min(1, "Tên công ty không được để trống"),
  address: z.string().min(1, "Địa chỉ không được để trống"),
  phone: z
    .string()
    .min(1, "Số điện thoại không được để trống")
    .regex(/^[0-9]+$/, "Số điện thoại chỉ được chứa các chữ số"),
  email: z.string().email("Email không hợp lệ"),
  workingHours: z.string().min(1, "Giờ làm việc không được để trống"),
  googleMapUrl: z.string().optional().or(z.literal("")),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function useContactInfoCrud() {
  const {
    data: contactInfo,
    isLoading: isFetching,
    error,
  } = useGetContactInfo();
  const updateMutation = useUpdateContactInfo();

  const [form, setForm] = useState<ContactFormValues>({
    companyName: "",
    address: "",
    phone: "",
    email: "",
    workingHours: "",
    googleMapUrl: "",
  });

  useEffect(() => {
    if (contactInfo) {
      setForm({
        companyName: contactInfo.companyName || "",
        address: contactInfo.address || "",
        phone: contactInfo.phone || "",
        email: contactInfo.email || "",
        workingHours: contactInfo.workingHours || "",
        googleMapUrl: contactInfo.googleMapUrl || "",
      });
    }
  }, [contactInfo]);

  const submit = async (formData: ContactFormValues) => {
    const validationResult = contactSchema.safeParse(formData);
    if (!validationResult.success) {
      const firstError = [...validationResult.error.issues];
      toast.error(
        `${firstError.map((error) => error.path.join(".")).join(", ")}: ${firstError.map((error) => error.message).join(", ")}`
      );
      return;
    }
    await updateMutation.mutateAsync(formData);
    toast.success("Cập nhật thông tin liên hệ thành công!");
  };

  return {
    form,
    setForm,
    isFetching,
    isSaving: updateMutation.isPending,
    submit,
    error,
    initialData: contactInfo,
  };
}
