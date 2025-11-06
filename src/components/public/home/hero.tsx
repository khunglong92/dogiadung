import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className="relative h-[540px] md:h-[680px] overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1747999060057-89b7a533f347?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMGZhYnJpY2F0aW9uJTIwZmFjdG9yeXxlbnwxfHx8fDE3NjIwNjk1MTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Thiên Lộc Metal Processing"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/65 to-black/45" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-white mb-6 text-3xl md:text-4xl lg:text-5xl font-bold">
              {t("about.title")}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-4">
              {t("about.description")}
            </p>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
              {t("about.content")}
            </p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="group relative overflow-hidden rounded-lg bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg hover:shadow-amber-500/50 transition-all duration-300"
                style={{
                  boxShadow:
                    "0 4px 20px rgba(251, 191, 36, 0.4), 0 0 30px rgba(251, 191, 36, 0.2)",
                }}
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
                  to="/product"
                  className="relative z-10 inline-flex items-center font-bold"
                >
                  {t("about.viewProducts")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
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
                  to="/services"
                  className="relative z-10 inline-flex items-center font-bold"
                >
                  {t("about.services")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
