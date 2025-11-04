import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useAuthStore } from "@/stores/authStore";
import { AdminHeader } from "@/page/admin/dashboard/AdminHeader";
import AdminLogin from "@/page/admin/auth/login/index";

export const Route = createFileRoute("/admin/")({
  component: () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const [language, setLanguage] = useState<"vi" | "en">("vi");
    const logout = useAuthStore((s) => s.logout);
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    if (isAuthenticated) {
      navigate({ to: "/admin/dashboard" });
      return null;
    }

    return (
      <div className="min-h-screen bg-background text-foreground">
        <AdminHeader
          theme={theme}
          toggleTheme={toggleTheme}
          language={language}
          setLanguage={setLanguage}
          onLogout={() => {
            logout();
            navigate({ to: "/admin" });
          }}
        />
        <AdminLogin
          onLogin={() => {
            // Delay nhỏ để có thời gian xem console.log
            setTimeout(() => {
              navigate({ to: "/admin/dashboard" });
            }, 100);
          }}
        />
      </div>
    );
  },
  notFoundComponent: () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
          <p className="text-muted-foreground mb-8">Page not found</p>
          <a href="/admin" className="text-primary hover:underline">
            Go back to admin
          </a>
        </div>
      </div>
    );
  },
});
