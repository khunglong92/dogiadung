import { motion } from "motion/react";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/public/figma/ImageWithFallback";
import { useState } from "react";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  index: number;
}

export function ProductCard({
  name,
  price,
  originalPrice,
  image,
  category,
  isNew,
  index,
}: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square">
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.4 }}
        >
          <ImageWithFallback
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isHovered ? 1 : 0 }}
            transition={{ delay: 0.1 }}
          >
            <Button
              size="icon"
              className="rounded-full bg-white text-black hover:bg-amber-600 hover:text-white"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-amber-600 hover:bg-amber-700">Mới</Badge>
          )}
          {originalPrice && (
            <Badge variant="destructive">
              -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
            </Badge>
          )}
        </div>

        {/* Like Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="text-xs text-muted-foreground uppercase tracking-wide">
          {category}
        </div>
        <h3 className="line-clamp-1">{name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-amber-600">{formatPrice(price)}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
