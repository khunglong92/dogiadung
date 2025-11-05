import { createFileRoute } from "@tanstack/react-router";
import { AdminServices } from "@/page/admin/dashboard/services";

export const Route = createFileRoute("/admin/_layout/services")({
  component: AdminServices,
});
