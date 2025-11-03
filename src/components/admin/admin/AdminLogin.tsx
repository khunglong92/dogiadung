import { useState } from "react";
import { motion } from "motion/react";
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
import { Lock, User, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "@/components/public/figma/ImageWithFallback";

interface AdminLoginProps {
  onLogin: () => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      credentials.username === "admin" &&
      credentials.password === "admin123"
    ) {
      toast.success("Đăng nhập thành công!");
      onLogin();
    } else {
      toast.error("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Background image from Introduction hero */}
      <div className="absolute inset-0 -z-10">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1747999060057-89b7a533f347?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMGZhYnJpY2F0aW9uJTIwZmFjdG9yeXxlbnwxfHx8fDE3NjIwNjk1MTh8MA&ixlib=rb-4.1.0&q=80&w=1920"
          alt="Thiên Lộc Factory"
          className="w-full h-full object-cover"
        />
        {/* Overlays for readability in both themes */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/55 to-black/35 dark:from-black/75 dark:via-black/65 dark:to-black/45" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md p-4"
      >
        {/* Glass card with strong contrast */}
        <div className="rounded-2xl p-[1px] bg-white/10 backdrop-blur-md shadow-[0_10px_50px_-15px_rgba(0,0,0,0.45)]">
          <Card className="rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/30 dark:border-white/10 text-white">
            <CardHeader className="space-y-2 text-center pb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring" }}
                className="mx-auto mb-2 h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg hover:bg-white/20 transition-colors"
              >
                <Lock className="h-7 w-7 text-white" />
              </motion.div>
              <CardTitle className="text-2xl tracking-wide">
                Thiên Lộc Admin
              </CardTitle>
              <CardDescription className="text-white/80">
                Đăng nhập vào hệ thống quản trị
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white/90">
                    Tên đăng nhập
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-white/70" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Nhập tên đăng nhập"
                      className="pl-10 h-11 rounded-lg bg-white/15 border-white/30 text-white placeholder:text-white/70 focus-visible:ring-[3px] focus-visible:ring-white/60"
                      value={credentials.username}
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          username: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white/90">
                    Mật khẩu
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-white/70" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu"
                      className="pl-10 pr-10 h-11 rounded-lg bg-white/15 border-white/30 text-white placeholder:text-white/70 focus-visible:ring-[3px] focus-visible:ring-white/60"
                      value={credentials.password}
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                      }
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-white/80 hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 rounded-lg bg-white/10 backdrop-blur-md border border-white/30 text-white hover:opacity-90 shadow-lg shadow-white/25"
                >
                  Đăng nhập
                </Button>
                <div className="text-center text-xs text-white/80">
                  Demo: username: <span className="font-semibold">admin</span> /
                  password: <span className="font-semibold">admin123</span>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
