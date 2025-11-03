import { motion } from "motion/react";
import { ImageWithFallback } from "@/components/public/figma/ImageWithFallback";
import {
  Hammer,
  Scissors,
  Zap,
  Box,
  Home,
  CheckCircle2,
  ArrowRight,
  Settings,
  Package,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ServicesPage() {
  const mainServices = [
    {
      id: "metal-fabrication",
      title: "Gia Công Kim Loại Tấm",
      icon: Package,
      description:
        "Chuyên gia công các loại kim loại tấm với độ chính xác cao, đáp ứng mọi yêu cầu kỹ thuật khắt khe nhất",
      image:
        "https://images.unsplash.com/photo-1758873263528-6dbd0422cf84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMGZhYnJpY2F0aW9uJTIwcHJvY2Vzc3xlbnwxfHx8fDE3NjIwOTUwMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-blue-500 to-cyan-500",
      features: [
        "Gia công chính xác theo bản vẽ kỹ thuật",
        "Xử lý nhiều loại kim loại: Inox, thép, nhôm",
        "Đảm bảo độ phẳng và độ bóng bề mặt",
        "Sản phẩm đạt tiêu chuẩn quốc tế",
      ],
    },
    {
      id: "metal-stamping",
      title: "Đột Dập Kim Loại",
      icon: Hammer,
      description:
        "Dịch vụ đột dập kim loại với công nghệ hiện đại, tạo ra các sản phẩm có độ chính xác và độ bền cao",
      image:
        "https://images.unsplash.com/photo-1759159091728-e2c87b9d9315?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMHN0YW1waW5nJTIwbWFudWZhY3R1cmluZ3xlbnwxfHx8fDE3NjIxNzk4MDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-purple-500 to-pink-500",
      features: [
        "Đột dập các chi tiết phức tạp",
        "Độ chính xác cao tới 0.01mm",
        "Năng suất cao, giá thành cạnh tranh",
        "Hỗ trợ thiết kế khuôn mẫu",
      ],
    },
    {
      id: "metal-bending",
      title: "Chấn Gấp Kim Loại",
      icon: Settings,
      description:
        "Chấn gấp kim loại với độ chính xác cao, tạo ra các sản phẩm có hình dạng phức tạp theo yêu cầu",
      image:
        "https://images.unsplash.com/photo-1738162837330-9257f938463c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMGJlbmRpbmclMjBtYWNoaW5lfGVufDF8fHx8MTc2MjE3OTgxMHww&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-orange-500 to-red-500",
      features: [
        "Chấn gấp nhiều góc độ khác nhau",
        "Xử lý tấm kim loại dày tới 10mm",
        "Đảm bảo độ vuông góc chính xác",
        "Không gây biến dạng bề mặt",
      ],
    },
    {
      id: "grooving",
      title: "Soi Rãnh Kim Loại",
      icon: Scissors,
      description:
        "Dịch vụ soi rãnh kim loại chuyên nghiệp, tạo đường rãnh chính xác phục vụ cho việc gấp nếp",
      image:
        "https://images.unsplash.com/photo-1699791913444-87cc77afd432?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwc2VydmljZXN8ZW58MXx8fHwxNzYyMTc5ODExfDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-green-500 to-emerald-500",
      features: [
        "Soi rãnh với độ sâu và độ rộng chính xác",
        "Phù hợp cho các loại kim loại khác nhau",
        "Tạo điều kiện gấp nếp dễ dàng",
        "Không làm ảnh hưởng cấu trúc kim loại",
      ],
    },
    {
      id: "laser-cutting",
      title: "Cắt Laser Kim Loại Tấm Hộp Định Hình",
      icon: Zap,
      description:
        "Công nghệ cắt laser CNC hiện đại, tạo ra các sản phẩm với độ chính xác tuyệt đối và bề mặt cắt hoàn hảo",
      image:
        "https://images.unsplash.com/photo-1738162837330-9257f938463c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXNlciUyMGN1dHRpbmclMjBtZXRhbHxlbnwxfHx8fDE3NjIxNjI1MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-yellow-500 to-amber-600",
      features: [
        "Cắt laser CNC với độ chính xác cao",
        "Xử lý nhiều loại hình dạng phức tạp",
        "Bề mặt cắt mịn, không cần xử lý thêm",
        "Tốc độ cắt nhanh, năng suất cao",
      ],
    },
    {
      id: "ceiling-construction",
      title: "Thiết Kế, Thi Công Trần Thạch Cao, Trần Nhựa",
      icon: Home,
      description:
        "Thiết kế và thi công trần thạch cao, trần nhựa chuyên nghiệp, thẩm mỹ và bền vững",
      image:
        "https://images.unsplash.com/photo-1655103878427-dc3ecbb792c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZWlsaW5nJTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc2MjE3OTgxMHww&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-indigo-500 to-purple-500",
      features: [
        "Thiết kế đa dạng kiểu dáng hiện đại",
        "Thi công nhanh chóng, chuyên nghiệp",
        "Vật liệu chất lượng cao, an toàn",
        "Bảo hành dài hạn, hỗ trợ 24/7",
      ],
    },
  ];

  const whyChooseUs = [
    {
      icon: CheckCircle2,
      title: "Chất Lượng Đảm Bảo",
      description: "Sản phẩm đạt tiêu chuẩn chất lượng quốc tế",
    },
    {
      icon: Sparkles,
      title: "Công Nghệ Hiện Đại",
      description: "Trang bị máy móc và công nghệ tiên tiến",
    },
    {
      icon: Settings,
      title: "Đội Ngũ Chuyên Nghiệp",
      description: "Kỹ sư và thợ lành nghề giàu kinh nghiệm",
    },
    {
      icon: Zap,
      title: "Tiến Độ Nhanh Chóng",
      description: "Cam kết giao hàng đúng thời gian",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1699791913444-87cc77afd432?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwc2VydmljZXN8ZW58MXx8fHwxNzYyMTc5ODExfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Services Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Badge className="mb-4 bg-amber-600 hover:bg-amber-700 text-white">
              Dịch Vụ Của Chúng Tôi
            </Badge>
            <h1 className="text-white mb-6 text-3xl md:text-4xl lg:text-5xl">
              Giải Pháp Gia Công Kim Loại Toàn Diện
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Cung cấp đa dạng dịch vụ gia công kim loại chất lượng cao với công
              nghệ hiện đại và đội ngũ chuyên nghiệp
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="mb-4">Dịch Vụ Chính</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mx-auto mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Thiên Lộc cung cấp đầy đủ các dịch vụ gia công kim loại tấm và thi
              công trần chuyên nghiệp
            </p>
          </motion.div>

          <div className="space-y-16">
            {mainServices.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  id={service.id}
                >
                  <Card className="overflow-hidden border-2 hover:shadow-2xl transition-all duration-300">
                    <div
                      className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${
                        isEven ? "" : "lg:grid-flow-dense"
                      }`}
                    >
                      {/* Image */}
                      <div
                        className={`relative h-[300px] lg:h-auto ${isEven ? "" : "lg:col-start-2"}`}
                      >
                        <ImageWithFallback
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                        {/* Floating Icon */}
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3, type: "spring" }}
                          className={`absolute top-6 ${isEven ? "right-6" : "left-6"}`}
                        >
                          <div
                            className={`p-4 rounded-2xl bg-gradient-to-br ${service.color} shadow-2xl`}
                          >
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                        </motion.div>
                      </div>

                      {/* Content */}
                      <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                        <motion.div
                          initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                        >
                          <Badge
                            className={`mb-4 bg-gradient-to-r ${service.color} text-white border-0`}
                          >
                            Dịch vụ #{index + 1}
                          </Badge>
                          <h3 className="mb-4 text-2xl md:text-3xl">
                            {service.title}
                          </h3>
                          <p className="text-muted-foreground mb-6 leading-relaxed">
                            {service.description}
                          </p>

                          {/* Features List */}
                          <div className="space-y-3 mb-6">
                            {service.features.map((feature, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + idx * 0.1 }}
                                className="flex items-start gap-3"
                              >
                                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-muted-foreground">
                                  {feature}
                                </span>
                              </motion.div>
                            ))}
                          </div>

                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              className={`bg-gradient-to-r ${service.color} text-white border-0 hover:opacity-90`}
                            >
                              Liên hệ tư vấn
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </motion.div>
                        </motion.div>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-amber-500 to-orange-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="mb-4 text-white">Tại Sao Chọn Thiên Lộc?</h2>
            <div className="w-20 h-1 bg-white/50 rounded-full mx-auto mb-6" />
            <p className="text-white/90 max-w-2xl mx-auto text-lg">
              Chúng tôi cam kết mang đến dịch vụ tốt nhất với chất lượng vượt
              trội
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -10 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex p-4 rounded-full bg-white/20 mb-4"
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="mb-3 text-white">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center bg-card rounded-3xl p-8 md:p-12 shadow-xl border-2"
          >
            <h2 className="mb-4">Bạn Cần Tư Vấn Dịch Vụ?</h2>
            <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
              Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ và tư vấn
              giải pháp tốt nhất cho dự án của bạn
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0"
                >
                  Liên hệ ngay
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline">
                  Xem báo giá
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
