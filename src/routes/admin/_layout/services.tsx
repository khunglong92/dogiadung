import { createFileRoute } from "@tanstack/react-router";
import { AdminServices } from "@/page/admin/dashboard/AdminServices";

export const Route = createFileRoute("/admin/_layout/services")({
  component: AdminServices,
});
