import { createFileRoute } from "@tanstack/react-router";
import { AdminDashboard } from "@/page/admin/dashboard/AdminDashboard";

export const Route = createFileRoute("/admin/_layout/dashboard")({
  component: AdminDashboard,
});
