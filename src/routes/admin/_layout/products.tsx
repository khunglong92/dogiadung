import { createFileRoute } from "@tanstack/react-router";
import { AdminProducts } from "@/components/admin/admin/AdminProducts";

export const Route = createFileRoute("/admin/_layout/products")({
  component: AdminProducts,
});