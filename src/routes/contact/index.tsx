import { createFileRoute } from "@tanstack/react-router";
import Contact from "@/page/user/contact";

export const Route = createFileRoute("/contact/")({
  component: Contact,
});
