import { useMemo } from "react";
import { motion } from "motion/react";
import { AutoScrollCarousel } from "./auto-scroll-carousel";
import { AnimatedTitle } from "./animated-title";
import {
  Award,
  Clock,
  Shield,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useCategories } from "@/services/hooks/useCategories";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import AppButton from "@/components/atoms/app-button";
import { Link } from "@tanstack/react-router";

export default function ProductsListComponent() {
  const { theme } = useTheme();
  const { data: categories = [] } = useCategories();
  const isDark = theme === "dark";
  const { t } = useTranslation();

  const hotline = import.meta.env.VITE_PHONE_NUMBER || "1900 xxxx";
  const email = import.meta.env.VITE_EMAIL_CONTACT || "info@company.com";
  const address =
    import.meta.env.VITE_COMPANY_ADDRESS ||
    t("products.contact.addressFallback");

  const contactCards = useMemo(
    () => [
      {
        icon: Phone,
        label: t("products.contact.hotlineLabel"),
        value: hotline,
        href: `tel:${hotline}`,
        color: "amber",
      },
      {
        icon: Mail,
        label: t("products.contact.emailLabel"),
        value: email,
        href: `mailto:${email}`,
        color: "blue",
      },
      {
        icon: MapPin,
        label: t("products.contact.addressLabel"),
        value: address,
        href: "#",
        color: "green",
      },
    ],
    [address, email, hotline, t]
  );

  const features = [
    {
      icon: Award,
      title: "Chứng nhận ISO 9001:2015",
      description: "Đảm bảo chất lượng quốc tế",
      gradient: "from-amber-500 to-orange-600",
    },
    {
      icon: Clock,
      title: "Giao hàng đúng hạn",
      description: "Cam kết tiến độ chính xác",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      icon: Shield,
      title: "Bảo hành 24 tháng",
      description: "Hỗ trợ kỹ thuật trọn đời",
      gradient: "from-green-500 to-emerald-600",
    },
  ];

  const achievements = [
    { value: "15+", label: "Năm kinh nghiệm", icon: Sparkles },
    { value: "5000+", label: "Dự án hoàn thành", icon: CheckCircle2 },
    { value: "98%", label: "Hài lòng", icon: Award },
    { value: "24/7", label: "Hỗ trợ", icon: Clock },
  ];

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-500",
        isDark
          ? "bg-linear-to-r from-black/85 via-black/65 to-black/45"
          : "bg-linear-to-b from-white via-slate-50/50 to-white"
      )}
    >
      {/* Hero Section */}
      <section
        className={cn(
          "relative min-h-screen flex items-center overflow-hidden",
          isDark
            ? "bg-linear-to-br from-slate-950 via-slate-900 to-black"
            : "bg-linear-to-br from-slate-50 via-white to-slate-100"
        )}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              "absolute inset-0 opacity-30",
              isDark
                ? "bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.1),transparent_70%)]"
                : "bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.05),transparent_70%)]"
            )}
          />
          {/* Grid Pattern */}
          <div
            className={cn(
              "absolute inset-0",
              isDark
                ? "bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[4rem_4rem]"
                : "bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-size-[4rem_4rem]"
            )}
          />
        </div>

        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={cn(
              "absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20",
              isDark ? "bg-amber-500" : "bg-amber-400"
            )}
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, -60, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={cn(
              "absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-15",
              isDark ? "bg-orange-500" : "bg-orange-300"
            )}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 relative z-10 w-full">
          <div className="max-w-5xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 mb-8 group"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-amber-500/30 blur-xl rounded-full"
                />
                <div
                  className={cn(
                    "relative w-14 h-14 rounded-2xl flex items-center justify-center border-2 backdrop-blur-sm",
                    isDark
                      ? "bg-amber-500/10 border-amber-500/50"
                      : "bg-amber-500/20 border-amber-500/70"
                  )}
                >
                  <Sparkles className="w-6 h-6 text-amber-500" />
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-1">
                  {t("products.hero.badge", "Chuyên nghiệp")}
                </div>
                <div
                  className={cn(
                    "text-sm font-medium uppercase tracking-wide",
                    isDark ? "text-slate-400" : "text-slate-600"
                  )}
                >
                  {t("products.hero.tagline", "Gia công kim loại")}
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={cn(
                "text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-8 leading-[1.1] font-extrabold",
                isDark ? "text-white" : "text-slate-900"
              )}
            >
              <span className="block">
                {t("products.hero.title1", "Chính Xác")}
                <span className="text-amber-500">.</span>
              </span>
              <span className="block text-amber-500">
                {t("products.hero.title2", "Chuyên Nghiệp")}
              </span>
              <span className="block">
                {t("products.hero.title3", "Hoàn Hảo")}
                <span className="text-amber-500">.</span>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-1 w-16 bg-linear-to-r from-amber-500 to-transparent rounded-full" />
                <div
                  className={cn(
                    "h-px flex-1",
                    isDark ? "bg-slate-700" : "bg-slate-200"
                  )}
                />
              </div>
              <p
                className={cn(
                  "text-xl md:text-2xl leading-relaxed max-w-3xl font-light",
                  isDark ? "text-slate-300" : "text-slate-600"
                )}
              >
                {t(
                  "products.hero.description",
                  "Giải pháp gia công kim loại toàn diện với độ chính xác"
                )}{" "}
                <span
                  className={cn(
                    "font-bold",
                    isDark ? "text-amber-400" : "text-amber-600"
                  )}
                >
                  ±0.01mm
                </span>
                ,{" "}
                {t(
                  "products.hero.description2",
                  "đáp ứng mọi nhu cầu công nghiệp từ đơn giản đến phức tạp nhất."
                )}
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-16"
            >
              <Link to="/quote">
                <AppButton
                  variant="default"
                  size="lg"
                  label={t("products.hero.cta.quote", "Yêu cầu báo giá")}
                  leftSection={<Sparkles className="w-5 h-5" />}
                />
              </Link>
              <Link to="/contact">
                <AppButton
                  variant={isDark ? "outline" : "outline-primary"}
                  size="lg"
                  label={t("products.hero.cta.contact", "Liên hệ ngay")}
                  leftSection={<Phone className="w-5 h-5" />}
                />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {achievements.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={cn(
                    "relative p-6 flex gap-x-2 justify-center items-center rounded-2xl border backdrop-blur-sm transition-all duration-300",
                    isDark
                      ? "bg-slate-800/50 border-slate-700 hover:border-amber-500/50 hover:bg-slate-800/70"
                      : "bg-white/70 border-slate-200 hover:border-amber-400 hover:bg-white/90 shadow-lg"
                  )}
                >
                  <stat.icon
                    className={cn(
                      "w-6 h-6 mb-3",
                      isDark ? "text-amber-400" : "text-amber-600"
                    )}
                  />
                  <div>
                    <div
                      className={cn(
                        "text-3xl md:text-4xl font-bold mb-1",
                        isDark ? "text-white" : "text-slate-900"
                      )}
                    >
                      {stat.value}
                    </div>
                    <div
                      className={cn(
                        "text-xs font-medium uppercase tracking-wider",
                        isDark ? "text-slate-400" : "text-slate-600"
                      )}
                    >
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className={cn(
          "py-24 md:py-32 relative",
          isDark
            ? "bg-linear-to-b from-slate-950 to-slate-900"
            : "bg-linear-to-b from-white to-slate-50"
        )}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              className={cn(
                "text-4xl md:text-5xl lg:text-6xl font-bold mb-6",
                isDark ? "text-white" : "text-slate-900"
              )}
            >
              {t("products.features.title", "Tại sao chọn chúng tôi")}
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div
                className={cn(
                  "h-px flex-1 max-w-32",
                  isDark ? "bg-slate-700" : "bg-slate-200"
                )}
              />
              <div className="h-1 w-16 bg-linear-to-r from-transparent via-amber-500 to-transparent rounded-full" />
              <div
                className={cn(
                  "h-px flex-1 max-w-32",
                  isDark ? "bg-slate-700" : "bg-slate-200"
                )}
              />
            </div>
            <p
              className={cn(
                "text-lg md:text-xl max-w-2xl mx-auto text-center",
                isDark ? "text-slate-400" : "text-slate-600"
              )}
            >
              {t(
                "products.features.subtitle",
                "Cam kết chất lượng và dịch vụ xuất sắc"
              )}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={cn(
                  "relative p-8 rounded-3xl flex flex-col justify-center items-center border-2 transition-all duration-500 overflow-hidden group",
                  isDark
                    ? "bg-slate-800/50 border-slate-700 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10"
                    : "bg-white border-slate-200 hover:border-amber-400 hover:shadow-2xl"
                )}
              >
                {/* Gradient Overlay */}
                <div
                  className={cn(
                    "absolute inset-0 bg-linear-to-br opacity-0 flex flex-col justify-center items-center group-hover:opacity-10 transition-opacity duration-500",
                    `bg-linear-to-br ${feature.gradient}`
                  )}
                />
                {/* Icon */}
                <div
                  className={cn(
                    "relative mb-6 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500",
                    `bg-linear-to-br ${feature.gradient}`
                  )}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3
                  className={cn(
                    "text-2xl font-bold mb-3 relative z-10 text-center",
                    isDark ? "text-white" : "text-slate-900"
                  )}
                >
                  {feature.title}
                </h3>
                <p
                  className={cn(
                    "text-base leading-relaxed relative z-10 text-center",
                    isDark ? "text-slate-400" : "text-slate-600"
                  )}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section
        className={cn(
          "py-24 md:py-32",
          isDark
            ? "bg-linear-to-b from-slate-900 via-slate-950 to-slate-900"
            : "bg-linear-to-b from-slate-50 via-white to-slate-50"
        )}
      >
        <div className="max-w-7xl mx-auto px-6">
          {categories.length === 0 ? (
            <div className="text-center py-20">
              <p
                className={cn(
                  "text-xl",
                  isDark ? "text-slate-400" : "text-slate-600"
                )}
              >
                {t("products.categories.empty", "Chưa có danh mục sản phẩm")}
              </p>
            </div>
          ) : (
            categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className={cn(index !== 0 && "mt-24 md:mt-32", "relative")}
              >
                <div className="mb-12 px-6">
                  <AnimatedTitle
                    number={index < 9 ? `0${index + 1}` : `${index + 1}`}
                    title={category.name}
                    isDark={isDark}
                  />
                </div>
                <div className="flex justify-center items-center">
                  <AutoScrollCarousel categoryId={category.id} />
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={cn(
          "py-24 md:py-32 relative overflow-hidden",
          isDark
            ? "bg-linear-to-br from-slate-950 via-slate-900 to-black"
            : "bg-linear-to-br from-slate-100 via-white to-slate-50"
        )}
      >
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className={cn(
              "absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20",
              isDark ? "bg-amber-500" : "bg-amber-400"
            )}
          />
          <div
            className={cn(
              "absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20",
              isDark ? "bg-orange-500" : "bg-orange-400"
            )}
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              className={cn(
                "text-4xl md:text-5xl lg:text-6xl font-bold mb-6",
                isDark ? "text-white" : "text-slate-900"
              )}
            >
              {t("products.contact.title", "Liên hệ với chúng tôi")}
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div
                className={cn(
                  "h-px flex-1 max-w-32",
                  isDark ? "bg-slate-700" : "bg-slate-200"
                )}
              />
              <div className="h-1 w-16 bg-linear-to-r from-transparent via-amber-500 to-transparent rounded-full" />
              <div
                className={cn(
                  "h-px flex-1 max-w-32",
                  isDark ? "bg-slate-700" : "bg-slate-200"
                )}
              />
            </div>
            <p
              className={cn(
                "text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed",
                isDark ? "text-slate-300" : "text-slate-600"
              )}
            >
              {t(
                "products.contact.subtitle",
                "Sẵn sàng hỗ trợ bạn với giải pháp tốt nhất"
              )}
            </p>
          </motion.div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactCards.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={cn(
                  "relative p-8 rounded-3xl flex flex-col justify-center items-center border-2 transition-all duration-500 overflow-hidden group",
                  isDark
                    ? "bg-slate-800/70 border-slate-700 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/20"
                    : "bg-white border-slate-200 hover:border-amber-400 hover:shadow-2xl"
                )}
              >
                {/* Gradient Overlay */}
                <div
                  className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500",
                    item.color === "amber" &&
                      "bg-linear-to-br from-amber-500 to-orange-600",
                    item.color === "blue" &&
                      "bg-linear-to-br from-blue-500 to-cyan-600",
                    item.color === "green" &&
                      "bg-linear-to-br from-green-500 to-emerald-600"
                  )}
                />
                {/* Icon */}
                <div
                  className={cn(
                    "relative mb-6 w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-sm border transition-all duration-500 group-hover:scale-110",
                    item.color === "amber" &&
                      (isDark
                        ? "bg-amber-500/20 border-amber-500/50 text-amber-400"
                        : "bg-amber-500/10 border-amber-500/30 text-amber-600"),
                    item.color === "blue" &&
                      (isDark
                        ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                        : "bg-blue-500/10 border-blue-500/30 text-blue-600"),
                    item.color === "green" &&
                      (isDark
                        ? "bg-green-500/20 border-green-500/50 text-green-400"
                        : "bg-green-500/10 border-green-500/30 text-green-600")
                  )}
                >
                  <item.icon className="w-7 h-7" />
                </div>
                <div
                  className={cn(
                    "text-sm font-medium uppercase tracking-wider mb-3 relative z-10 text-center",
                    isDark ? "text-slate-400" : "text-slate-600"
                  )}
                >
                  {item.label}
                </div>
                <div
                  className={cn(
                    "text-lg md:text-xl font-bold relative z-10",
                    isDark ? "text-white" : "text-slate-900"
                  )}
                >
                  {item.value}
                </div>
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <AppButton
              variant={isDark ? "outline" : "default"}
              size="lg"
              label={t("products.contact.cta", "Gọi ngay")}
              leftSection={<Phone className="w-5 h-5" />}
              showArrow={false}
              to={`tel:${hotline}`}
            />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={cn(
          "py-12 border-t",
          isDark ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
        )}
      >
        <div
          className={cn(
            "max-w-7xl mx-auto px-6 text-center",
            isDark ? "text-slate-400" : "text-slate-600"
          )}
        >
          <p className="text-sm md:text-base">
            {t("products.contact.footer", "© 2024 Tất cả quyền được bảo lưu")}
          </p>
        </div>
      </footer>
    </div>
  );
}
