import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function AppButton({
  name = "",
  size = "lg",
  variant = "default",
  onClick,
  to = undefined,
}: {
  name?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "outline";
  onClick?: () => void;
  to?: string;
}) {
  const getTextSize = () => {
    switch (size) {
      case "sm":
        return "!text-xs !font-bold";
      case "lg":
        return "!text-lg !font-bold";
      case "icon":
        return "!text-xs !font-bold";
      default:
        return "!text-base !font-bold";
    }
  };
  if (variant === "outline")
    return (
      <Button
        onClick={onClick}
        size={size}
        variant="outline"
        className="group relative overflow-hidden rounded-lg bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:text-white transition-all duration-300"
      >
        {/* Glow for outline button - contained */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-lg bg-white/15 blur-lg z-0"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Subtle sweeping shine */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 bg-linear-to-r from-transparent via-white/25 to-transparent opacity-50 mix-blend-screen"
          initial={{ x: "-120%" }}
          animate={{ x: ["-120%", "120%"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <Link
          to={to}
          className={`relative z-10 inline-flex items-center font-bold text-white! ${getTextSize()}`}
        >
          {name}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </Button>
    );

  return (
    <Button
      className="group relative overflow-hidden rounded-lg bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg hover:shadow-amber-500/50 transition-all duration-300"
      onClick={onClick}
      size={size}
    >
      {/* Enhanced outer glow - contained */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-lg bg-amber-400/25 blur-xl z-0"
        animate={{ opacity: [0.35, 0.7, 0.35] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-lg bg-orange-400/20 blur-lg z-0"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{
          duration: 2.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Enhanced sweeping shine */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-linear-to-r from-transparent via-white/50 to-transparent opacity-80 mix-blend-screen"
        initial={{ x: "-120%" }}
        animate={{ x: ["-120%", "120%"] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Inner pulse glow */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-lg bg-white/10 z-0"
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <Link
        to={to}
        className={`relative z-10 inline-flex items-center font-bold text-white! ${getTextSize()}`}
      >
        {name}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </Button>
  );
}
