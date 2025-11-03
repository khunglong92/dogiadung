import { createFileRoute } from "@tanstack/react-router";
import { AdminStatistics } from "@/components/admin/admin/AdminStatistics";

export const Route = createFileRoute("/admin/_layout/statistics")({
  component: AdminStatistics,
});
