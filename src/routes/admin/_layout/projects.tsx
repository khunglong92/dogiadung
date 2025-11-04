import { createFileRoute } from "@tanstack/react-router";
import { AdminProjects } from "@/page/admin/dashboard/AdminProjects";

export const Route = createFileRoute("/admin/_layout/projects")({
  component: AdminProjects,
});
