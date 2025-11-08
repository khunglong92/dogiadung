import { motion } from "framer-motion";
import { ImageWithFallback } from "@/components/public/figma/ImageWithFallback";
import {
  ArrowRight,
  CheckCircle2,
  Settings,
  Sparkles,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  servicesService,
  CompanyService,
} from "@/services/api/servicesService";
import { ServiceList } from "@/components/public/service/components/service-list";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export function ServicesPage() {
  const [services, setServices] = useState<CompanyService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await servicesService.findAll({
          page: 1,
          perpage: 10,
        });
        if (response.data) {
          setServices(response.data);
        }
      } catch (error) {
        toast.error("Không thể tải danh sách dịch vụ.");
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

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

          {loading ? (
            <div className="space-y-16">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-[400px] w-full rounded-2xl" />
              ))}
            </div>
          ) : (
            <ServiceList services={services} />
          )}
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
