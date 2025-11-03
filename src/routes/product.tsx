import { createFileRoute } from "@tanstack/react-router";
import Product from "@/page/user/product";

export const Route = createFileRoute("/product")({
  component: Product,
});