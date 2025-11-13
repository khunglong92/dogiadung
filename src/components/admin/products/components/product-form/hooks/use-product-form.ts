import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { notifications } from "@mantine/notifications";
import { toast } from "sonner";
import { uploadService, UploadFolder } from "@/services/api/uploadService";

export interface CategoryItem {
  id: number;
  name: string;
}

export interface ImageItem {
  file?: File;
  url?: string;
  preview?: string;
}

export interface ProductFormData {
  name: string;
  categoryId: number | null;
  description: {
    overview: string;
    features: string[];
    applications: string[];
    materials: string[];
  };
  technicalSpecs: {
    dimensions: string;
    weight: string;
    material: string;
    surfaceFinish: string;
    loadCapacity: string;
    weldingType: string;
    customizable: boolean;
  };
  price: string | null;
  warrantyPolicy: string;
  images: string[];
  isFeatured: boolean;
}

export interface UseProductFormParams {
  isEditing: boolean;
  form: {
    name: string;
    description: string;
    technicalSpecs: string;
    price?: string;
    warrantyPolicy: string;
    images: string;
    categoryId: number | null;
    isFeatured?: boolean;
  };
  setForm: (next: any) => void;
  onSubmit: (finalForm: {
    name: string;
    description: string;
    technicalSpecs: string;
    price?: string;
    warrantyPolicy: string;
    images: string;
    categoryId: number | null;
    isFeatured?: boolean;
  }) => Promise<void>;
}

