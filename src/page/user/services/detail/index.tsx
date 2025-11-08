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
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Cpu, ShieldCheck, Users } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Lightbox } from "@/components/public/figma/Lightbox";

const RawHtml = ({ html, className }: { html: string; className?: string }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
);

const DetailSkeleton = () => (
  <div className="min-h-screen">
    <Skeleton className="h-[450px] w-full" />
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-32 w-full mt-8" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </div>
  </div>
);

export function ServiceDetailPage() {
  const { id } = useParams({ from: "/services/$id" });
  const [service, setService] = useState<CompanyService | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const autoplayPlugin = useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: false,
      playOnInit: true,
    })
  );

  useEffect(() => {
    if (!id) return;
    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await servicesService.findOne(id);
        setService(response);
      } catch (error) {
        toast.error("Không thể tải chi tiết dịch vụ.");
      } finally {
        setLoading(false);
      }
    };
    window.scrollTo(0, 0);
    fetchService();
  }, [id]);

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
        <h2 className="mb-4 text-2xl font-semibold">Không Tìm Thấy Dịch Vụ</h2>
        <p className="text-muted-foreground mb-8">
          Dịch vụ bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
        <Button asChild>
          <Link to="/services">Quay lại danh sách dịch vụ</Link>
        </Button>
      </div>
    );
  }

  const sidebarSections = [
    { icon: ShieldCheck, title: "Lợi ích", content: service.benefits },
    { icon: Cpu, title: "Công nghệ", content: service.technologies },
    { icon: Users, title: "Đối tác & Khách hàng", content: service.customers },
  ].filter((s) => s.content);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-[450px] md:h-[550px]">
        <div className="absolute inset-0 overflow-hidden">
          <ImageWithFallback
            src={
              service.image_urls?.[0] || "https://via.placeholder.com/1600x900"
            }
            alt={service.alt_text || service.title}
            className="w-full h-full object-cover"
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

      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <section id="gioi-thieu" className="mb-12">
              <RawHtml
                html={service.content}
                className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed"
              />
            </section>

            {service.features && (
              <section id="tinh-nang" className="mb-12">
                <h2 className="text-3xl font-bold mb-6 border-l-4 border-amber-500 pl-4">
                  Tính Năng Vượt Trội
                </h2>
                <RawHtml
                  html={service.features}
                  className="prose max-w-none dark:prose-invert prose-ul:list-none prose-ul:p-0 prose-li:flex prose-li:items-start prose-li:gap-3 prose-li:mb-4 before:content-[''] before:hidden"
                />
              </section>
            )}

            {service.image_urls && service.image_urls.length > 0 && (
              <section id="hinh-anh">
                <h2 className="text-3xl font-bold mb-6 border-l-4 border-amber-500 pl-4">
                  Thư Viện Dự Án
                </h2>
                <Carousel
                  plugins={[autoplayPlugin.current]}
                  opts={{ loop: true, align: "start" }}
                  className="w-full"
                  onMouseEnter={autoplayPlugin.current.stop}
                  onMouseLeave={autoplayPlugin.current.reset}
                >
                  <CarouselContent>
                    {service.image_urls.map((url, i) => (
                      <CarouselItem
                        key={i}
                        className="basis-1/2 md:basis-1/3 lg:basis-1/4"
                      >
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
                  <CarouselPrevious className="-left-4" />
                  <CarouselNext className="-right-4" />
                </Carousel>
              </section>
            )}
          </motion.div>

          <aside className="lg:col-span-1 relative">
            <div className="sticky top-24 space-y-8">
              {sidebarSections.map((section, i) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
                  className="bg-card border rounded-xl p-6 shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-full">
                      <section.icon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <h3 className="text-xl font-semibold">{section.title}</h3>
                  </div>
                  <RawHtml
                    html={section.content}
                    className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground"
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-xl p-8 text-center mt-8"
              >
                <h3 className="text-xl font-bold mb-3">
                  {service.cta_label || "Bắt Đầu Dự Án Của Bạn"}
                </h3>
                <p className="text-white/80 mb-6 text-sm">
                  Liên hệ ngay để được tư vấn giải pháp tối ưu nhất.
                </p>
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-amber-600 w-full"
                  asChild
                >
                  <Link to={service.cta_link || "/contact"}>
                    Liên Hệ Ngay <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </aside>
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
