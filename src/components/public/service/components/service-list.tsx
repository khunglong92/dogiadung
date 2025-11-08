import { motion } from "framer-motion";
import { ImageWithFallback } from "@/components/public/figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CompanyService } from "@/services/api/servicesService";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";

interface ServiceListProps {
  services: CompanyService[];
}

// Helper to render HTML strings safely
const RawHtml = ({ html, className }: { html: string; className?: string }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
);

export function ServiceList({ services }: ServiceListProps) {
  if (!services || services.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Không có dịch vụ nào để hiển thị.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {services.map((service, index) => {
        const isEven = index % 2 === 0;
        const defaultColor = "from-amber-500 to-orange-600";

        return (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            id={service.slug}
          >
            <Card className="overflow-hidden border-2 hover:shadow-2xl transition-all duration-300">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${
                  isEven ? "" : "lg:grid-flow-row-dense"
                }`}
              >
                {/* Image */}
                <div
                  className={`relative h-[300px] lg:h-auto ${
                    isEven ? "" : "lg:col-start-2"
                  }`}
                >
                  <ImageWithFallback
                    src={
                      service.image_urls?.[0] ||
                      "https://via.placeholder.com/800x600"
                    }
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Content */}
                <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <Badge
                      className={`mb-4 bg-gradient-to-r ${defaultColor} text-white border-0`}
                    >
                      Dịch vụ nổi bật
                    </Badge>
                    <h3 className="mb-4 text-2xl md:text-3xl">
                      {service.title}
                    </h3>
                    {/* Subtitle/Short Description */}
                    <RawHtml
                      html={service.short_description || ""}
                      className="text-muted-foreground mb-6 leading-relaxed prose prose-sm max-w-none prose-p:m-0"
                    />

                    {/* Features List */}
                    {service.features && (
                      <RawHtml
                        html={service.features}
                        className="space-y-3 mb-6 prose prose-sm max-w-none prose-ul:list-none prose-ul:p-0 prose-li:flex prose-li:items-start prose-li:gap-3 prose-li:m-0 before:content-[''] before:hidden"
                      />
                    )}

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        className={`bg-gradient-to-r ${defaultColor} text-white border-0 hover:opacity-90`}
                        asChild
                      >
                        <Link to={`/services/${service.id}`}>
                          Xem chi tiết
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
