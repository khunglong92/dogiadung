import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "@/components/public/figma/ImageWithFallback";

interface ProductImageGalleryProps {
  images: string[];
  productName?: string;
}

export function ProductImageGallery({
  images,
  productName = "Sản phẩm",
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Không có hình ảnh</p>
      </div>
    );
  }

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-muted rounded-lg overflow-hidden group">
        <ImageWithFallback
          src={images[selectedImage]}
          alt={`${productName} - Hình ${selectedImage + 1}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute top-1/2 left-3 -translate-y-1/2 bg-background/90 hover:bg-accent text-foreground rounded-full p-2 transition-all opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Ảnh trước"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="absolute top-1/2 right-3 -translate-y-1/2 bg-background/90 hover:bg-accent text-foreground rounded-full p-2 transition-all opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Ảnh tiếp theo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-secondary text-secondary-foreground px-3 py-1 text-sm rounded-full backdrop-blur-sm">
          {selectedImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all hover:border-primary focus:outline-none ${
                selectedImage === index
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-border"
              }`}
            >
              <ImageWithFallback
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
