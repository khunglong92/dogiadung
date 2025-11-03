import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { LogOut, Languages, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";
import { useLogout } from "@/services/hooks/useAuth";
import {
  useAuthStore,
  selectIsAuthenticated,
  selectUser,
} from "@/stores/authStore";

export function AdminHeader() {
  const { t, i18n } = useTranslation();
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const user = useAuthStore(selectUser);
  const doLogout = useAuthStore((s) => s.logout);
  const logoutMutation = useLogout();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "vi" ? "en" : "vi";
    i18n.changeLanguage(newLanguage);
  };

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSettled: () => {
        doLogout();
        window.location.href = "/admin";
      },
    });
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow">
              <ShieldAlert className="h-4 w-4 text-white" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Admin</div>
              <div className="text-xs text-muted-foreground">Portal</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
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
              <Languages className="h-5 w-5" />
            </Button>
            {isAuthenticated && (
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="rounded-full text-amber-700 hover:bg-amber-600/10 dark:text-amber-400 dark:hover:bg-amber-400/10"
              >
                <LogOut className="h-5 w-5 mr-2" />
                {t("logout", { defaultValue: "Logout" })}
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
