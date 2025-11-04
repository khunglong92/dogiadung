import { motion } from "motion/react";
import {
  LayoutDashboard,
  Package,
  Briefcase,
  FolderKanban,
  Users,
  BarChart3,
} from "lucide-react";
import { cn } from "@/components/ui/utils";
import { useTranslation } from "react-i18next";
import { useNavigate, useRouterState } from "@tanstack/react-router";

export function AdminSidebar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const routerState = useRouterState();

  // Xác định trang hiện tại từ route path
  const currentPath = routerState.location.pathname;
  const currentPage = currentPath.split("/").pop() || "dashboard";

  const menuItems = [
    {
      id: "dashboard",
      route: "/admin/dashboard",
      name: t("admin.sidebar.dashboard"),
      icon: LayoutDashboard,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "products",
      route: "/admin/products",
      name: t("admin.sidebar.products"),
      icon: Package,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: "categories",
      route: "/admin/categories",
      name: t("admin.sidebar.categories"),
      icon: Package,
      color: "from-teal-500 to-emerald-600",
    },
    {
      id: "services",
      route: "/admin/services",
      name: t("admin.sidebar.services"),
      icon: Briefcase,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "projects",
      route: "/admin/projects",
      name: t("admin.sidebar.projects"),
      icon: FolderKanban,
      color: "from-orange-500 to-red-500",
    },
    {
      id: "users",
      route: "/admin/users",
      name: t("admin.sidebar.users"),
      icon: Users,
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: "statistics",
      route: "/admin/statistics",
      name: t("admin.sidebar.statistics"),
      icon: BarChart3,
      color: "from-amber-500 to-orange-600",
    },
  ];

  const handleNavigate = (route: string) => {
    navigate({ to: route as any });
  };

  return (
    <aside className="w-64 border-r bg-card h-[calc(100vh-4rem)] overflow-y-auto">
      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleNavigate(item.route)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r " + item.color + " text-white shadow-lg"
                  : "hover:bg-accent"
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm">{item.name}</span>
            </motion.button>
          );
        })}
      </nav>
    </aside>
  );
}
