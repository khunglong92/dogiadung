import { createFileRoute } from "@tanstack/react-router";
import Home from "@/page/user/home";

export const Route = createFileRoute("/")({
  component: Home,
});
