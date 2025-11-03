import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function LocationMap() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Địa chỉ",
      content: "123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      color: "from-red-500 to-pink-600",
    },
    {
      icon: Phone,
      title: "Điện thoại",
      content: "0123 456 789",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Mail,
      title: "Email",
      content: "contact@woodhome.vn",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: Clock,
      title: "Giờ làm việc",
      content: "Thứ 2 - Chủ nhật: 8:00 - 20:00",
      color: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <section id="location" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="mb-4">Vị Trí Cửa Hàng</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ghé thăm showroom của chúng tôi để trải nghiệm trực tiếp các sản
            phẩm nội thất chất lượng cao
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-card rounded-2xl p-8 shadow-lg border">
              <h3 className="mb-6">Thông Tin Liên Hệ</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                      className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div
                        className={`p-3 rounded-lg bg-gradient-to-br ${info.color} flex-shrink-0`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm mb-1">{info.title}</h4>
                        <p className="text-muted-foreground text-sm">
                          {info.content}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-8 text-white shadow-lg"
            >
              <h3 className="mb-4 text-white">Đặt lịch tư vấn miễn phí</h3>
              <p className="mb-6 text-white/90">
                Để được tư vấn chi tiết về sản phẩm và nhận ưu đãi đặc biệt, hãy
                liên hệ với chúng tôi ngay hôm nay!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:0123456789"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-amber-600 rounded-lg hover:bg-white/90 transition-colors"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Gọi ngay
                </a>
                <a
                  href="mailto:contact@woodhome.vn"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white border-2 border-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Gửi email
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-card rounded-2xl overflow-hidden shadow-lg border h-full min-h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4949653591754!2d106.70291897570754!3d10.775017889375406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3330bcc9%3A0xb26520701e572a5d!2zTMOqIEzhu5tpLCBCw6puIE5naOG6uSwgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1699999999999!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[500px]"
                title="Wood & Home Location"
              />
            </div>

            {/* Decorative overlay */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-20 blur-2xl pointer-events-none"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
