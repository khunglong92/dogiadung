import { useCallback, useMemo, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { EmblaCarouselType } from "embla-carousel";

import { ProductCard } from "./product-card";
import { useProductsByCategory } from "../hooks/use-products-by-category";
import { Button } from "@/components/ui/button";

interface AutoScrollCarouselProps {
  categoryId?: number;
}

export function AutoScrollCarousel({ categoryId }: AutoScrollCarouselProps) {
  const { products } = useProductsByCategory(categoryId);
  const slides = useMemo(() => products ?? [], [products]);
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const emblaRef = useRef<EmblaCarouselType | null>(null);

  const shouldAutoplay = slides.length > 1;
  const shouldLoop = slides.length > 1;

  const handlePrev = useCallback(() => {
    emblaRef.current?.scrollPrev();
  }, []);

  const handleNext = useCallback(() => {
    emblaRef.current?.scrollNext();
  }, []);

  if (!slides.length) {
    return null;
  }

  return (
    <div className="relative mx-auto w-full max-w-7xl px-12 md:px-16">
      {slides.length > 1 && (
        <>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handlePrev}
            className="absolute -left-2 md:-left-6 top-1/2 z-10 h-12 w-12 -translate-y-1/2 rounded-full border-2 border-white/20 bg-background/95 backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-110 hover:bg-background"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="absolute -right-2 md:-right-6 top-1/2 z-10 h-12 w-12 -translate-y-1/2 rounded-full border-2 border-white/20 bg-background/95 backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-110 hover:bg-background"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}
      <Carousel
        slideSize="auto"
        slideGap="lg"
        emblaOptions={{
          align: "start",
          loop: shouldLoop,
          dragFree: shouldLoop,
        }}
        withControls={false}
        withIndicators={false}
        classNames={{
          viewport: "overflow-hidden",
          container: "items-stretch",
        }}
        plugins={shouldAutoplay ? [autoplayPlugin.current] : []}
        onMouseEnter={shouldAutoplay ? autoplayPlugin.current.stop : undefined}
        onMouseLeave={
          shouldAutoplay ? () => autoplayPlugin.current.play() : undefined
        }
        getEmblaApi={(api) => {
          emblaRef.current = api;
        }}
      >
        {slides.map((product) => (
          <Carousel.Slide key={product.id} className="h-full max-w-[260px]">
            <div className="h-full">
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price ?? null}
                images={product.images ?? []}
                description={product.description ?? null}
                warrantyPolicy={product.warrantyPolicy}
                category={product.category}
                variant="compact"
                className="h-full"
              />
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}