export function useProductForm(
  params: UseProductFormParams,
  categories: CategoryItem[]
) {
  const { isEditing, form, setForm, onSubmit } = params;
  const [currentTab, setCurrentTab] = useState("basic");
  const [imageFiles, setImageFiles] = useState<ImageItem[]>([]);

  const parseDescription = (
    desc: string | Record<string, unknown> | null | undefined
  ) => {
    if (!desc)
      return {
        overview: "",
        features: [""],
        applications: [""],
        materials: [""],
      };
    if (typeof desc === "string") {
      try {
        const parsed = JSON.parse(desc);
        return {
          overview: parsed.overview || "",
          features: Array.isArray(parsed.features) ? parsed.features : [""],
          applications: Array.isArray(parsed.applications)
            ? parsed.applications
            : [""],
          materials: Array.isArray(parsed.materials) ? parsed.materials : [""],
        };
      } catch {
        return {
          overview: desc,
          features: [""],
          applications: [""],
          materials: [""],
        };
      }
    }
    return {
      overview: (desc.overview as string) || "",
      features: Array.isArray(desc.features) ? desc.features : [""],
      applications: Array.isArray(desc.applications) ? desc.applications : [""],
      materials: Array.isArray(desc.materials) ? desc.materials : [""],
    };
  };

  const parseTechnicalSpecs = (
    specs: string | Record<string, unknown> | null | undefined
  ) => {
    if (!specs)
      return {
        dimensions: "",
        weight: "",
        material: "",
        surfaceFinish: "",
        loadCapacity: "",
        weldingType: "",
        customizable: false,
      };
    if (typeof specs === "string") {
      try {
        const parsed = JSON.parse(specs);
        return {
          dimensions: parsed.dimensions || "",
          weight: parsed.weight || "",
          material: parsed.material || "",
          surfaceFinish: parsed.surfaceFinish || "",
          loadCapacity: parsed.loadCapacity || "",
          weldingType: parsed.weldingType || "",
          customizable: parsed.customizable || false,
        };
      } catch {
        return {
          dimensions: "",
          weight: "",
          material: "",
          surfaceFinish: "",
          loadCapacity: "",
          weldingType: "",
          customizable: false,
        };
      }
    }
    return {
      dimensions: (specs.dimensions as string) || "",
      weight: (specs.weight as string) || "",
      material: (specs.material as string) || "",
      surfaceFinish: (specs.surfaceFinish as string) || "",
      loadCapacity: (specs.loadCapacity as string) || "",
      weldingType: (specs.weldingType as string) || "",
      customizable: (specs.customizable as boolean) || false,
    };
  };

  const parseImages = (imgs: string | string[] | null | undefined) => {
    if (!imgs) return [] as string[];
    if (typeof imgs === "string") {
      try {
        const parsed = JSON.parse(imgs);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return imgs.split(",").filter(Boolean);
      }
    }
    return Array.isArray(imgs) ? imgs : [];
  };

  const parsedDescription = parseDescription(form.description);
  const parsedTechnicalSpecs = parseTechnicalSpecs(form.technicalSpecs);
  const parsedImages = parseImages(form.images);

  useEffect(() => {
    if (isEditing && parsedImages.length > 0 && imageFiles.length === 0) {
      setImageFiles(parsedImages.map((url) => ({ url, preview: url })));
    } else if (!isEditing) {
      setImageFiles([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing, form.images]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      name: form.name || "",
      categoryId: form.categoryId,
      description: parsedDescription,
      technicalSpecs: parsedTechnicalSpecs,
      price: form.price || null,
      warrantyPolicy: form.warrantyPolicy || "",
      images: [],
      isFeatured: form.isFeatured ?? true,
    },
  });

  useEffect(() => {
    register("categoryId", { required: true });
  }, [register]);

  const featuresArray = useFieldArray({
    control,
    // @ts-ignore - react-hook-form type inference issue
    name: "description.features",
  });
  const applicationsArray = useFieldArray({
    control,
    // @ts-ignore - react-hook-form type inference issue
    name: "description.applications",
  });
  const materialsArray = useFieldArray({
    control,
    // @ts-ignore - react-hook-form type inference issue
    name: "description.materials",
  });

  const handleImageSelect = (files: File[]) => {
    if (!files || files.length === 0) return;
    const MAX_FILES = 10;
    const MAX_SIZE_BYTES = 10 * 1024 * 1024;
    const remainingSlots = Math.max(0, MAX_FILES - imageFiles.length);
    if (remainingSlots === 0) {
      notifications.show({
        color: "red",
        message: `Tối đa ${MAX_FILES} hình ảnh cho mỗi sản phẩm`,
      });
      return;
    }
    const selected = files.slice(0, remainingSlots);
    if (files.length > selected.length) {
      notifications.show({
        color: "red",
        message: `Chỉ có thể chọn thêm ${remainingSlots} hình ảnh (tối đa ${MAX_FILES})`,
      });
    }
    selected.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        notifications.show({
          color: "red",
          message: `File ${file.name} không phải hình ảnh`,
        });
        return;
      }
      if (file.size > MAX_SIZE_BYTES) {
        notifications.show({
          color: "red",
          message: `"${file.name}" vượt quá 10MB`,
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        const preview = ev.target?.result as string;
        setImageFiles((prev) => [...prev, { file, preview }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImageFile = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmitForm = async (data: ProductFormData) => {
    // Validation is now handled by react-hook-form's `handleSubmit`.
    // The `onSubmitError` function will be called if there are errors.

    if (imageFiles.length === 0) {
      notifications.show({
        color: "red",
        message: "Vui lòng thêm ít nhất 1 hình ảnh cho sản phẩm",
      });
      setCurrentTab("images");
      return;
    }

    try {
      const filesToUpload = imageFiles.filter((i) => i.file);

      const uploadedUrls: string[] = [];
      if (filesToUpload.length > 0) {
        const results = await Promise.all(
          filesToUpload.map((i) =>
            uploadService.uploadImage(i.file as File, "product" as any)
          )
        );
        uploadedUrls.push(...results.map((r) => r.url));
        toast.dismiss("upload-images");
      }
      const existingUrls = imageFiles
        .filter((i) => i.url && !i.file)
        .map((i) => i.url!);
      const allImageUrls = [...existingUrls, ...uploadedUrls];

      const descriptionObj = {
        overview: data.description.overview,
        features: data.description.features.filter((f) => f.trim()),
        applications: data.description.applications.filter((a) => a.trim()),
        materials: data.description.materials.filter((m) => m.trim()),
      };
      const technicalSpecsObj: Record<string, unknown> = {
        dimensions: data.technicalSpecs.dimensions,
        weight: data.technicalSpecs.weight,
        material: data.technicalSpecs.material,
        surfaceFinish: data.technicalSpecs.surfaceFinish,
        loadCapacity: data.technicalSpecs.loadCapacity,
        weldingType: data.technicalSpecs.weldingType,
        customizable: data.technicalSpecs.customizable,
      };
      Object.keys(technicalSpecsObj).forEach((k) => {
        const v = technicalSpecsObj[k];
        if (v === "" || v === null || v === undefined)
          delete technicalSpecsObj[k];
      });

      const finalForm = {
        name: data.name,
        description: JSON.stringify(descriptionObj),
        technicalSpecs: JSON.stringify(technicalSpecsObj),
        price: data.price ? String(data.price) : "",
        warrantyPolicy: data.warrantyPolicy || "",
        images: JSON.stringify(allImageUrls),
        categoryId: data.categoryId,
        isFeatured: data.isFeatured,
      };

      // Đồng bộ state bên ngoài (tùy chọn)
      setForm(finalForm);
      // Gọi submit với dữ liệu đã chuẩn hóa để tránh race condition
      await onSubmit(finalForm);
    } catch (e: any) {
      toast.error(e?.message || "Có lỗi xảy ra khi upload hình ảnh");
      // Không throw để tránh trigger onSubmitError
    }
  };

  const onSubmitError = (errors: any) => {
    if (errors?.name) {
      notifications.show({
        color: "red",
        message: String(errors.name.message || "Tên sản phẩm là bắt buộc"),
      });
      return;
    }
    if (errors?.categoryId) {
      notifications.show({ color: "red", message: "Vui lòng chọn danh mục" });
      return;
    }
    if (errors?.price) {
      notifications.show({
        color: "red",
        message: String(errors.price.message || "Vui lòng nhập giá sản phẩm"),
      });
      return;
    }
    if (errors?.description?.overview) {
      notifications.show({
        color: "red",
        message: String(
          errors.description.overview.message || "Vui lòng nhập mô tả tổng quan"
        ),
      });
      return;
    }
  };

  const formatPrice = (value: number | null) => {
    if (!value) return "";
    return new Intl.NumberFormat("vi-VN").format(value);
  };

  return {
    currentTab,
    setCurrentTab,
    imageFiles,
    setImageFiles,
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    errors,
    featuresArray,
    applicationsArray,
    materialsArray,
    handleImageSelect,
    removeImageFile,
    onSubmitForm,
    onSubmitError,
    formatPrice,
    watchedPrice: watch("price"),
    watchedCategoryId: watch("categoryId"),
    categories,
  };
}
