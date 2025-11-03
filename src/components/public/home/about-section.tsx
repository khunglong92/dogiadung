import { motion } from "motion/react";
import { Users, Package, Star, Award } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function AboutSection() {
  const stats = [
    {
      icon: Package,
      value: "500+",
      label: "Sản phẩm",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      value: "1,000+",
      label: "Khách hàng",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: Star,
      value: "4.9/5",
      label: "Đánh giá",
      color: "from-yellow-400 to-amber-500",
    },
    {
      icon: Award,
      value: "10+",
      label: "Năm kinh nghiệm",
      color: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1759753976401-4b41b1acdaaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmdXJuaXR1cmUlMjBzaG93cm9vbXxlbnwxfHx8fDE3NjIwNDQyODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Wood & Home Showroom"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
              />
            </div>

            {/* Decorative elements */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full opacity-20 blur-2xl"
            />
          </motion.div>

          {/* Content */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-4">Về Wood & Home</h2>
              <p className="text-muted-foreground leading-relaxed">
                Wood & Home là đơn vị hàng đầu chuyên cung cấp đồ gia dụng và
                nội thất gỗ, nhựa cao cấp tại Việt Nam. Với hơn 10 năm kinh
                nghiệm trong ngành, chúng tôi cam kết mang đến những sản phẩm
                chất lượng cao, thiết kế tinh tế và giá cả hợp lý.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Từ bàn ghế, tủ quần áo, kệ sách đến các vật dụng trang trí, mỗi
                sản phẩm của Wood & Home đều được chế tác tỉ mỉ để mang lại sự
                hài lòng tuyệt đối cho khách hàng.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-card rounded-xl p-6 shadow-lg border hover:shadow-xl transition-all duration-300"
                  >
                    <div
                      className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${stat.color} mb-3`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-foreground">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
