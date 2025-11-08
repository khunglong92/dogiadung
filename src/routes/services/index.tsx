import { createFileRoute } from "@tanstack/react-router";
import { ServicesPage } from "@/page/user/services";

export const Route = createFileRoute("/services/")({
  component: ServicesPage,
});
