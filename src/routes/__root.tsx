import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Header } from "@/components/public/layout/Header";
import { Footer } from "@/components/public/layout/Footer";
import { useTheme } from "@/hooks/useTheme";

export const Route = createRootRoute({
  component: () => {
    const { theme, toggleTheme } = useTheme();
    const isAdmin =
      typeof window !== "undefined" &&
      window.location.pathname.startsWith("/admin");

    return (
      <>
        {!isAdmin && <Header theme={theme} toggleTheme={toggleTheme} />}
        <main className="min-h-screen">
          <Outlet />
        </main>
        {!isAdmin && <Footer />}
        {process.env.NODE_ENV !== "production" && <TanStackRouterDevtools />}
      </>
    );
  },
});
