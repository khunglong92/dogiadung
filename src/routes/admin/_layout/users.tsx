import { createFileRoute } from "@tanstack/react-router";
import { AdminUsers } from "@/components/admin/admin/AdminUsers";

export const Route = createFileRoute("/admin/_layout/users")({
  component: AdminUsers,
});
