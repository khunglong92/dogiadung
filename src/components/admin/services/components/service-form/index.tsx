import {
  Button,
  Card as MantineCard,
  Tabs as MantineTabs,
  Title,
  Text,
} from "@mantine/core";
import { Save } from "lucide-react";
import { useServiceForm, type ServiceFormData } from "./hooks/use-service-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface ServiceFormProps {
  isEditing: boolean;
  form: ServiceFormData;
  onSubmit: (finalForm: ServiceFormData) => Promise<void>;
  onCancel?: () => void;
  isSaving: boolean;
}

export default function ServiceForm({
  isEditing,
  form,
  onSubmit,
  onCancel,
  isSaving,
}: ServiceFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState,
    image,
    handleImageSelect,
    removeImage,
    onSubmitForm,
    onSubmitError,
  } = useServiceForm({
    isEditing,
    form,
    onSubmit,
  });

  const isActiveValue = watch("isActive");
  const { errors } = formState;

  return (
    <div className="w-full">
      {isSaving && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white px-4 py-3 rounded shadow text-sm">
            Đang xử lý...
          </div>
        </div>
      )}
      <div className="bg-background rounded-lg shadow-lg w-full overflow-hidden">
        <div className="p-6 border-b">
          <div>
            <h2 className="text-2xl">
              {isEditing ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ mới"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {isEditing
                ? "Cập nhật thông tin dịch vụ"
                : "Điền đầy đủ thông tin dịch vụ"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmitForm, onSubmitError)}>
          <div className="p-6">
            <MantineTabs
              value={"basic"}
              onChange={() => {}}
              variant="pills"
              radius="md"
              keepMounted={false}
            >
              <MantineTabs.List grow>
                <MantineTabs.Tab value="basic">
                  Thông tin cơ bản
                </MantineTabs.Tab>
              </MantineTabs.List>

              <MantineTabs.Panel value="basic">
                <MantineCard
                  withBorder
                  shadow="sm"
                  radius="md"
                  className="mt-4"
                >
                  <div className="grid gap-4 p-4">
                    <Title order={4}>Thông tin cơ bản</Title>
                    <Text size="sm" c="dimmed">
                      Nhập thông tin cơ bản của dịch vụ
                    </Text>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Tên dịch vụ</Label>
                        <Input
                          id="name"
                          {...register("name", {
                            required: "Tên dịch vụ là bắt buộc",
                          })}
                          placeholder="Tên dịch vụ"
                        />
                        {errors.name && (
                          <p className="text-sm text-red-500">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                          id="slug"
                          {...register("slug", {
                            required: "Slug là bắt buộc",
                          })}
                          placeholder="slug-dich-vu"
                        />
                        {errors.slug && (
                          <p className="text-sm text-red-500">
                            {errors.slug.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Mô tả</Label>
                      <Textarea
                        id="description"
                        rows={3}
                        {...register("description")}
                        placeholder="Mô tả ngắn"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">Nội dung</Label>
                      <Textarea
                        id="content"
                        rows={6}
                        {...register("content")}
                        placeholder="Nội dung chi tiết"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="order">Thứ tự</Label>
                        <Input
                          id="order"
                          type="number"
                          {...register("order", {
                            setValueAs: (v) =>
                              v === "" || v === null ? 0 : Number(v),
                          })}
                        />
                      </div>
                      <div className="flex items-center gap-3 mt-8">
                        <Switch
                          checked={isActiveValue}
                          onCheckedChange={(checked) => {
                            setValue("isActive", checked);
                          }}
                        />
                        <span className="text-sm text-muted-foreground">
                          Kích hoạt
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Ảnh đại diện</Label>
                      <div className="flex items-center gap-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageSelect}
                        />
                        {image?.preview && (
                          <div className="flex items-center gap-2">
                            <img
                              src={image.preview}
                              className="h-16 w-16 object-cover rounded"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={removeImage}
                            >
                              Xóa ảnh
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </MantineCard>
              </MantineTabs.Panel>
            </MantineTabs>
          </div>

          <div className="flex items-center justify-between p-6 border-t bg-muted/30">
            <div />
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
                    : "Lưu dịch vụ"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
