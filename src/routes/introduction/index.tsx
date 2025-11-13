import { createFileRoute } from "@tanstack/react-router";
import Introduction from "@/page/public/introduction";

export const Route = createFileRoute("/introduction/")({
  component: Introduction,
});
