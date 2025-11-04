import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getLoginSchema, type LoginFormData } from "@/lib/validations/auth";
import { useLogin } from "@/services/hooks/useAuth";

import { motion } from "motion/react";
import { LogIn } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const login = useAuthStore((s) => s.login);

  if (isAuthenticated) {
    window.location.href = "/";
    return null;
  }

  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(getLoginSchema()),
  });

  const onSubmit = (data: LoginFormData) => {
    setError("");
    loginMutation.mutate(data, {
      onSuccess: async (response) => {
        if (response.success && response.data) {
          // Login sẽ tự động lưu token vào localStorage và gọi API profile
          await login(
            response.data.token,
            response.data.refreshToken
          );
          navigate({ to: "/" });
        } else {
          setError(response.message);
        }
      },
      onError: () => {
        setError("An error occurred. Please try again.");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <LogIn className="h-6 w-6 text-amber-600" />
              <CardTitle className="text-2xl">Login</CardTitle>
            </div>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Logging in..." : "Login"}
              </Button>

              <div className="text-center text-sm space-y-2">
                <a
                  href="/reset-password"
                  className="text-amber-600 hover:underline"
                >
                  Forgot password?
                </a>
                <p className="text-muted-foreground">
                  Don't have an account?{" "}
                  <a
                    href="/register"
                    className="text-amber-600 hover:underline font-medium"
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export const Route = createFileRoute("/login")({
  component: Login,
});
