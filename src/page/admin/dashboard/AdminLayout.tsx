import { useState } from "react";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "../../../components/layout/sidebar-manager";
import { AdminDashboard } from "./AdminDashboard";
import { AdminProducts } from "./AdminProducts";
import { AdminServices } from "./services";
import { AdminProjects } from "./AdminProjects";
import { AdminUsers } from "./AdminUsers";
import { AdminStatistics } from "./AdminStatistics";

interface AdminLayoutProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
  onLogout: () => void;
}

export function AdminLayout({
  theme,
  toggleTheme,
  onLogout,
}: AdminLayoutProps) {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [language, setLanguage] = useState<"vi" | "en">("vi");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <AdminDashboard />;
      case "products":
        return <AdminProducts />;
      case "services":
        return <AdminServices />;
      case "projects":
        return <AdminProjects />;
      case "users":
        return <AdminUsers />;
      case "statistics":
        return <AdminStatistics />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader
        theme={theme}
        toggleTheme={toggleTheme}
        language={language}
        setLanguage={setLanguage}
        onLogout={onLogout}
      />
      <div className="flex">
        <AdminSidebar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <main className="flex-1 overflow-y-auto h-[calc(100vh-4rem)]">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
