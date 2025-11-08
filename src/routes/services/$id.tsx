import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetailPage } from "@/page/user/services/detail";

export const Route = createFileRoute("/services/$id")({
  component: ServiceDetailPage,
});
