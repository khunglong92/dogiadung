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

interface AdminSidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export function AdminSidebar({
  currentPage,
  setCurrentPage,
}: AdminSidebarProps) {
  const menuItems = [
    {
      id: "dashboard",
      name: "Tổng quan",
      icon: LayoutDashboard,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "products",
      name: "Quản lý sản phẩm",
      icon: Package,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: "services",
      name: "Quản lý dịch vụ",
      icon: Briefcase,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "projects",
      name: "Quản lý dự án",
      icon: FolderKanban,
      color: "from-orange-500 to-red-500",
    },
    {
      id: "users",
      name: "Quản lý người dùng",
      icon: Users,
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: "statistics",
      name: "Thống kê",
      icon: BarChart3,
      color: "from-amber-500 to-orange-600",
    },
  ];

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
              onClick={() => setCurrentPage(item.id)}
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
