import { motion } from "motion/react";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  Info,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/public/figma/ImageWithFallback";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFeaturedProducts } from "@/services/hooks/useProducts";
import type { FeaturedProductsResponse } from "@/services/api/productsService";
import { Link } from "@tanstack/react-router";

export function FeaturedProducts() {
  const { t } = useTranslation();
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFeaturedProducts(10);

  // Flatten all products from pages (explicitly cast pages for TS)
  const pages = (data?.pages as FeaturedProductsResponse[] | undefined) ?? [];
  const allProducts = pages.flatMap((page) => page.data);

  const formatPrice = (price: number | null | undefined) => {
    if (!price) return "Liên hệ";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const parseDescription = (
    desc: string | Record<string, unknown> | null | undefined
  ) => {
    if (!desc)
      return { overview: "", features: [], applications: [], materials: [] };
    if (typeof desc === "string") {
      try {
        return JSON.parse(desc);
      } catch {
        return {
          overview: desc,
          features: [],
          applications: [],
          materials: [],
        };
      }
    }
    return desc as {
      overview?: string;
      features?: string[];
      applications?: string[];
      materials?: string[];
    };
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
  };

  // Load more when scrolling near the end
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !hasNextPage || isFetchingNextPage) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const scrollPercentage = (scrollLeft + clientWidth) / scrollWidth;

      if (scrollPercentage > 0.8 && hasNextPage) {
        fetchNextPage();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <section id="featured" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">Đang tải...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="featured" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="mb-4">{t("products.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("products.description")}
          </p>
        </motion.div>

        {/* Scroll Container */}
        <div className="relative">
          {/* Scroll Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-lg rounded-full h-10 w-10"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-lg rounded-full h-10 w-10"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Products Horizontal Scroll */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {allProducts.map((product, index) => {
              const description = parseDescription(product.description);
              const overview = description.overview || "";
              const features = description.features || [];
              const hasInfo =
                overview || features.length > 0 || product.warrantyPolicy;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  onHoverStart={() => setHoveredProduct(product.id)}
                  onHoverEnd={() => setHoveredProduct(null)}
                  className="group shrink-0 w-[280px] sm:w-[320px]"
                >
                  <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-[420px]">
                    {/* Full Image Background */}
                    <ImageWithFallback
                      src={
                        product.images && product.images.length > 0
                          ? product.images[0]
                          : "https://via.placeholder.com/400"
                      }
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Gradient Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-black/30"
                    />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-between p-3">
                      {/* Top Section - Badge & Actions */}
                      <div className="flex items-start justify-between">
                        {product.category && (
                          <Badge className="bg-amber-600/90 hover:bg-amber-700 text-white backdrop-blur-sm text-xs px-2 py-0.5">
                            {product.category.name}
                          </Badge>
                        )}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{
                            opacity: hoveredProduct === product.id ? 1 : 0,
                            scale: hoveredProduct === product.id ? 1 : 0.8,
                          }}
                          className="flex gap-2"
                        >
                          <Button
                            size="icon"
                            variant="secondary"
                            className="rounded-full w-8 h-8 bg-white/90 hover:bg-white backdrop-blur-sm"
                          >
                            <Heart className="h-3.5 w-3.5" />
                          </Button>
                        </motion.div>
                      </div>

                      {/* Bottom Section - Product Info */}
                      <div className="space-y-2">
                        {/* Product Name & Price */}
                        <div>
                          <h3 className="text-white font-bold text-base mb-1.5 line-clamp-2 drop-shadow-lg leading-tight">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-amber-400 font-bold text-lg drop-shadow-lg">
                              {formatPrice(product.price)}
                            </span>
                          </div>
                        </div>

                        {/* Compact Info */}
                        {hasInfo && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{
                              opacity: hoveredProduct === product.id ? 1 : 0.7,
                              y: hoveredProduct === product.id ? 0 : 10,
                            }}
                            className="bg-white/10 backdrop-blur-md rounded-lg p-2 border border-white/20 space-y-1.5"
                          >
                            {overview && (
                              <p className="text-white/90 text-[10px] leading-tight line-clamp-2">
                                {overview}
                              </p>
                            )}
                            {features.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {features
                                  .slice(0, 2)
                                  .map((feature: string, idx: number) => (
                                    <span
                                      key={idx}
                                      className="text-[10px] bg-amber-500/30 text-white px-1.5 py-0.5 rounded-full border border-amber-400/50"
                                    >
                                      {feature}
                                    </span>
                                  ))}
                                {features.length > 2 && (
                                  <span className="text-[10px] text-white/70">
                                    +{features.length - 2}
                                  </span>
                                )}
                              </div>
                            )}
                            {product.warrantyPolicy && (
                              <div className="flex items-center gap-1 text-[10px] text-white/80">
                                <Info className="h-2.5 w-2.5" />
                                <span>BH: {product.warrantyPolicy}</span>
                              </div>
                            )}
                          </motion.div>
                        )}

                        {/* Action Button */}
                        <Button
                          size="default"
                          variant="outline"
                          className="group relative overflow-hidden rounded-lg w-full bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:text-white transition-all duration-300 text-sm py-2"
                        >
                          {/* Glow for outline button - contained */}
                          <motion.span
                            aria-hidden
                            className="pointer-events-none absolute inset-0 rounded-lg bg-white/15 blur-lg z-0"
                            animate={{ opacity: [0.2, 0.4, 0.2] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                          {/* Subtle sweeping shine */}
                          <motion.span
                            aria-hidden
                            className="pointer-events-none absolute inset-0 z-0 bg-linear-to-r from-transparent via-white/25 to-transparent opacity-50 mix-blend-screen"
                            initial={{ x: "-120%" }}
                            animate={{ x: ["-120%", "120%"] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                          <Link
                            to="/product"
                            search={{ id: product.id }}
                            className="relative z-10 inline-flex items-center font-semibold w-full justify-center text-sm"
                          >
                            Xem chi tiết
                            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Loading indicator */}
            {isFetchingNextPage && (
              <div className="shrink-0 w-[280px] sm:w-[320px] flex items-center justify-center">
                <div className="text-muted-foreground text-sm">
                  Đang tải thêm...
                </div>
              </div>
            )}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="group relative overflow-hidden rounded-lg bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg hover:shadow-amber-500/50 transition-all duration-300"
          >
            {/* Enhanced outer glow - contained */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-lg bg-amber-400/25 blur-xl z-0"
              animate={{ opacity: [0.35, 0.7, 0.35] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-lg bg-orange-400/20 blur-lg z-0"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{
                duration: 2.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Enhanced sweeping shine */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 bg-linear-to-r from-transparent via-white/50 to-transparent opacity-80 mix-blend-screen"
              initial={{ x: "-120%" }}
              animate={{ x: ["-120%", "120%"] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Inner pulse glow */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-lg bg-white/10 z-0"
              animate={{ opacity: [0.15, 0.3, 0.15] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <Link
              to="/product"
              className="relative z-10 inline-flex items-center"
            >
              {t("products.viewAll")}
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Note: Native scrollbar hidden via vendor styles set on container style prop above */}
    </section>
  );
}
