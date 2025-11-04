import {
  Outlet,
  createFileRoute,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useAuthStore } from "@/stores/authStore";
import { AdminHeader } from "@/page/admin/dashboard/AdminHeader";
import { AdminSidebar } from "@/components/admin/layout/admin-sidebar";

export const Route = createFileRoute("/admin/_layout")({
  beforeLoad: ({ location }) => {
    const authStore = useAuthStore.getState();
    const { user, isAuthenticated } = authStore;

    // Nếu không có user hoặc không authenticated, redirect về /admin
    if (!user || !isAuthenticated) {
      throw redirect({
        to: "/admin",
        search: {
          redirect: location.href,
        },
      });
    }

    // Nếu đang ở route /admin/_layout mà không có child route, redirect về dashboard
    if (
      location.pathname === "/admin" ||
      location.pathname === "/admin/_layout"
    ) {
      throw redirect({
        to: "/admin/dashboard",
      });
    }
  },
  component: () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const [language, setLanguage] = useState<"vi" | "en">("vi");
    const logout = useAuthStore((s) => s.logout);
    const user = useAuthStore((s) => s.user);
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    // Double check trong component để đảm bảo
    useEffect(() => {
      if (!user || !isAuthenticated) {
        navigate({ to: "/admin" });
      }
    }, [user, isAuthenticated, navigate]);

    const handleLogout = () => {
      logout();
      navigate({ to: "/admin" });
    };

    // Nếu không có user, không render gì (đang redirect)
    if (!user || !isAuthenticated) {
      return null;
    }

    return (
      <div className="min-h-screen bg-background text-foreground">
        <AdminHeader
          theme={theme}
          toggleTheme={toggleTheme}
          language={language}
          setLanguage={setLanguage}
          onLogout={handleLogout}
        />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 overflow-y-auto h-[calc(100vh-4rem)]">
            <Outlet />
          </main>
        </div>
      </div>
    );
  },
  notFoundComponent: () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
          <p className="text-muted-foreground mb-8">Page not found</p>
          <a href="/admin/dashboard" className="text-primary hover:underline">
            Go back to dashboard
          </a>
        </div>
      </div>
    );
  },
});
