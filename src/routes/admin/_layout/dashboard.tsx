import { AdminDashboard } from "@/page/admin/dashboard/AdminDashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_layout/dashboard")({
  component: AdminDashboard,
});
