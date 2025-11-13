import { motion } from "motion/react";
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "@tanstack/react-router";

export function Footer() {
  const location = useLocation();
  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com",
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com",
      color: "hover:text-pink-600",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com",
      color: "hover:text-blue-400",
    },
    {
      name: "Youtube",
      icon: Youtube,
      url: "https://youtube.com",
      color: "hover:text-red-600",
    },
  ];

  const quickLinks = [
    { name: "Giới thiệu", href: "/introduction" },
    { name: "Sản phẩm", href: "#products" },
    { name: "Dịch vụ", href: "#services" },
    { name: "Dự án", href: "#project" },
    { name: "Liên hệ", href: "#contact" },
  ];

  const categories = [
    { name: "Bàn ăn", href: "#" },
    { name: "Ghế sofa", href: "#" },
    { name: "Tủ quần áo", href: "#" },
    { name: "Kệ sách", href: "#" },
    { name: "Đồ trang trí", href: "#" },
  ];

  if (location.pathname.includes("/admin")) return null;

  return (
    <footer id="contact" className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <span className="text-white">🪵</span>
              </div>
              <span className="text-xl">Wood & Home</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Chuyên cung cấp đồ gia dụng và nội thất gỗ, nhựa cao cấp cho ngôi
              nhà của bạn.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-amber-600" />
                <span>0123 456 789</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-amber-600" />
                <span>contact@woodhome.vn</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-amber-600" />
                <span>123 Đường ABC, Quận 1, TP.HCM</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="mb-4">Liên Kết</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-amber-600 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="mb-4">Danh Mục</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <a
                    href={category.href}
                    className="text-sm text-muted-foreground hover:text-amber-600 transition-colors"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="mb-4">Nhận Tin Mới</h3>
            <p className="text-sm text-muted-foreground">
              Đăng ký để nhận thông tin về sản phẩm mới và ưu đãi đặc biệt
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Email của bạn"
                className="flex-1"
              />
              <Button className="bg-amber-600 hover:bg-amber-700">
                Đăng ký
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Wood & Home. Tất cả quyền được bảo lưu.
            </p>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Theo dõi chúng tôi:
              </span>
              <div className="flex gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-2 rounded-full bg-muted hover:bg-muted-foreground/10 transition-colors ${social.color}`}
                      aria-label={social.name}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
