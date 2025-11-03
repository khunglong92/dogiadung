import { motion } from "motion/react";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/public/figma/ImageWithFallback";
import { useState } from "react";

export function FeaturedProducts() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const featuredProducts = [
    {
      id: 1,
      name: "Bàn Ăn Gỗ Sồi Hiện Đại",
      price: 12500000,
      originalPrice: 15000000,
      image:
        "https://images.unsplash.com/photo-1695687349399-452a14c409be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBmdXJuaXR1cmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjIwODAxMTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      reviews: 124,
      badge: "Bán chạy",
      category: "Bàn ăn",
    },
    {
      id: 2,
      name: "Ghế Sofa Gỗ Tự Nhiên",
      price: 18900000,
      originalPrice: 22000000,
      image:
        "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob21lJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYyMDAxNDY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      reviews: 98,
      badge: "Mới",
      category: "Ghế sofa",
    },
    {
      id: 3,
      name: "Tủ Quần Áo Gỗ Cao Cấp",
      price: 25000000,
      originalPrice: 28000000,
      image:
        "https://images.unsplash.com/photo-1759753976401-4b41b1acdaaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmdXJuaXR1cmUlMjBzaG93cm9vbXxlbnwxfHx8fDE3NjIwNDQyODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5.0,
      reviews: 76,
      badge: "Giảm giá",
      category: "Tủ",
    },
    {
      id: 4,
      name: "Kệ Sách Gỗ Đa Năng",
      price: 5500000,
      originalPrice: 7000000,
      image:
        "https://images.unsplash.com/photo-1695687349399-452a14c409be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBmdXJuaXR1cmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjIwODAxMTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.7,
      reviews: 152,
      badge: "Bán chạy",
      category: "Kệ",
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

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
          <h2 className="mb-4">Sản Phẩm Nổi Bật</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Khám phá bộ sưu tập những sản phẩm đồ gỗ và nội thất được yêu thích
            nhất, kết hợp giữa thiết kế tinh tế và chất lượng hoàn hảo
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onHoverStart={() => setHoveredProduct(product.id)}
              onHoverEnd={() => setHoveredProduct(null)}
              className="group"
            >
              <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border">
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-square">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-amber-600 hover:bg-amber-700 text-white">
                      {product.badge}
                    </Badge>
                  </div>

                  {/* Quick Actions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredProduct === product.id ? 1 : 0,
                      y: hoveredProduct === product.id ? 0 : 20,
                    }}
                    className="absolute top-3 right-3 flex flex-col gap-2"
                  >
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full w-10 h-10 bg-white/90 hover:bg-white"
                    >
                      <Heart className="h-5 w-5" />
                    </Button>
                  </motion.div>

                  {/* Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredProduct === product.id ? 1 : 0,
                    }}
                    className="absolute inset-0 bg-black/20"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {product.category}
                    </p>
                    <h3 className="line-clamp-2 group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{product.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({product.reviews} đánh giá)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-amber-600">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 group">
                    <ShoppingCart className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Thêm vào giỏ
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
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
            variant="outline"
            className="border-amber-600 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950"
          >
            Xem tất cả sản phẩm
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
