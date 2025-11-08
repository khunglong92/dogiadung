import { createFileRoute } from "@tanstack/react-router";
import Project from "@/page/user/project";

export const Route = createFileRoute("/projects/")({
  component: Project,
});
