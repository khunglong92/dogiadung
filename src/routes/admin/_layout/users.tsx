import { createFileRoute } from "@tanstack/react-router";
import { AdminUsers } from "@/page/admin/dashboard/AdminUsers";

export const Route = createFileRoute("/admin/_layout/users")({
  component: AdminUsers,
});
