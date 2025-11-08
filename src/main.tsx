import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import "./styles/globals.css";
import "./lib/i18n/config";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/tiptap/styles.css";
import { queryClient } from "./lib/api/queryClient";
import {
  MantineProvider,
  ColorSchemeScript,
  localStorageColorSchemeManager,
  createTheme,
  MantineColorsTuple,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { routeTree } from "./routeTree.gen";

const myColor: MantineColorsTuple = [
  "#1e64fa",
  "#1e64fa",
  "#1e64fa",
  "#1e64fa",
  "#1e64fa",
  "#1e64fa",
  "#1e64fa",
  "#1e64fa",
  "#1e64fa",
  "#1e64fa",
  "#1e64fa",
];

const theme = createTheme({
  colors: {
    myColor,
  },
  components: {
    Table: {
      // styles: {
      //   thead: {
      //     background: "var(--mantine-color-myColor-1)",
      //     color: "white",
      //     height: "50px",
      //     fontWeight: "bold",
      //     textTransform: "uppercase",
      //     fontSize: "var(--mantine-font-size-xs)",
      //     borderRadius: "var(--mantine-radius-md)",
      //   },
      //   th: {
      //     fontWeight: "bold",
      //     textTransform: "uppercase",
      //     fontSize: "var(--mantine-font-size-xs)",
      //     borderRight:
      //       "1px solid light-dark(var(--mantine-color-myColor-2), var(--mantine-color-dark-1))",
      //     "&:last-of-type": {
      //       borderRight: "none",
      //     },
      //   },
      // },
    },
    Pagination: {
      styles: {
        control: {
          "&[data-active]": {
            background: "var(--mantine-color-myColor-6)",
            border: "none",
          },
        },
      },
    },
  },
});

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

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: DefaultNotFound,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const savedTheme =
  (typeof window !== "undefined" && localStorage.getItem("theme")) || "light";
if (typeof window !== "undefined") {
  const root = document.documentElement;
  if (savedTheme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ColorSchemeScript defaultColorScheme={savedTheme as "light" | "dark"} />
      <MantineProvider
        theme={theme}
        defaultColorScheme={savedTheme as "light" | "dark"}
        colorSchemeManager={localStorageColorSchemeManager({ key: "theme" })}
      >
        <ModalsProvider>
          <Notifications position="top-right" autoClose={3000} />
          <RouterProvider router={router} />
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>
);
