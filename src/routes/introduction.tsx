import { createFileRoute } from "@tanstack/react-router";
import Introduction from "@/page/user/introduction";

export const Route = createFileRoute("/introduction")({
  component: Introduction,
});
