import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { notifications } from "@mantine/notifications";
import { toast } from "sonner";
import { uploadService } from "@/services/api/uploadService";

export interface ServiceFormData {
  name: string;
  slug: string;
  description: string;
  content: string;
  order: number | null;
  isActive: boolean;
  imageUrl: string | null;
}

export interface ImageItemOne {
  file?: File;
  url?: string;
  preview?: string;
}

export function useServiceForm(params: {
  isEditing: boolean;
  form: ServiceFormData;
  onSubmit: (finalForm: ServiceFormData) => Promise<void>;
}) {
  const { isEditing, form, onSubmit } = params;
  const [image, setImage] = useState<ImageItemOne | null>(null);

  useEffect(() => {
    if (isEditing && form.imageUrl && !image) {
      setImage({ url: form.imageUrl, preview: form.imageUrl });
    }
    if (!isEditing && image) {
      setImage(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing, form.imageUrl]);

  const { register, handleSubmit, setValue, watch, reset, formState } =
    useForm<ServiceFormData>({
      reValidateMode: "onChange",
      defaultValues: {
        name: form.name || "",
        slug: form.slug || "",
        description: form.description || "",
        content: form.content || "",
        order: form.order ?? 0,
        isActive: form.isActive ?? true,
        imageUrl: form.imageUrl || null,
      },
    });

  // Sync form values when prop changes
  useEffect(() => {
    reset({
      name: form.name || "",
      slug: form.slug || "",
      description: form.description || "",
      content: form.content || "",
      order: form.order ?? 0,
      isActive: form.isActive ?? true,
      imageUrl: form.imageUrl || null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    form.name,
    form.slug,
    form.description,
    form.content,
    form.order,
    form.isActive,
    form.imageUrl,
  ]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const MAX_SIZE_BYTES = 10 * 1024 * 1024;
    if (!file.type.startsWith("image/")) {
      notifications.show({
        color: "red",
        message: `File ${file.name} không phải hình ảnh`,
      });
      e.target.value = "";
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      notifications.show({
        color: "red",
        message: `"${file.name}" vượt quá 10MB`,
      });
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const preview = ev.target?.result as string;
      setImage({ file, preview });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const removeImage = () => setImage(null);

  const onSubmitError = (errors: any) => {
    console.log("Form validation errors:", errors);
    Object.keys(errors).forEach((key) => {
      const error = errors[key as keyof typeof errors];
      if (error?.message) {
        notifications.show({
          color: "red",
          message: error.message as string,
        });
      }
    });
  };

  const onSubmitForm = async (data: ServiceFormData) => {
    const errorsList: string[] = [];
    if (!data.name?.trim()) errorsList.push("Tên dịch vụ là bắt buộc");
    if (!data.slug?.trim()) errorsList.push("Slug là bắt buộc");
    if (errorsList.length > 0) {
      errorsList.forEach((m) =>
        notifications.show({ color: "red", message: m })
      );
      return;
    }
    try {
      let uploadedUrl: string | null = image?.url || null;
      if (image?.file) {
        toast.loading("Đang upload hình ảnh...", {
          id: "upload-service-image",
        });
        const res = await uploadService.uploadImage(image.file, "services");
        uploadedUrl = res.url;
        toast.dismiss("upload-service-image");
      }
      const finalForm: ServiceFormData = {
        name: data.name.trim(),
        slug: data.slug.trim(),
        description: data.description || "",
        content: data.content || "",
        order: data.order ?? 0,
        isActive: !!data.isActive,
        imageUrl: uploadedUrl,
      };
      await onSubmit(finalForm);
    } catch (e: any) {
      toast.error(e?.message || "Có lỗi xảy ra khi upload hình ảnh");
      throw e;
    }
  };

  return {
    register,
    setValue,
    watch,
    handleSubmit,
    formState,
    image,
    handleImageSelect,
    removeImage,
    onSubmitForm,
    onSubmitError,
  };
}
