import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import "./styles/globals.css";
import "./lib/i18n/config";
import { queryClient } from "./lib/api/queryClient";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Default 404 component for routes without notFoundComponent
const DefaultNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
        <p className="text-muted-foreground mb-8">Page not found</p>
        <a href="/" className="text-primary hover:underline">
          Go back to home
        </a>
      </div>
    </div>
  );
};

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultNotFoundComponent: DefaultNotFound,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider defaultColorScheme="auto">
        <ModalsProvider>
          <Notifications position="top-right" autoClose={3000} />
          <RouterProvider router={router} />
        </ModalsProvider>
      </MantineProvider>
      {process.env.NODE_ENV !== "production" && (
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-right"
          position="bottom"
        />
      )}
    </QueryClientProvider>
  </StrictMode>
);
