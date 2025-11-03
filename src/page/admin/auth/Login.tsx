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
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { useLogin } from "@/services/hooks/useAuth";
import { motion } from "motion/react";
import { LogIn } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

export function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [error, setError] = useState<string>("");
  const loginMutation = useLogin();
  const setLoggedIn = useAuthStore((s) => s.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    setError("");
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        if (response.success && response.data) {
          setLoggedIn(response.data.user, response.data.token);
          onSuccess();
        } else {
          setError(response.message);
        }
      },
      onError: () => setError("An error occurred. Please try again."),
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-6 bg-gradient-to-br from-white to-muted/60 dark:from-[#0b0f1a] dark:to-[#0a0d16]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-orange-600/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg"
      >
        <Card className="border border-border/60 bg-card/80 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                <LogIn className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl tracking-wide">
                  Admin Portal
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Secure access to the administration dashboard
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...register("email")}
                  className="h-11 rounded-lg bg-input-background/60 dark:bg-input/30 border-input focus-visible:ring-[3px] focus-visible:ring-ring/50"
                />
                {errors.email && (
                  <p className="text-xs text-destructive">
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
                  className="h-11 rounded-lg bg-input-background/60 dark:bg-input/30 border-input focus-visible:ring-[3px] focus-visible:ring-ring/50"
                />
                {errors.password && (
                  <p className="text-xs text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                className="w-full h-11 rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-600/20 transition-shadow"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Signing in..." : "Sign in"}
              </Button>
              <div className="text-center text-xs text-muted-foreground">
                Protected area. Unauthorized access is prohibited.
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
