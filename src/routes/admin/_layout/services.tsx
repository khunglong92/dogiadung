import { createFileRoute } from "@tanstack/react-router";
import { AdminServices } from "@/components/admin/admin/AdminServices";

export const Route = createFileRoute("/admin/_layout/services")({
  component: AdminServices,
});
