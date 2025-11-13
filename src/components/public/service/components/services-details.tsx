import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "@tanstack/react-router";
import Autoplay from "embla-carousel-autoplay";
import {
  servicesService,
  CompanyService,
} from "@/services/api/servicesService";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ImageWithFallback } from "@/components/public/figma/ImageWithFallback";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, ShieldCheck, Users } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Lightbox } from "@/components/atoms/light-box";
import { DetailSkeleton } from "./detail-services-skeleton";
import { AppThumbnailImage } from "../../common/app-thumbnail-image";
import { useTranslation } from "react-i18next";
import AppButton from "@/components/atoms/app-button";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

const RawHtml = ({ html, className }: { html: string; className?: string }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
);

export function ServiceDetailComponent() {
  const { id } = useParams({ from: "/services/$id" });
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [service, setService] = useState<CompanyService | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const autoplayPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  useEffect(() => {
    if (!id) return;
    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await servicesService.findOne(id);
        setService(response);
      } catch (error) {
        toast.error(t("serviceDetail.toast.loadError"));
      } finally {
        setLoading(false);
      }
    };
    window.scrollTo(0, 0);
    fetchService();
  }, [id, t]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevLightboxImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) =>
        prev! > 0 ? prev! - 1 : (service?.image_urls?.length || 0) - 1
      );
    }
  };
  const nextLightboxImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) =>
        prev! < (service?.image_urls?.length || 0) - 1 ? prev! + 1 : 0
      );
    }
  };

  if (loading) return <DetailSkeleton />;

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-16 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <h2 className="mb-4 text-2xl font-semibold">
          {t("serviceDetail.notFound.title")}
        </h2>
        <p className="text-muted-foreground mb-8">
          {t("serviceDetail.notFound.description")}
        </p>
        <Button asChild>
          <Link to="/services">{t("serviceDetail.notFound.backButton")}</Link>
        </Button>
      </div>
    );
  }

  const otherInfoSections = [
    {
      icon: ShieldCheck,
      title: t("serviceDetail.sidebar.benefits"),
      content: service.benefits,
    },
    {
      icon: Cpu,
      title: t("serviceDetail.sidebar.technologies"),
      content: service.technologies,
    },
    {
      icon: Users,
      title: t("serviceDetail.sidebar.customers"),
      content: service.customers,
    },
  ].filter((s) => s.content);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[450px] md:h-[550px]">
        <div className="absolute inset-0 overflow-hidden">
          <AppThumbnailImage
            src={service.image_urls?.[0]}
            alt={service.alt_text || service.title}
            className="w-full h-full"
            fit="cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              {service.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-16"
          >
            <section id="gioi-thieu">
              <RawHtml
                html={service.content}
                className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed"
              />
            </section>

            {service.features && (
              <section id="tinh-nang">
                <h2 className="text-3xl font-bold mb-8 relative pb-4 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-24 after:h-1 after:bg-linear-to-r after:from-amber-500 after:to-orange-600">
                  {t("serviceDetail.features.title")}
                </h2>
                <RawHtml
                  html={service.features}
                  className="prose max-w-none dark:prose-invert prose-ul:list-none prose-ul:p-0 prose-li:flex prose-li:items-start prose-li:gap-3 prose-li:mb-4 before:content-[''] before:hidden"
                />
              </section>
            )}

            {service.image_urls && service.image_urls.length > 0 && (
              <section id="hinh-anh">
                <h2 className="text-3xl font-bold mb-8 relative pb-4 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-24 after:h-1 after:bg-linear-to-r after:from-amber-500 after:to-orange-600">
                  {t("serviceDetail.gallery.title")}
                </h2>
                <Carousel
                  plugins={[autoplayPlugin.current]}
                  opts={{ loop: true, align: "start" }}
                  className="w-full relative"
                  onMouseEnter={autoplayPlugin.current.stop}
                  onMouseLeave={() => autoplayPlugin.current.play()}
                >
                  <CarouselContent>
                    {service.image_urls.map((url, i) => (
                      <CarouselItem key={i} className="basis-1/2 md:basis-1/3">
                        <div className="p-1">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            onClick={() => openLightbox(i)}
                            className="overflow-hidden rounded-lg border shadow-sm group cursor-pointer"
                          >
                            <ImageWithFallback
                              src={url}
                              alt={`${service.title} ${i + 1}`}
                              className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
                            />
                          </motion.div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 -left-14 z-10 bg-white/10 backdrop-blur-lg cursor-pointer shadow-2xl p-6 hover:opacity-50" />
                  <CarouselNext className="absolute top-1/2 -translate-y-1/2 -right-14 z-10 bg-white/10 backdrop-blur-lg cursor-pointer shadow-2xl p-6 hover:opacity-50" />
                </Carousel>
              </section>
            )}

            {otherInfoSections.length > 0 && (
              <section id="thong-tin-them" className="pt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherInfoSections.map((section, i) => (
                    <motion.div
                      key={section.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
                      className="bg-card border rounded-xl p-6 shadow-sm"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-full">
                          <section.icon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <h3 className="text-xl font-semibold">
                          {section.title}
                        </h3>
                      </div>
                      <RawHtml
                        html={section.content}
                        className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground"
                      />
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className={cn(
                " shadow-sm rounded-xl p-8 text-center mt-8",
                theme === "dark" ? "shadow-xl" : "shadow-sm"
              )}
            >
              <h3 className="text-xl font-bold mb-3">
                {service.cta_label || t("serviceDetail.cta.defaultTitle")}
              </h3>
              <p className="mb-6 text-sm">
                {t("serviceDetail.cta.description")}
              </p>
              <AppButton
                variant={theme === "dark" ? "outline" : "default"}
                label={t("serviceDetail.cta.contactButton")}
                to={service.cta_link || "/contact"}
              />
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Lightbox
        images={service.image_urls || []}
        selectedIndex={lightboxIndex}
        onClose={closeLightbox}
        onPrev={prevLightboxImage}
        onNext={nextLightboxImage}
      />
    </div>
  );
}
