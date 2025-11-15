import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContactInfoCrud } from "./hooks/use-contact-info-crud";
import { TextInput, Textarea, Card, Skeleton, Group } from "@mantine/core";
import AppButton from "@/components/atoms/app-button";

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

export default function ContactInfoForm() {
  const { isFetching, isSaving, submit, error, initialData } =
    useContactInfoCrud();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      companyName: "",
      address: "",
      phone: "",
      email: "",
      workingHours: "",
      googleMapUrl: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  if (isFetching) {
    return <ContactInfoSkeleton />;
  }

  if (error) {
    return <div className="text-red-500">Lỗi: {error.message}</div>;
  }

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="max-w-4xl mx-auto"
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold">Thông Tin Liên Hệ</h2>
        <p className="text-sm text-gray-500 mt-1">
          Cập nhật thông tin liên hệ của công ty. Thông tin này sẽ được hiển thị
          công khai trên trang web.
        </p>
      </div>
      <form onSubmit={handleSubmit(submit)} className="p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Controller
            name="companyName"
            control={control}
            render={({ field }) => (
              <TextInput
                label="Tên công ty"
                placeholder="Nhập tên công ty"
                withAsterisk
                error={errors.companyName?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextInput
                label="Số điện thoại"
                placeholder="Nhập số điện thoại"
                withAsterisk
                error={errors.phone?.message}
                {...field}
              />
            )}
          />
        </div>

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Email"
              placeholder="example@email.com"
              type="email"
              withAsterisk
              error={errors.email?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Địa chỉ"
              placeholder="Nhập địa chỉ"
              withAsterisk
              error={errors.address?.message}
              autosize
              minRows={3}
              {...field}
            />
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Controller
            name="workingHours"
            control={control}
            render={({ field }) => (
              <TextInput
                label="Giờ làm việc"
                placeholder="Thứ 2 - Chủ nhật: 7:00 - 17:00"
                withAsterisk
                error={errors.workingHours?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="googleMapUrl"
            control={control}
            render={({ field }) => (
              <Textarea
                label="Link Google Map"
                placeholder="https://maps.google.com/..."
                error={errors.googleMapUrl?.message}
                {...field}
              />
            )}
          />
        </div>

        <Group justify="flex-end" mt="md">
          <AppButton
            label="Cập nhật"
            htmlType="submit"
            loading={isSaving}
            disabled={!isDirty}
            showArrow={false}
          />
        </Group>
      </form>
    </Card>
  );
}

function ContactInfoSkeleton() {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="max-w-4xl mx-auto"
    >
      <div className="p-4">
        <Skeleton height={30} width={200} mb="sm" />
        <Skeleton height={16} width="70%" />
      </div>
      <div className="p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton height={56} />
          <Skeleton height={56} />
        </div>
        <Skeleton height={56} />
        <Skeleton height={80} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton height={56} />
          <Skeleton height={56} />
        </div>
        <Group justify="flex-end" mt="md">
          <Skeleton height={40} width={120} />
        </Group>
      </div>
    </Card>
  );
}
