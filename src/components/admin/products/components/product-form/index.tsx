import {
  Button,
  Badge as MantineBadge,
  Card as MantineCard,
  Tabs as MantineTabs,
  Title,
  Text,
} from "@mantine/core";
import { Save } from "lucide-react";
import { useProductForm } from "./hooks/use-product-form";
import { BasicInfoSection } from "./sections/BasicInfoSection";
import { DescriptionSection } from "./sections/DescriptionSection";
import { TechnicalSpecsSection } from "./sections/TechnicalSpecsSection";
import { ImagesSection } from "./sections/ImagesSection";

interface ProductFormProps {
  isEditing: boolean;
  form: {
    name: string;
    description: string;
    technicalSpecs: string;
    price: string;
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
    price: string;
    warrantyPolicy: string;
    images: string;
    categoryId: number | null;
    isFeatured?: boolean;
  }) => Promise<void>;
  onCancel?: () => void;
  isSaving: boolean;
  categories: { id: number; name: string }[];
}

export default function ProductForm({
  isEditing,
  form,
  setForm,
  onSubmit,
  onCancel,
  isSaving,
  categories,
}: ProductFormProps) {
  const {
    currentTab,
    setCurrentTab,
    register,
    handleSubmit,
    setValue,
    errors,
    featuresArray,
    applicationsArray,
    materialsArray,
    imageFiles,
    handleImageSelect,
    removeImageFile,
    onSubmitForm,
    onSubmitError,
    formatPrice,
    watchedPrice,
    watchedCategoryId,
  } = useProductForm({ isEditing, form, setForm, onSubmit }, categories);

  return (
    <div className="w-full">
      <div className="bg-background rounded-lg shadow-lg w-full overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b">
          <div>
            <h2 className="text-2xl">
              {isEditing ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {isEditing
                ? "Cập nhật thông tin sản phẩm"
                : "Điền đầy đủ thông tin sản phẩm mới"}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmitForm, onSubmitError)}>
          <div className="p-6">
            <MantineTabs
              value={currentTab}
              onChange={(v) => v && setCurrentTab(v)}
              variant="pills"
              radius="md"
              keepMounted={false}
            >
              <MantineTabs.List grow>
                <MantineTabs.Tab value="basic">
                  Thông tin cơ bản
                </MantineTabs.Tab>
                <MantineTabs.Tab value="description">
                  Mô tả chi tiết
                </MantineTabs.Tab>
                <MantineTabs.Tab value="technical">
                  Thông số kỹ thuật
                </MantineTabs.Tab>
                <MantineTabs.Tab value="images">Hình ảnh</MantineTabs.Tab>
              </MantineTabs.List>

              {/* Tab 1: Basic Information */}
              <MantineTabs.Panel value="basic">
                <MantineCard
                  withBorder
                  shadow="sm"
                  radius="md"
                  className="mt-4"
                >
                  <div className="p-4">
                    <Title order={4}>Thông tin cơ bản</Title>
                    <Text size="sm" c="dimmed">
                      Nhập thông tin cơ bản của sản phẩm
                    </Text>
                  </div>
                  <BasicInfoSection
                    register={register}
                    watchedPrice={watchedPrice}
                    formatPrice={formatPrice}
                    watchedCategoryId={watchedCategoryId}
                    setValue={setValue as any}
                    errors={errors}
                    categories={categories}
                  />
                </MantineCard>
              </MantineTabs.Panel>

              {/* Tab 2: Description */}
              <MantineTabs.Panel value="description">
                <DescriptionSection
                  register={register}
                  featureFields={featuresArray.fields}
                  appendFeature={featuresArray.append as any}
                  removeFeature={featuresArray.remove as any}
                  applicationFields={applicationsArray.fields}
                  appendApplication={applicationsArray.append as any}
                  removeApplication={applicationsArray.remove as any}
                  materialFields={materialsArray.fields}
                  appendMaterial={materialsArray.append as any}
                  removeMaterial={materialsArray.remove as any}
                />
              </MantineTabs.Panel>

              {/* Tab 3: Technical Specs */}
              <MantineTabs.Panel value="technical">
                <TechnicalSpecsSection register={register} />
              </MantineTabs.Panel>

              {/* Tab 4: Images */}
              <MantineTabs.Panel value="images">
                <ImagesSection
                  imageFiles={imageFiles}
                  handleImageSelect={handleImageSelect}
                  removeImageFile={removeImageFile}
                />
              </MantineTabs.Panel>
            </MantineTabs>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t bg-muted/30">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MantineBadge variant="outline">
                Tab{" "}
                {currentTab === "basic"
                  ? "1"
                  : currentTab === "description"
                    ? "2"
                    : currentTab === "technical"
                      ? "3"
                      : "4"}
                /4
              </MantineBadge>
              <span>
                {currentTab === "basic"
                  ? "Thông tin cơ bản"
                  : currentTab === "description"
                    ? "Mô tả chi tiết"
                    : currentTab === "technical"
                      ? "Thông số kỹ thuật"
                      : "Hình ảnh"}
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSaving}
              >
                Hủy
              </Button>
              <Button type="submit" variant="filled" disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" />
                {isSaving
                  ? "Đang lưu..."
                  : isEditing
                    ? "Cập nhật"
                    : "Lưu sản phẩm"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
