import { ProductCard } from "@/components/public/home/ProductCard";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";

const products = [
  {
    id: 1,
    name: "Bàn ăn gỗ hiện đại",
    price: 8500000,
    originalPrice: 12000000,
    image:
      "https://images.unsplash.com/photo-1722084059243-b0ec46398446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBmdXJuaXR1cmUlMjB0YWJsZXxlbnwxfHx8fDE3NjE0MDc1NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Bàn",
    isNew: false,
  },
  {
    id: 2,
    name: "Ghế gỗ sang trọng",
    price: 2500000,
    image:
      "https://images.unsplash.com/photo-1761052180945-9fcefc9a07d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBjaGFpciUyMG1vZGVybnxlbnwxfHx8fDE3NjE0MDc1Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Ghế",
    isNew: true,
  },
  {
    id: 3,
    name: "Tủ gỗ cao cấp",
    price: 15000000,
    originalPrice: 18000000,
    image:
      "https://images.unsplash.com/photo-1678555815116-52c1b10517f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBjYWJpbmV0JTIwZnVybml0dXJlfGVufDF8fHx8MTc2MTQwNzU3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Tủ",
    isNew: true,
  },
  {
    id: 4,
    name: "Kệ sách gỗ tự nhiên",
    price: 4500000,
    image:
      "https://images.unsplash.com/photo-1572734389279-e4fa423ca9db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBzaGVsZnxlbnwxfHx8fDE3NjE0MDc1Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Kệ",
    isNew: false,
  },
  {
    id: 5,
    name: "Đồ dùng nhà bếp gỗ",
    price: 850000,
    originalPrice: 1200000,
    image:
      "https://images.unsplash.com/photo-1723321354688-169c4d687338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwdXRlbnNpbHMlMjB3b29kZW58ZW58MXx8fHwxNzYxNDA3NTc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Đồ gia dụng",
    isNew: false,
  },
  {
    id: 6,
    name: "Trang trí nội thất gỗ",
    price: 1250000,
    image:
      "https://images.unsplash.com/photo-1617326573844-9d5dfb13b864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZGVjb3IlMjB3b29kZW58ZW58MXx8fHwxNzYxNDA3NTc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Trang trí",
    isNew: true,
  },
  {
    id: 7,
    name: "Hộp đựng đồ nhựa",
    price: 350000,
    image:
      "https://images.unsplash.com/photo-1621767969713-1c158c96ab80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFzdGljJTIwc3RvcmFnZSUyMGNvbnRhaW5lcnxlbnwxfHx8fDE3NjE0MDc1Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Nhựa",
    isNew: false,
  },
  {
    id: 8,
    name: "Nội thất phòng khách",
    price: 25000000,
    originalPrice: 30000000,
    image:
      "https://images.unsplash.com/photo-1701696602513-1bd43bee7c6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmdXJuaXR1cmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjEzNTA3MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Bộ nội thất",
    isNew: true,
  },
];

export function ProductGrid() {
  const { t } = useTranslation();
  const categories = [
    t("products.all"),
    "Bàn",
    "Ghế",
    "Tủ",
    "Kệ",
    "Đồ gia dụng",
    "Trang trí",
    "Nhựa",
  ];

  return (
    <section id="products" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl mb-4">{t("products.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("products.description")}
          </p>
        </motion.div>

        <Tabs defaultValue={t("products.all")} className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto gap-2 bg-transparent mb-8">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products
                  .filter(
                    (product) =>
                      category === t("products.all") ||
                      product.category === category
                  )
                  .map((product, index) => (
                    <ProductCard key={product.id} {...product} index={index} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
