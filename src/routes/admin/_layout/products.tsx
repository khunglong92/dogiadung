import { createFileRoute } from "@tanstack/react-router";
import { AdminProducts } from "@/page/admin/dashboard/AdminProducts";

export const Route = createFileRoute("/admin/_layout/products")({
  component: AdminProducts,
});
