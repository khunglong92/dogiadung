import { motion } from "motion/react";
import { ImageWithFallback } from "@/components/public/figma/ImageWithFallback";
import {
  Building2,
  Calendar,
  MapPin,
  Phone,
  Target,
  Award,
  Users,
  Settings,
  TrendingUp,
  Shield,
  Heart,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Introduction() {
  const companyInfo = [
    {
      icon: Calendar,
      label: "Ngày thành lập",
      value: "06/01/2026",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: MapPin,
      label: "Địa chỉ",
      value: "Võng La, Thiên Lộc, Hà Nội",
      color: "from-red-500 to-pink-600",
    },
    {
      icon: Phone,
      label: "Hotline",
      value: "1900 00000",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Building2,
      label: "Loại hình",
      value: "Công ty TNHH",
      color: "from-purple-500 to-indigo-600",
    },
  ];

  const coreValues = [
    {
      icon: Target,
      title: "Chính Xác",
      description: "Từng chi tiết được gia công với độ chính xác cao nhất",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Award,
      title: "Chất Lượng",
      description: "Sản phẩm đạt chuẩn quốc tế, đáp ứng yêu cầu khắt khe",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: Heart,
      title: "Tận Tâm",
      description: "Đồng hành và hỗ trợ khách hàng trong mọi dự án",
      color: "from-red-500 to-pink-600",
    },
    {
      icon: Shield,
      title: "Uy Tín",
      description: "Cam kết chất lượng và tiến độ trong mọi công việc",
      color: "from-green-500 to-emerald-600",
    },
  ];

  const services = [
    {
      title: "Cơ Khí Chế Tạo",
      description:
        "Gia công chi tiết kim loại tấm cho các thiết bị cơ khí công nghiệp",
      icon: Settings,
    },
    {
      title: "Điện - Điện Tử",
      description: "Sản xuất vỏ tủ điện, khung giá đỡ thiết bị điện tử",
      icon: Sparkles,
    },
    {
      title: "Xây Dựng",
      description: "Cung cấp kết cấu kim loại cho công trình xây dựng",
      icon: Building2,
    },
    {
      title: "Giao Thông Vận Tải",
      description: "Sản xuất chi tiết kim loại cho phương tiện vận tải",
      icon: TrendingUp,
    },
  ];

  const stats = [
    { value: "10+", label: "Năm kinh nghiệm", icon: Award },
    { value: "500+", label: "Dự án hoàn thành", icon: Target },
    { value: "200+", label: "Khách hàng tin tưởng", icon: Users },
    { value: "99%", label: "Khách hàng hài lòng", icon: Heart },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[540px] md:h-[680px] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1747999060057-89b7a533f347?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMGZhYnJpY2F0aW9uJTIwZmFjdG9yeXxlbnwxfHx8fDE3NjIwNjk1MTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Thiên Lộc Factory"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/65 to-black/45" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-amber-600 hover:bg-amber-700 text-white">
                Về Chúng Tôi
              </Badge>
              <h1 className="text-white mb-6 text-3xl md:text-4xl lg:text-5xl">
                CÔNG TY TNHH SẢN XUẤT VÀ GIA CÔNG
                <br />
                KIM LOẠI TẤM THIÊN LỘC
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Vững vàng uy tín, vươn tầm chất lượng
              </p>
            </motion.div>

            {/* Company Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl"
            >
              {companyInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 min-h-[88px]"
                  >
                    <div
                      className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${info.color} mb-2`}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-xs text-white/70 mb-1">{info.label}</p>
                    <p className="text-sm text-white">{info.value}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h2 className="mb-4">Giới Thiệu Chung</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mb-6" />
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Trong bối cảnh nền công nghiệp Việt Nam không ngừng phát triển
                và hội nhập sâu rộng với thế giới,
                <span className="font-semibold text-foreground">
                  {" "}
                  CÔNG TY TNHH SẢN XUẤT VÀ GIA CÔNG KIM LOẠI TẤM THIÊN LỘC{" "}
                </span>
                ra đời với sứ mệnh mang đến giải pháp gia công kim loại tấm chất
                lượng cao, chính xác và bền vững, góp phần thúc đẩy sự phát
                triển của ngành cơ khí chế tạo trong nước.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Từ những ngày đầu thành lập, Thiên Lộc đã định hướng trở thành
                một trong những đơn vị hàng đầu trong lĩnh vực sản xuất và gia
                công kim loại tấm. Với đội ngũ kỹ sư, thợ lành nghề nhiều năm
                kinh nghiệm cùng hệ thống máy móc hiện đại, công nghệ tiên tiến,
                chúng tôi tự hào mang đến cho khách hàng những sản phẩm tinh
                xảo, đạt chuẩn kỹ thuật và đáp ứng mọi yêu cầu khắt khe nhất.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1647427060118-4911c9821b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWFudWZhY3R1cmluZ3xlbnwxfHx8fDE3NjIwNzgyOTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Manufacturing"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Decorative elements */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full opacity-20 blur-3xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - Orange gradient band */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-10 md:py-14 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="text-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="inline-flex p-4 rounded-full bg-white/20 backdrop-blur-sm mb-4"
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <div className="text-4xl md:text-5xl text-white mb-2">
                        {stat.value}
                      </div>
                      <div className="text-white/90">{stat.label}</div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-12"
          >
            <div className="text-center">
              <h2 className="mb-4">Sứ Mệnh & Tầm Nhìn</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mx-auto mb-6" />
            </div>

            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Gia công chi tiết kim loại tấm là một trong những loại hình gia
                công phổ biến và quan trọng nhất hiện nay. Các sản phẩm của
                Thiên Lộc được ứng dụng rộng rãi trong nhiều lĩnh vực như cơ khí
                chế tạo, công nghiệp điện – điện tử, xây dựng, giao thông vận
                tải, sản xuất thiết bị công nghiệp, dân dụng và nhiều ngành nghề
                khác.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                Mỗi sản phẩm của chúng tôi không chỉ là một chi tiết kỹ thuật,
                mà còn là sự kết tinh của tâm huyết, sự tỉ mỉ và tinh thần trách
                nhiệm trong từng công đoạn sản xuất.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Thiên Lộc không ngừng đầu tư mở rộng quy mô, nâng cấp công nghệ
                và cải tiến quy trình quản lý để đáp ứng nhu cầu ngày càng cao
                của thị trường. Chúng tôi hiểu rằng, chất lượng sản phẩm chính
                là yếu tố then chốt tạo nên uy tín, vì vậy, mọi khâu trong quy
                trình sản xuất – từ lựa chọn nguyên vật liệu, gia công, xử lý bề
                mặt cho đến khâu kiểm định cuối cùng – đều được thực hiện nghiêm
                ngặt theo tiêu chuẩn chất lượng quốc tế.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="mb-4">Giá Trị Cốt Lõi</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mx-auto mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chính xác trong từng chi tiết – Hoàn hảo trong từng sản phẩm – Tận
              tâm trong từng hợp tác
            </p>
          </motion.div>

          <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -10 }}
                  className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border text-left"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${value.color} mb-4`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services/Applications */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="mb-4">Lĩnh Vực Ứng Dụng</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mx-auto mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sản phẩm của Thiên Lộc được ứng dụng rộng rãi trong nhiều ngành
              công nghiệp
            </p>
          </motion.div>

          <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-card rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 group-hover:text-amber-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Commitment Section - Dark blue band */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0b1220] to-[#0a0f1a]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-white mb-6">Cam Kết Của Chúng Tôi</h2>
              <p className="text-xl text-white/90 leading-relaxed mb-8">
                Với phương châm hoạt động{" "}
                <span className="font-semibold text-amber-400">
                  "Chính xác trong từng chi tiết – Hoàn hảo trong từng sản phẩm
                  – Tận tâm trong từng hợp tác"
                </span>
                , Công ty Thiên Lộc cam kết luôn đồng hành cùng khách hàng và
                đối tác trong mọi dự án, mang lại những giá trị bền vững, góp
                phần nâng cao năng lực sản xuất trong nước và khẳng định vị thế
                của ngành cơ khí Việt Nam trên thị trường khu vực.
              </p>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="inline-block"
              >
                <div className="text-3xl md:text-4xl text-amber-400 mb-4">
                  Thiên Lộc
                </div>
                <div className="text-xl text-white/80">
                  Vững vàng uy tín, vươn tầm chất lượng
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
