import { Moon, Sun, ShoppingCart, Menu, X, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import companyLogo from "@/components/public/lib/images/company-logo.png";
import { useLocation } from "@tanstack/react-router";

interface HeaderProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export function Header({ theme, toggleTheme }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const [activeHash, setActiveHash] = useState("#home");

  // Update active hash when URL changes
  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash || "#home");
    };

    // Set initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Navigation items with hash-based links
  const navItems = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.introduction"), href: "/introduction" },
    { name: t("nav.products"), href: "/product" },
    { name: t("nav.services"), href: "/services" },
    { name: t("nav.quote"), href: "/quote" },
    { name: t("nav.project"), href: "/project" },
    { name: t("nav.contact"), href: "/contact" },
  ] as const;

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "vi" ? "en" : "vi";
    i18n.changeLanguage(newLanguage);
  };

  // Check if a nav item is active based on hash
  const isNavItemActive = (href: string) => {
    if (href.startsWith("/")) {
      return location.pathname === href;
    }
    return (
      activeHash === href ||
      (activeHash === "#home" && href === "#home" && location.pathname === "/")
    );
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 w-full border-b backdrop-blur shadow-sm ${theme === "light" ? "bg-white/70" : "bg-black/50"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <div className="h-20 w-20 rounded-xl flex items-center justify-center">
              <img
                src={companyLogo}
                alt="Company Logo"
                width={80}
                height={80}
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-base font-semibold text-foreground">
                THIÊN LỘC
              </span>
              <span className="text-xs text-muted-foreground">
                SX & GIA CÔNG KIM LOẠI TẤM
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item, index) => {
              const isActive = isNavItemActive(item.href);
              return (
                <motion.div
                  key={item.name}
                  className="relative"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <a
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    data-active={isActive}
                    className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 ${
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold shadow-md dark:shadow-primary/20 border-2 border-primary/20 dark:border-primary/30 scale-105"
                        : "text-muted-foreground font-medium hover:bg-accent hover:text-accent-foreground hover:scale-105"
                    }`}
                  >
                    <motion.span
                      className="relative block"
                      whileHover={{ y: -1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 14,
                      }}
                    >
                      {item.name}
                    </motion.span>
                  </a>
                </motion.div>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                className="rounded-full"
                title={
                  i18n.language === "vi"
                    ? "Switch to English"
                    : "Chuyển sang Tiếng Việt"
                }
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={i18n.language}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-1"
                  >
                    <Languages className="h-5 w-5" />
                    <span className="text-xs font-semibold">
                      {i18n.language.toUpperCase()}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </Button>
            </motion.div>

            {/* Theme Toggle */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
              >
                <AnimatePresence mode="wait">
                  {theme === "light" ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full relative"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  0
                </span>
              </Button>
            </motion.div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-4 py-4">
                {navItems.map((item) => {
                  const isActive = isNavItemActive(item.href);
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      data-active={isActive}
                      whileHover={{ x: 10 }}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`rounded-lg px-4 py-3 transition-all font-medium ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md dark:shadow-primary/20 border-l-4 border-primary font-semibold"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:translate-x-1"
                      }`}
                    >
                      {item.name}
                    </motion.a>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
