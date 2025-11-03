import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useAuthStore } from "@/stores/authStore";
import { AdminHeader } from "@/components/admin/admin/AdminHeader";

export const Route = createFileRoute("/admin/_layout")({
  component: () => {
    const { theme, toggleTheme } = useTheme();
    const [language, setLanguage] = useState<"vi" | "en">("vi");
    const logout = useAuthStore((s) => s.logout);

    const handleLogout = () => {
      logout();
      window.location.href = "/admin";
    };

    return (
      <div className="min-h-screen bg-background text-foreground">
        <AdminHeader
          theme={theme}
          toggleTheme={toggleTheme}
          language={language}
          setLanguage={setLanguage}
          onLogout={handleLogout}
        />
        <Outlet />
      </div>
    );
  },
});
