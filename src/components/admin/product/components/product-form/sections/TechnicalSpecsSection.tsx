import { Card as MantineCard, Title, Text, TextInput, Divider, Switch as MantineSwitch } from "@mantine/core";
import type { UseFormRegister } from "react-hook-form";
import type { ProductFormData } from "../hooks/use-product-form";

interface Props {
  register: UseFormRegister<ProductFormData>;
}

export function TechnicalSpecsSection({ register }: Props) {
  return (
    <MantineCard withBorder shadow="sm" radius="md" className="mt-4">
      <div className="p-4">
        <Title order={4}>Thông số kỹ thuật</Title>
        <Text size="sm" c="dimmed">Chi tiết kỹ thuật của sản phẩm</Text>
      </div>
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Text size="sm" fw={500} component="label" htmlFor="dimensions">Kích thước (D x R x C)</Text>
            <TextInput id="dimensions" {...register("technicalSpecs.dimensions")} placeholder="1200mm x 700mm x 800mm" />
          </div>
          <div className="space-y-2">
            <Text size="sm" fw={500} component="label" htmlFor="weight">Trọng lượng</Text>
            <TextInput id="weight" {...register("technicalSpecs.weight")} placeholder="25 kg" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Text size="sm" fw={500} component="label" htmlFor="material">Chất liệu</Text>
            <TextInput id="material" {...register("technicalSpecs.material")} placeholder="Inox 304" />
          </div>
          <div className="space-y-2">
            <Text size="sm" fw={500} component="label" htmlFor="surfaceFinish">Hoàn thiện bề mặt</Text>
            <TextInput id="surfaceFinish" {...register("technicalSpecs.surfaceFinish")} placeholder="Đánh bóng BA" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Text size="sm" fw={500} component="label" htmlFor="loadCapacity">Tải trọng</Text>
            <TextInput id="loadCapacity" {...register("technicalSpecs.loadCapacity")} placeholder="120 kg" />
          </div>
          <div className="space-y-2">
            <Text size="sm" fw={500} component="label" htmlFor="weldingType">Loại hàn</Text>
            <TextInput id="weldingType" {...register("technicalSpecs.weldingType")} placeholder="Hàn TIG" />
          </div>
        </div>

        <Divider />

        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className="space-y-0.5">
            <Text size="sm" fw={600} component="label" htmlFor="customizable">Có thể tùy chỉnh</Text>
            <p className="text-xs text-muted-foreground">Sản phẩm có thể điều chỉnh theo yêu cầu khách hàng</p>
          </div>
          <MantineSwitch id="customizable" {...register("technicalSpecs.customizable")} />
        </div>
      </div>
    </MantineCard>
  );
}


