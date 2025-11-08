import {
  Button,
  Badge as MantineBadge,
  Card as MantineCard,
  Title,
  Text,
} from "@mantine/core";
import { Upload, X } from "lucide-react";
import type { ImageItem } from "../hooks/use-product-form";
import { AppThumbnailImage } from "@/components/public/common/app-thumbnail-image";

interface Props {
  imageFiles: ImageItem[];
  handleImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImageFile: (index: number) => void;
}

export function ImagesSection({
  imageFiles,
  handleImageSelect,
  removeImageFile,
}: Props) {
  return (
    <MantineCard withBorder shadow="sm" radius="md" className="mt-4">
      <div className="p-4">
        <Title order={4}>Hình ảnh sản phẩm</Title>
        <Text size="sm" c="dimmed">
          Chọn hình ảnh từ máy tính của bạn. Hình ảnh sẽ được upload khi bạn lưu
          sản phẩm.
        </Text>
      </div>
      <div className="p-4 space-y-4">
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            multiple
            onChange={handleImageSelect}
            className="hidden"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-sm font-medium mb-2">
              Chọn hình ảnh từ máy tính
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Hỗ trợ: JPG, PNG, GIF (tối đa 10MB mỗi file, tối đa 10 ảnh)
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("image-upload")?.click()}
              disabled={imageFiles.length >= 10}
            >
              <Upload className="mr-2 h-4 w-4" />
              Chọn hình ảnh
            </Button>
          </label>
          <div className="mt-3 text-xs text-muted-foreground">
            {imageFiles.length}/10 hình ảnh đã chọn
          </div>
        </div>

        {imageFiles.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {imageFiles.map((item, index) => (
              <div
                key={index}
                className="relative group border rounded-lg overflow-hidden bg-muted/50"
              >
                <div className="aspect-square relative">
                  <AppThumbnailImage
                    src={item.preview || item.url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://via.placeholder.com/400x300?text=Invalid+Image";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      type="button"
                      color="red"
                      onClick={() => removeImageFile(index)}
                      className="h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  {item.file && (
                    <div className="absolute top-2 left-2">
                      <MantineBadge variant="light" size="xs">
                        Mới
                      </MantineBadge>
                    </div>
                  )}
                </div>
                {item.file && (
                  <div className="p-2">
                    <p className="text-xs text-muted-foreground truncate">
                      {item.file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(item.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {imageFiles.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>Chưa có hình ảnh nào được chọn</p>
            <p className="text-sm mt-2">
              Hãy chọn hình ảnh từ máy tính của bạn
            </p>
          </div>
        )}
      </div>
    </MantineCard>
  );
}
