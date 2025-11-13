import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { notifications } from "@mantine/notifications";
import { toast } from "sonner";
import { UploadFolder, uploadService } from "@/services/api/uploadService";
import {
  CompanyService,
  ServiceStatus,
  ThemeVariant,
} from "@/services/api/servicesService";
import { useTranslation } from "react-i18next";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

const arrayToHtmlList = (data: string[] | string | undefined): string => {
  if (!data) return "";

  if (Array.isArray(data)) {
    if (data.length === 0) return "";
    return `<ul>${data.map((item) => `<li>${item}</li>`).join("")}</ul>`;
  }

  if (typeof data === "string") {
    // Check if it's a JSON string representing an array
    if (data.startsWith("[") && data.endsWith("]")) {
      try {
        const items = JSON.parse(data);
        if (Array.isArray(items) && items.length > 0) {
          return `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
        }
        return ""; // It was an empty JSON array '[]'
      } catch (e) {
        // Not a valid JSON array string, so treat as raw HTML
        return data;
      }
    }
    // It's not a JSON array string, so it must be raw HTML
    return data;
  }

  return "";
};

const createServiceFormSchema = (t: any) =>
  z.object({
    slug: z.string().min(1, t("validation.slugRequired")),
    title: z.string().min(1, t("validation.titleRequired")),
    subtitle: z.string().optional(),
    short_description: z
      .string()
      .min(1, t("validation.shortDescriptionRequired")),
    content: z.string().optional(),
    features: z.string().optional(),
    technologies: z.string().optional(),
    benefits: z.string().optional(),
    customers: z.string().optional(),
    image_urls: z.array(z.string()).optional(),
    icon: z.string().optional(),
    cta_label: z.string().optional(),
    cta_link: z
      .string()
      .url(t("validation.ctaLinkInvalid"))
      .min(1, t("validation.ctaLinkRequired")),
    order_index: z.number().optional(),
    tags: z.array(z.string()).optional(),
    seo_title: z.string().optional(),
    seo_description: z.string().optional(),
    alt_text: z.string().optional(),
    status: z.nativeEnum(ServiceStatus),
    theme_variant: z.nativeEnum(ThemeVariant),
    is_featured: z.boolean(),
  });

export type ServiceFormData = z.infer<
  ReturnType<typeof createServiceFormSchema>
>;

export function useServiceForm(params: {
  isEditing: boolean;
  form: Partial<CompanyService>;
  onSubmit: (finalForm: any) => Promise<void>;
}) {
  const { form, onSubmit } = params;
  const { t } = useTranslation();
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceFormSchema = createServiceFormSchema(t);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceFormSchema),
    mode: "onChange",
    defaultValues: {
      ...form,
      slug: form.slug || "",
      title: form.title || "",
      short_description: form.short_description || "",
      image_urls: form.image_urls || [],
      cta_label: form.cta_label || "Liên hệ tư vấn",
      cta_link: form.cta_link || "",
      status: form.status || ServiceStatus.PUBLISHED,
      theme_variant: form.theme_variant || ThemeVariant.AUTO,
      is_featured: form.is_featured || false,
      order_index: form.order_index || 0,
      tags: form.tags || [],
      features: arrayToHtmlList(form.features),
      technologies: arrayToHtmlList(form.technologies),
      benefits: arrayToHtmlList(form.benefits),
    },
  });

  useEffect(() => {
    reset({
      ...form,
      slug: form.slug || "",
      title: form.title || "",
      short_description: form.short_description || "",
      image_urls: form.image_urls || [],
      cta_label: form.cta_label || "Liên hệ tư vấn",
      cta_link: form.cta_link || "",
      status: form.status || ServiceStatus.PUBLISHED,
      theme_variant: form.theme_variant || ThemeVariant.AUTO,
      is_featured: form.is_featured || false,
      order_index: form.order_index || 0,
      tags: form.tags || [],
      features: arrayToHtmlList(form.features),
      technologies: arrayToHtmlList(form.technologies),
      benefits: arrayToHtmlList(form.benefits),
    });
    setPreviewUrls(form.image_urls || []);
    setPendingFiles([]);
  }, [form, reset]);

  const handleImageSelect = (files: File[]) => {
    if (!files || files.length === 0) return;

    const totalCount =
      (watch("image_urls")?.length || 0) + pendingFiles.length + files.length;
    if (totalCount > 10) {
      notifications.show({
        color: "red",
        message: t("validation.maxImages", { count: 10 }),
      });
      return;
    }

    const invalidFiles = files.filter((file) => file.size > MAX_FILE_SIZE);
    if (invalidFiles.length > 0) {
      notifications.show({
        color: "red",
        message: t("validation.imageTooLarge", { count: invalidFiles.length }),
      });
      return;
    }

    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPendingFiles((prev) => [...prev, ...files]);
    setPreviewUrls((prev) => [...previewUrls, ...newPreviewUrls]);
  };

  const handleRemoveImage = (index: number) => {
    const existingImages = watch("image_urls") || [];
    const existingImagesCount = existingImages.length;

    if (index < existingImagesCount) {
      const newImageUrls = [...existingImages];
      newImageUrls.splice(index, 1);
      setValue("image_urls", newImageUrls, { shouldValidate: true });

      const newPreviewUrls = [...previewUrls];
      newPreviewUrls.splice(index, 1);
      setPreviewUrls(newPreviewUrls);
    } else {
      const pendingIndex = index - existingImagesCount;
      const newPendingFiles = [...pendingFiles];
      newPendingFiles.splice(pendingIndex, 1);
      setPendingFiles(newPendingFiles);

      const newPreviewUrls = [...previewUrls];
      URL.revokeObjectURL(newPreviewUrls[index]);
      newPreviewUrls.splice(index, 1);
      setPreviewUrls(newPreviewUrls);
    }
  };

  const onSubmitError = (errors: any) => {
    const firstError = Object.values(errors)[0] as any;
    if (firstError?.message) {
      notifications.show({
        color: "red",
        title: t("validation.error"),
        message: firstError.message as string,
      });
    }
  };

  const handleFormSubmit = async (data: ServiceFormData) => {
    setIsSubmitting(true);
    // Manual validation for at least one image before submitting
    const totalImages = (data.image_urls?.length || 0) + pendingFiles.length;
    if (totalImages === 0) {
      notifications.show({
        color: "red",
        title: t("validation.error"),
        message: t("validation.imageUrlsRequired"),
      });
      setIsSubmitting(false);
      return; // Stop submission
    }

    try {
      let finalImageUrls = data.image_urls || [];

      if (pendingFiles.length > 0) {
        toast.loading(t("serviceForm.uploading"), {
          id: "upload-service-images",
        });
        const uploadPromises = pendingFiles.map((file) =>
          uploadService.uploadImage(file, UploadFolder.SERVICES)
        );
        const uploadedResults = await Promise.all(uploadPromises);
        const newImageUrls = uploadedResults.map((res) => res.url);
        finalImageUrls = [...finalImageUrls, ...newImageUrls];
        toast.success(t("serviceForm.uploadSuccess"), {
          id: "upload-service-images",
        });
      }

      const processHtmlField = (html: string | undefined): string => {
        if (!html || html.trim() === "" || html === "<p></p>") {
          return "";
        }
        return html;
      };

      const finalData = {
        ...data,
        image_urls: finalImageUrls,
        features: processHtmlField(data.features),
        technologies: processHtmlField(data.technologies),
        benefits: processHtmlField(data.benefits),
      };

      setPendingFiles([]);
      await onSubmit(finalData);
    } catch (e: any) {
      toast.error(e?.message || t("serviceForm.uploadError"), {
        id: "upload-service-images",
      });
      throw e;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isValid },
    handleImageSelect,
    handleRemoveImage,
    previewUrls,
    pendingFiles,
    isSubmitting,
    onSubmitForm: handleSubmit(handleFormSubmit, onSubmitError),
  };
}
