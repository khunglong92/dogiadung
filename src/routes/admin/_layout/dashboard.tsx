import { createFileRoute } from "@tanstack/react-router";
import { AdminDashboard } from "@/components/admin/admin/AdminDashboard";

export const Route = createFileRoute("/admin/_layout/dashboard")({
  component: AdminDashboard,
});
