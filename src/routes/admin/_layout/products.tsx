import { createFileRoute } from "@tanstack/react-router";
import AdminProductPage from "@/page/admin/dashboard/product";

export const Route = createFileRoute("/admin/_layout/products")({
  component: AdminProductPage,
});
