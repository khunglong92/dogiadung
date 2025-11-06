import {
  Text,
  TextInput,
  NumberInput,
  Textarea as MantineTextarea,
  Select as MantineSelect,
  Switch as MantineSwitch,
} from "@mantine/core";
import { AlertCircle } from "lucide-react";
import type { Control, UseFormRegister } from "react-hook-form";
import type { ProductFormData, CategoryItem } from "../hooks/use-product-form";

interface Props {
  register: UseFormRegister<ProductFormData>;
  watchedPrice: number | null;
  formatPrice: (v: number | null) => string;
  watchedCategoryId: number | null;
  setValue: (name: any, value: any) => void;
  errors: any;
  categories: CategoryItem[];
}

export function BasicInfoSection({
  register,
  watchedPrice,
  formatPrice,
  watchedCategoryId,
  setValue,
  errors,
  categories,
}: Props) {
  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <Text size="sm" fw={500} component="label" htmlFor="name">
          Tên sản phẩm <span className="text-red-500">*</span>
        </Text>
        <TextInput
          id="name"
          placeholder="VD: Bàn thao tác cơ khí Inox 304"
          {...register("name", { required: "Tên sản phẩm là bắt buộc" })}
        />
        {errors.name && (
          <p className="text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Text size="sm" fw={500} component="label" htmlFor="categoryId">
          Danh mục <span className="text-red-500">*</span>
        </Text>
        <MantineSelect
          id="categoryId"
          placeholder="Chọn danh mục"
          data={categories.map((c) => ({ value: String(c.id), label: c.name }))}
          value={watchedCategoryId ? String(watchedCategoryId) : null}
          onChange={(value) =>
            setValue("categoryId", value ? Number(value) : (null as any))
          }
          searchable
          nothingFoundMessage="Không tìm thấy"
          comboboxProps={{ withinPortal: true, zIndex: 1000 }}
        />
        {!watchedCategoryId && (
          <p className="text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Vui lòng chọn danh mục
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Text size="sm" fw={500} component="label" htmlFor="price">
            Giá (VNĐ) <span className="text-red-500">*</span>
          </Text>
          <NumberInput
            id="price"
            placeholder="3200000"
            hideControls
            value={watchedPrice ?? undefined}
            onChange={(val) =>
              setValue("price", typeof val === "number" ? val : null)
            }
          />
          {errors.price && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.price.message}
            </p>
          )}
          {watchedPrice && watchedPrice > 0 && (
            <p className="text-xs text-muted-foreground">
              ≈ {formatPrice(watchedPrice)} VNĐ
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Text size="sm" fw={500} component="label" htmlFor="warrantyPolicy">
            Chính sách bảo hành
          </Text>
          <MantineTextarea
            id="warrantyPolicy"
            rows={3}
            placeholder="VD: Bảo hành 12 tháng cho khung và mối hàn"
            {...register("warrantyPolicy")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Text size="sm" fw={500} component="label" htmlFor="overview">
          Tổng quan sản phẩm <span className="text-red-500">*</span>
        </Text>
        <MantineTextarea
          id="overview"
          rows={4}
          placeholder="Mô tả ngắn gọn về sản phẩm..."
          {...register("description.overview", {
            required: "Mô tả tổng quan là bắt buộc",
          })}
        />
        {errors.description?.overview && (
          <p className="text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.description.overview.message}
          </p>
        )}
      </div>

      {/* Featured Toggle */}
      <div className="space-y-2">
        <MantineSwitch
          label="Sản phẩm tiêu biểu"
          description="Hiển thị trong danh sách tiêu biểu ngoài trang chủ"
          defaultChecked
          {...register("isFeatured")}
        />
      </div>
    </div>
  );
}
