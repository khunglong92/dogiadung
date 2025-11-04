import { createFileRoute } from "@tanstack/react-router";
import AdminCategoryPage from "@/page/admin/dashboard/category";

export const Route = createFileRoute("/admin/_layout/categories")({
  component: AdminCategoryPage,
});
