import { useState, ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// Mở rộng ImgHTMLAttributes để component chấp nhận tất cả các props của thẻ <img>
interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  // Bạn có thể thêm các props tùy chỉnh ở đây nếu cần
}

export function AppThumbnailImage({
  src,
  alt,
  className,
  ...props
}: AppImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy" // Kích hoạt lazy loading gốc của trình duyệt
      onLoad={handleImageLoad}
      className={cn(
        "transition-opacity duration-500 ease-in-out",
        isLoaded ? "opacity-100" : "opacity-0",
        className // Cho phép ghi đè hoặc thêm class từ bên ngoài
      )}
      {...props} // Truyền tất cả các props còn lại (như width, height, style, v.v.)
    />
  );
}
