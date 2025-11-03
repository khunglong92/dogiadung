import { createFileRoute } from "@tanstack/react-router";
import { AdminProjects } from "@/components/admin/admin/AdminProjects";

export const Route = createFileRoute("/admin/_layout/projects")({
  component: AdminProjects,
});
