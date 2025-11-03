import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useAuthStore } from "@/stores/authStore";
import { AdminHeader } from "@/components/admin/admin/AdminHeader";
import { AdminLogin } from "@/components/admin/admin/AdminLogin";

export const Route = createFileRoute("/admin/")({
  component: () => {
    const { theme, toggleTheme } = useTheme();
    const [language, setLanguage] = useState<"vi" | "en">("vi");
    const logout = useAuthStore((s) => s.logout);

    return (
      <div className="min-h-screen bg-background text-foreground">
        <AdminHeader
          theme={theme}
          toggleTheme={toggleTheme}
          language={language}
          setLanguage={setLanguage}
          onLogout={() => {
            logout();
            window.location.href = "/admin";
          }}
        />
        <AdminLogin
          onLogin={() => (window.location.href = "/admin/_layout/dashboard")}
        />
      </div>
    );
  },
});
