import { motion } from "framer-motion";
import { Heart, ArrowRight, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/public/figma/ImageWithFallback";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { ProductCardProps } from "../types";

export function ProductCard({
  id,
  name,
  price,
  images,
  category,
  stock,
  index = 0,
  className,
  onAddToCart,
  onToggleFavorite,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (priceValue: number | null | undefined) => {
    if (!priceValue) return "Liên hệ";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(priceValue);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    onToggleFavorite?.(id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(id);
  };

  const isOutOfStock = typeof stock === "number" && stock <= 0;

  const cardVariants = {
    initial: { opacity: 0, y: 50, scale: 0.95 },
    inView: { opacity: 1, y: 0, scale: 1 },
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, rotate: 2 },
  };

  const glowVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 1 },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileInView="inView"
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn("group relative w-full max-w-[300px] shrink-0", className)}
    >
      {/* Subtle Glow Effect */}
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
        transition={{ duration: 0.4 }}
        className="absolute -inset-1 rounded-2xl bg-foreground/5 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30"
        aria-hidden="true"
      />

      {/* Main Card */}
      <div className="relative flex h-[380px] flex-col overflow-hidden rounded-2xl border border-border shadow-lg backdrop-blur-sm transition-all duration-500 hover:shadow-xl">
        {/* Background Image - Full Card */}
        <div className="absolute inset-0">
          <motion.div
            variants={imageVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full w-full"
          >
            <ImageWithFallback
              src={images?.[0] || "https://via.placeholder.com/400"}
              alt={name}
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Dark Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        </div>

        {/* Image Section - Now just for link area */}
        <div className="relative h-[250px] overflow-hidden rounded-t-2xl">
          <Link to="/product" search={{ id }} className="block h-full w-full" />

          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Hover Actions */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center gap-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.3, ease: "backOut" }}
          >
            {onAddToCart && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={
                  isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
                }
                transition={{ delay: 0.05, duration: 0.3 }}
              >
                <Button
                  size="icon"
                  className="h-14 w-14 rounded-full border-2 border-white/20 bg-background/95 text-foreground shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-background"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                >
                  <ShoppingCart className="h-6 w-6" />
                </Button>
              </motion.div>
            )}

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <Button
                size="icon"
                className={cn(
                  "h-14 w-14 rounded-full border-2 shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110",
                  isFavorite
                    ? "border-pink-300/30 bg-pink-500 text-white hover:bg-pink-600"
                    : "border-white/20 bg-background/95 text-foreground hover:bg-background hover:text-pink-600"
                )}
                onClick={handleToggleFavorite}
              >
                <Heart
                  className={cn(
                    "h-6 w-6 transition-all",
                    isFavorite && "fill-current"
                  )}
                />
              </Button>
            </motion.div>
          </motion.div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {category && (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <Badge className="border-none bg-foreground/90 px-3 py-1.5 text-xs font-semibold text-background shadow-lg backdrop-blur-sm">
                  {category.name}
                </Badge>
              </motion.div>
            )}
            {isOutOfStock && (
              <Badge className="border-none bg-red-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                Hết hàng
              </Badge>
            )}
          </div>

          {/* Favorite Badge (Top Right) */}
          {isFavorite && !isHovered && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 right-4"
            >
              <div className="rounded-full bg-pink-500 p-2 shadow-lg">
                <Heart className="h-4 w-4 fill-white text-white" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Content Section */}
        <div className="relative flex flex-1 flex-col justify-between p-4">
          {/* Product Name */}
          <div className="space-y-2">
            <Link to="/product" search={{ id }} className="group/title block">
              <h3 className="line-clamp-2 text-base font-bold leading-tight text-white transition-colors duration-300 group-hover/title:text-white/80">
                {name}
              </h3>
            </Link>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <p className="text-xl font-extrabold text-white">
                {formatPrice(price)}
              </p>
              {stock !== null &&
                stock !== undefined &&
                stock > 0 &&
                stock < 10 && (
                  <span className="text-xs font-medium text-orange-400">
                    Chỉ còn {stock}
                  </span>
                )}
            </div>

            {/* Rating Stars (Decorative) */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < 4
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-600 text-gray-600"
                  )}
                />
              ))}
              <span className="ml-1 text-xs text-gray-300">(4.0)</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            variant="outline"
            className="group/btn relative mt-4 w-full overflow-hidden rounded-xl bg-background/95 backdrop-blur-md border-2 border-white/20 py-4 text-sm font-semibold shadow-2xl transition-all duration-300 hover:bg-background hover:scale-105 active:scale-100"
            disabled={isOutOfStock}
            asChild
          >
            <Link to="/product" search={{ id }}>
              {/* Subtle Shine Effect */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"
                initial={{ x: "-150%" }}
                animate={{
                  x: isHovered ? ["-150%", "150%"] : "-150%",
                }}
                transition={{
                  duration: 1.5,
                  repeat: isHovered ? Infinity : 0,
                  ease: "linear",
                  repeatDelay: 1,
                }}
              />
              {/* Button Content */}
              <span className="relative z-10 text-white flex items-center justify-center gap-2">
                <span>Xem chi tiết</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
