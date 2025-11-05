import {
  Button,
  Text,
  TextInput,
  Card as MantineCard,
  Title,
} from "@mantine/core";
import { Plus, Trash2 } from "lucide-react";
import type { UseFormRegister, Control } from "react-hook-form";
import type { ProductFormData } from "../hooks/use-product-form";

interface Props {
  register: UseFormRegister<ProductFormData>;
  featureFields: { id: string }[];
  appendFeature: (value: string) => void;
  removeFeature: (index: number) => void;
  applicationFields: { id: string }[];
  appendApplication: (value: string) => void;
  removeApplication: (index: number) => void;
  materialFields: { id: string }[];
  appendMaterial: (value: string) => void;
  removeMaterial: (index: number) => void;
}

export function DescriptionSection(props: Props) {
  const {
    register,
    featureFields,
    appendFeature,
    removeFeature,
    applicationFields,
    appendApplication,
    removeApplication,
    materialFields,
    appendMaterial,
    removeMaterial,
  } = props;
  return (
    <>
      <MantineCard withBorder shadow="sm" radius="md" className="mt-4">
        <div className="p-4">
          <Title order={4}>Đặc điểm nổi bật</Title>
          <Text size="sm" c="dimmed">
            Các tính năng và đặc điểm của sản phẩm
          </Text>
        </div>
        <div className="p-4 space-y-4">
          {featureFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <div className="flex-1 space-y-2">
                <Text size="sm" fw={500}>
                  Đặc điểm {index + 1}
                </Text>
                <div className="flex gap-2">
                  <TextInput
                    {...register(`description.features.${index}` as const)}
                    placeholder="VD: Khung bàn làm từ thép không gỉ Inox 304"
                  />
                  {featureFields.length > 1 && (
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFeature(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => appendFeature("")}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Thêm đặc điểm
          </Button>
        </div>
      </MantineCard>

      <MantineCard withBorder shadow="sm" radius="md" className="mt-4">
        <div className="p-4">
          <Title order={4}>Ứng dụng</Title>
          <Text size="sm" c="dimmed">
            Các lĩnh vực và mục đích sử dụng
          </Text>
        </div>
        <div className="p-4 space-y-4">
          {applicationFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <div className="flex-1 space-y-2">
                <Text size="sm" fw={500}>
                  Ứng dụng {index + 1}
                </Text>
                <div className="flex gap-2">
                  <TextInput
                    {...register(`description.applications.${index}` as const)}
                    placeholder="VD: Dùng trong xưởng cơ khí, phòng assembly"
                  />
                  {applicationFields.length > 1 && (
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeApplication(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => appendApplication("")}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Thêm ứng dụng
          </Button>
        </div>
      </MantineCard>

      <MantineCard withBorder shadow="sm" radius="md" className="mt-4">
        <div className="p-4">
          <Title order={4}>Vật liệu</Title>
          <Text size="sm" c="dimmed">
            Các vật liệu chính sử dụng trong sản phẩm
          </Text>
        </div>
        <div className="p-4 space-y-4">
          {materialFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <div className="flex-1 space-y-2">
                <Text size="sm" fw={500}>
                  Vật liệu {index + 1}
                </Text>
                <div className="flex gap-2">
                  <TextInput
                    {...register(`description.materials.${index}` as const)}
                    placeholder="VD: Khung: Inox 304"
                  />
                  {materialFields.length > 1 && (
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeMaterial(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => appendMaterial("")}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Thêm vật liệu
          </Button>
        </div>
      </MantineCard>
    </>
  );
}
