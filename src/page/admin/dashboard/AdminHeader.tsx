import { Moon, Sun, LogOut, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";

interface AdminHeaderProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
  language: "vi" | "en";
  setLanguage: (lang: "vi" | "en") => void;
  onLogout: () => void;
}

export function AdminHeader({
  theme,
  toggleTheme,
  language,
  setLanguage,
  onLogout,
}: AdminHeaderProps) {
  const { t, i18n } = useTranslation();

  const changeLang = (lang: "vi" | "en") => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md border-border">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 backdrop-blur-md border border-border flex items-center justify-center">
              <span className="text-primary text-sm">⚙️</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {t("admin.header.title")}
              </h2>
              <p className="text-xs text-muted-foreground">
                {t("admin.header.subtitle")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Toggle (match public Header behavior/UI) */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => changeLang(language === "vi" ? "en" : "vi")}
              className="rounded-full"
              title={
                language === "vi"
                  ? "Switch to English"
                  : "Chuyển sang Tiếng Việt"
              }
              aria-label={t("admin.header.language")}
              type="button"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={language}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-1"
                >
                  <Languages className="h-5 w-5" />
                  <span className="text-xs font-semibold">
                    {language.toUpperCase()}
                  </span>
                </motion.div>
              </AnimatePresence>
            </Button>
          </motion.div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar>
                  <AvatarFallback className="bg-linear-to-br from-amber-500 to-orange-600 text-white">
                    AD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-card text-card-foreground border border-border shadow-xl min-w-[200px]"
              style={{ backgroundColor: "var(--card)", opacity: 1 }}
            >
              <DropdownMenuLabel className="px-3 py-2">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold">Admin</p>
                  <p className="text-xs text-muted-foreground">
                    admin@thienloc.vn
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem
                onClick={onLogout}
                className="text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/30 cursor-pointer px-3 py-2"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {t("admin.header.logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
