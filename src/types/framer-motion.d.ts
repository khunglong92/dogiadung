import "framer-motion";

declare module "framer-motion" {
  interface MotionProps {
    className?: string;
    onClick?: () => void;
    title?: string;
    href?: string;
  }
}
