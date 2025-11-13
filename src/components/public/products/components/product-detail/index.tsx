import type { ReactNode } from "react";
import { useState } from "react";
import { useParams, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useProductDetail } from "../../hooks/use-product-detail";
import type { ProductDescription } from "@/services/api/productsService";
import { ProductImageGallery } from "./components/ProductImageGallery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Share2,
  Package,
  Ruler,
  Weight,
  Layers,
  CheckCircle2,
  Tag,
  ChevronRight,
  Home,
  Heart,
  Phone,
  Sparkles,
  FileText,
} from "lucide-react";
import DetailProductSkeleton from "./components/detail-product-skeleton";
import DetailProductNotFound from "./components/detail-product-not-found";
import DetailProductError from "./components/detail-product-error";
import AppButton from "@/components/atoms/app-button";
import { AppThumbnailImage } from "@/components/public/common/app-thumbnail-image";
import zaloImage from "@/images/contacts/zalo.svg";
import { toast } from "sonner";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

type TechnicalSpecKey =
  | "dimensions"
  | "weight"
  | "material"
  | "loadCapacity"
  | "weldingType"
  | "surfaceFinish"
  | "customizable";

type DisplaySpecKey = Exclude<TechnicalSpecKey, "customizable">;

type TechnicalSpecsMap = Record<DisplaySpecKey, string | null> & {
  customizable: boolean;
};

const SPEC_ICON_MAP: Record<DisplaySpecKey, ReactNode> = {
  dimensions: <Ruler className="w-5 h-5" />,
  weight: <Weight className="w-5 h-5" />,
  material: <Layers className="w-5 h-5" />,
  loadCapacity: <Package className="w-5 h-5" />,
  weldingType: <Layers className="w-5 h-5" />,
  surfaceFinish: <Sparkles className="w-5 h-5" />,
};

type SectionHeadingProps = {
  icon: ReactNode;
  title: string;
  description?: string;
};

const SectionHeading = ({ icon, title, description }: SectionHeadingProps) => (
  <header className="mb-6 flex flex-col gap-3">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-foreground">{title}</h3>
    </div>
    {description ? (
      <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
        {description}
      </p>
    ) : null}
  </header>
);

type ProductDescriptionRich = ProductDescription & {
  features?: unknown;
  applications?: unknown;
  materials?: unknown;
};

type TechnicalSpecsRich = {
  dimensions?: unknown;
  weight?: unknown;
  material?: unknown;
  loadCapacity?: unknown;
  weldingType?: unknown;
  surfaceFinish?: unknown;
  customizable?: unknown;
};

const safeParseJson = <T,>(value: unknown): T | null => {
  if (typeof value !== "string") {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.error("Failed to parse JSON value", error);
    return null;
  }
};

const parseProductDescription = (
  rawDescription: unknown
): ProductDescriptionRich | null => {
  if (!rawDescription) {
    return null;
  }

  if (typeof rawDescription === "string") {
    return safeParseJson<ProductDescriptionRich>(rawDescription);
  }

  if (typeof rawDescription === "object") {
    return rawDescription as ProductDescriptionRich;
  }

  return null;
};

const parseTechnicalSpecs = (
  rawTechnicalSpecs: unknown
): TechnicalSpecsRich | null => {
  if (!rawTechnicalSpecs) {
    return null;
  }

  if (typeof rawTechnicalSpecs === "string") {
    const parsed = safeParseJson<TechnicalSpecsRich>(rawTechnicalSpecs);

    if (parsed) {
      return parsed;
    }

    return {
      dimensions: rawTechnicalSpecs,
    };
  }

  if (typeof rawTechnicalSpecs === "object") {
    return rawTechnicalSpecs as TechnicalSpecsRich;
  }

  return null;
};

const normalizeTechnicalSpecs = (
  source: TechnicalSpecsRich | null
): TechnicalSpecsMap => ({
  dimensions:
    source &&
    (typeof source.dimensions === "string" ||
      typeof source.dimensions === "number")
      ? String(source.dimensions)
      : null,
  weight:
    source &&
    (typeof source.weight === "string" || typeof source.weight === "number")
      ? String(source.weight)
      : null,
  material:
    source && typeof source.material === "string" ? source.material : null,
  loadCapacity:
    source &&
    (typeof source.loadCapacity === "string" ||
      typeof source.loadCapacity === "number")
      ? String(source.loadCapacity)
      : null,
  weldingType:
    source && typeof source.weldingType === "string"
      ? source.weldingType
      : null,
  surfaceFinish:
    source && typeof source.surfaceFinish === "string"
      ? source.surfaceFinish
      : null,
  customizable:
    source && typeof source.customizable === "boolean"
      ? source.customizable
      : false,
});

const buildDisplaySpecs = (
  technicalSpecs: TechnicalSpecsMap,
  specsLabelMap: Record<DisplaySpecKey, string>
) =>
  (
    Object.entries(technicalSpecs) as Array<
      [TechnicalSpecKey, string | boolean | null]
    >
  )
    .filter(
      (entry): entry is [DisplaySpecKey, string] =>
        entry[0] !== "customizable" &&
        entry[1] !== null &&
        entry[1] !== "" &&
        typeof entry[1] === "string"
    )
    .map(([key, value]) => ({
      key,
      label: specsLabelMap[key],
      value,
    }));

// Lấy số điện thoại từ biến môi trường
const ZALO_PHONE_NUMBER =
  import.meta.env.VITE_ZALO_PHONE_NUMBER || "0987654321";
const PHONE_NUMBER = import.meta.env.VITE_PHONE_NUMBER || "0967853383";

export default function ProductDetail() {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const { id } = useParams({ from: "/products/$id" });
  const { product, loading, error } = useProductDetail(id);
  const [isFavorite, setIsFavorite] = useState(false);
  const isDark = theme === "dark";

  const rawDescription = product?.description ?? null;
  const rawTechnicalSpecs = product?.technicalSpecs ?? null;
  const descriptionData = parseProductDescription(rawDescription);
  const technicalSpecsSource = parseTechnicalSpecs(rawTechnicalSpecs);
  const technicalSpecs = normalizeTechnicalSpecs(technicalSpecsSource);
  const specsLabelMap: Record<DisplaySpecKey, string> = {
    dimensions: t("productDetail.specs.dimensions"),
    weight: t("productDetail.specs.weight"),
    material: t("productDetail.specs.material"),
    loadCapacity: t("productDetail.specs.loadCapacity"),
    weldingType: t("productDetail.specs.weldingType"),
    surfaceFinish: t("productDetail.specs.surfaceFinish"),
  };
  const displaySpecs = buildDisplaySpecs(technicalSpecs, specsLabelMap);
  const materialsSubtitle = t("productDetail.materials.subtitle", {
    defaultValue: "",
  });
  const technicalSpecsSubtitle = t("productDetail.technicalSpecs.subtitle", {
    defaultValue: "",
  });

  // Helper to format price based on current language
  const formatPrice = (price: number | null | undefined) => {
    if (price === null || price === undefined) {
      return t("productDetail.price.contact");
    }
    const locale = i18n.language === "vi" ? "vi-VN" : "en-US";
    const currency = i18n.language === "vi" ? "VND" : "USD";
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(price);
  };

  if (loading) {
    return <DetailProductSkeleton />;
  }

  if (error) {
    return <DetailProductError t={t} error={error} />;
  }

  if (!product) {
    return <DetailProductNotFound t={t} />;
  }

  const overview =
    descriptionData && typeof descriptionData.overview === "string"
      ? descriptionData.overview
      : "";
  const features: string[] =
    descriptionData && Array.isArray(descriptionData.features)
      ? descriptionData.features.map(String)
      : [];
  const applications: string[] =
    descriptionData && Array.isArray(descriptionData.applications)
      ? descriptionData.applications.map(String)
      : [];
  const materials: string[] =
    descriptionData && Array.isArray(descriptionData.materials)
      ? descriptionData.materials.map(String)
      : [];

  const handleShare = async () => {
    const url = window.location.href;

    // Thử dùng Web Share API trước (nếu có)
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: product.name,
          text: overview || product.name,
          url: url,
        });
        return;
      } catch (err) {
        // Nếu user cancel thì không làm gì
        if ((err as Error).name === "AbortError") {
          return;
        }
      }
    }

    // Fallback: Copy link vào clipboard
    try {
      await navigator.clipboard.writeText(url);
      toast.success(
        t(
          "productDetail.actions.shareSuccess",
          "Đã sao chép link vào clipboard!"
        )
      );
    } catch (err) {
      console.error("Error copying to clipboard:", err);
      toast.error(
        t("productDetail.actions.shareError", "Không thể sao chép link")
      );
    }
  };

  return (
    <div className="relative min-h-screen bg-linear-to-b from-background via-background to-muted/20">
      <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,#f59e0b20,transparent_55%)] dark:opacity-30" />
      {/* Breadcrumb Navigation */}
      <div className="border-b bg-muted/40/80 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            <Link
              to="/"
              className="flex items-center gap-1 rounded-full border border-transparent px-3 py-1 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
            >
              <Home className="w-4 h-4" />
              <span>{t("breadcrumb.home", "Home")}</span>
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link
              to="/products"
              className="rounded-full px-3 py-1 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            >
              {t("breadcrumb.products", "Products")}
            </Link>
            {product.category && (
              <>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <span className="rounded-full px-3 py-1 text-muted-foreground">
                  {product.category.name}
                </span>
              </>
            )}
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="max-w-[220px] truncate rounded-full bg-primary/10 px-3 py-1 text-foreground font-medium">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 lg:py-12">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Image Gallery - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-lg shadow-black/5">
              <div className="pointer-events-none absolute inset-x-0 -top-32 h-64 bg-linear-to-b from-primary/10 via-transparent to-transparent" />
              <ProductImageGallery
                images={product.images || []}
                productName={product.name}
              />
            </div>
          </motion.div>

          {/* Product Info - Right Side (Sticky) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="space-y-6 lg:sticky lg:top-24">
              {/* Header */}
              <div>
                <div className="mb-4 flex items-start justify-between gap-4 rounded-3xl border border-border/60 bg-card/95 p-6 shadow-xl shadow-black/5 backdrop-blur">
                  <div className="flex-1 space-y-4">
                    {product.isFeatured && (
                      <Badge className="bg-linear-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/40">
                        <Sparkles className="w-3 h-3 mr-1" />
                        {t("productDetail.badge.featured")}
                      </Badge>
                    )}
                    <h1 className="text-3xl font-semibold leading-tight text-foreground md:text-4xl">
                      {product.name}
                    </h1>
                    {product.category && (
                      <Link
                        to="/products"
                        search={{ category: product.category.id }}
                        className="group inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary transition-all hover:border-primary/40 hover:bg-primary/15"
                      >
                        <div className="rounded-full bg-primary/15 p-1.5 transition-colors group-hover:bg-primary/25">
                          <Tag className="w-4 h-4 text-primary" />
                        </div>
                        <span>{product.category.name}</span>
                        <ChevronRight className="w-4 h-4 text-primary transition-all group-hover:translate-x-1" />
                      </Link>
                    )}
                  </div>
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`rounded-full border bg-background/80 p-3 transition-all duration-300 hover:scale-105 ${
                      isFavorite
                        ? "border-red-300/60 bg-red-50 text-red-600 shadow-inner"
                        : "border-border text-muted-foreground hover:border-red-200"
                    }`}
                    aria-label="Add to favorites"
                  >
                    <Heart
                      className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                    />
                  </button>
                </div>
              </div>

              <Separator />

              {/* Price Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-md shadow-primary/10"
              >
                <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                  {t("productDetail.price.label")}
                </p>
                <p className="text-3xl font-bold text-primary md:text-4xl">
                  {formatPrice(product.price)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("productDetail.price.vat", "VAT included")}
                </p>
              </motion.div>

              {/* Quick Specs */}
              <Card className="border border-border/70 shadow-lg shadow-black/5">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-base font-semibold">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <Package className="w-4 h-4 text-primary" />
                    </div>
                    {t("productDetail.specs.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {technicalSpecs.dimensions && (
                    <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/80 p-3 shadow-sm transition-colors hover:border-primary/30">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Ruler className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {t("productDetail.specs.dimensions")}
                        </p>
                        <p className="truncate text-sm font-semibold text-foreground">
                          {technicalSpecs.dimensions}
                        </p>
                      </div>
                    </div>
                  )}
                  {technicalSpecs.weight && (
                    <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/80 p-3 shadow-sm transition-colors hover:border-primary/30">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Weight className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {t("productDetail.specs.weight")}
                        </p>
                        <p className="truncate text-sm font-semibold text-foreground">
                          {technicalSpecs.weight}
                        </p>
                      </div>
                    </div>
                  )}
                  {technicalSpecs.loadCapacity && (
                    <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/80 p-3 shadow-sm transition-colors hover:border-primary/30">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Package className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {t("productDetail.specs.loadCapacity")}
                        </p>
                        <p className="truncate text-sm font-semibold text-foreground">
                          {technicalSpecs.loadCapacity}
                        </p>
                      </div>
                    </div>
                  )}
                  {technicalSpecs.material && (
                    <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/80 p-3 shadow-sm transition-colors hover:border-primary/30">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Layers className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {t("productDetail.specs.material")}
                        </p>
                        <p className="truncate text-sm font-semibold text-foreground">
                          {technicalSpecs.material}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Customizable Badge */}
              {technicalSpecs.customizable && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="relative overflow-hidden rounded-2xl border border-green-200/70 bg-linear-to-r from-green-50 to-emerald-50 p-4 shadow-sm dark:border-green-800 dark:from-green-950/20 dark:to-emerald-950/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900/30">
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="mb-1 text-sm font-semibold text-green-900 dark:text-green-100">
                        {t(
                          "productDetail.customizable.title",
                          "Customizable Product"
                        )}
                      </p>
                      <p className="text-xs text-green-700 dark:text-green-300">
                        {t("productDetail.customizable.message")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-2 gap-3">
                  <AppButton
                    variant="default"
                    size="lg"
                    label={t("productDetail.actions.contact", "Liên hệ ngay")}
                    to={`tel:${PHONE_NUMBER}`}
                    leftSection={<Phone className="w-5 h-5" />}
                  />
                  <button
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 text-sm font-medium text-muted-foreground hover:text-primary group"
                  >
                    <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    {t("productDetail.actions.share", "Chia sẻ")}
                  </button>
                </div>
                <a
                  href={`https://zalo.me/${ZALO_PHONE_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all duration-300 text-sm font-bold shadow-sm hover:shadow-md group",
                    isDark
                      ? "border-blue-400 hover:border-blue-300 bg-blue-500/25 hover:bg-blue-500/35 text-blue-200 hover:text-blue-100"
                      : "border-blue-500 hover:border-blue-600 bg-blue-500/20 hover:bg-blue-500/30 text-blue-800 hover:text-blue-900"
                  )}
                >
                  <AppThumbnailImage
                    src={zaloImage}
                    alt="Zalo"
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                  />
                  <span>{t("productDetail.actions.zalo", "Chat Zalo")}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Detailed Information Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-2 shadow-xl">
            <CardContent className="p-6 lg:p-8">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid h-auto w-full grid-cols-2 rounded-full border border-border/60 bg-background/80 p-1 md:grid-cols-4">
                  <TabsTrigger
                    value="overview"
                    className="rounded-full px-4 py-3 text-sm font-medium transition-all data-[state=active]:bg-primary/90 data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
                  >
                    <div className="flex items-center gap-x-2">
                      <FileText className="w-4 h-4 mr-2" />
                      <p> {t("productDetail.tabs.overview")}</p>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger
                    value="features"
                    className="rounded-full px-4 py-3 text-sm font-medium transition-all data-[state=active]:bg-primary/90 data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
                  >
                    <div className="flex items-center gap-x-2">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      {t("productDetail.tabs.features")}
                    </div>
                  </TabsTrigger>
                  <TabsTrigger
                    value="materials"
                    className="rounded-full px-4 py-3 text-sm font-medium transition-all data-[state=active]:bg-primary/90 data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
                  >
                    <div className="flex items-center gap-x-2">
                      <Layers className="w-4 h-4 mr-2" />
                      {t("productDetail.tabs.materials")}
                    </div>
                  </TabsTrigger>
                  <TabsTrigger
                    value="specs"
                    className="rounded-full px-4 py-3 text-sm font-medium transition-all data-[state=active]:bg-primary/90 data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
                  >
                    <div className="flex items-center gap-x-2">
                      <Ruler className="w-4 h-4 mr-2" />
                      {t("productDetail.tabs.specs")}
                    </div>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-8 space-y-6">
                  <div>
                    <SectionHeading
                      icon={<FileText className="h-5 w-5" />}
                      title={t("productDetail.overview.title")}
                    />
                    <div className="prose prose-lg max-w-none">
                      <p className="text-muted-foreground leading-relaxed text-base">
                        {overview || t("productDetail.overview.noInfo")}
                      </p>
                    </div>
                  </div>

                  {applications.length > 0 && (
                    <div className="border-t pt-6">
                      <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                        <Package className="h-5 w-5 text-primary" />
                        {t("productDetail.overview.applications")}
                      </h4>
                      <div className="grid gap-3 md:grid-cols-2">
                        {applications.map((app, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group flex items-start gap-3 rounded-2xl border border-border/60 bg-background/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
                          >
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary transition-transform group-hover:scale-110" />
                            <span className="text-sm font-medium text-foreground">
                              {app}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="features" className="mt-8">
                  <SectionHeading
                    icon={<CheckCircle2 className="h-5 w-5" />}
                    title={t("productDetail.features.title")}
                  />
                  {features.length > 0 ? (
                    <div className="space-y-3">
                      {features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="group relative flex items-center gap-4 rounded-xl border border-muted/50 bg-card/50 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                        >
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                            <CheckCircle2 className="w-6 h-6" />
                          </div>
                          <span className="text-foreground font-medium text-base leading-relaxed flex-1">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground mt-4">
                      {t("productDetail.features.noInfo")}
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="materials" className="mt-8">
                  <SectionHeading
                    icon={<Layers className="h-5 w-5" />}
                    title={t("productDetail.materials.title")}
                    description={
                      materials.length > 0 && materialsSubtitle
                        ? materialsSubtitle
                        : undefined
                    }
                  />
                  {materials.length > 0 ? (
                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {materials.map((material, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.08 }}
                          className="group relative overflow-hidden rounded-2xl border border-muted/50 bg-card/60 p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
                        >
                          {/* Decorative gradient overlay */}
                          <div className="absolute inset-0 bg-linear-to-br from-primary/0 via-primary/5 to-primary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                          {/* Icon container */}
                          <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                            <Layers className="w-7 h-7" />
                          </div>

                          {/* Material name */}
                          <p className="relative font-bold text-foreground text-lg leading-snug">
                            {material}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground mt-4">
                      {t("productDetail.materials.noInfo")}
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="specs" className="mt-8">
                  <SectionHeading
                    icon={<Ruler className="h-5 w-5" />}
                    title={t("productDetail.technicalSpecs.title")}
                    description={
                      technicalSpecsSubtitle
                        ? technicalSpecsSubtitle
                        : undefined
                    }
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {displaySpecs.map(({ key, label, value }, index) => {
                      return (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.06 }}
                          className="group flex items-center gap-4 rounded-2xl border border-muted/60 bg-card/70 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg"
                        >
                          {/* Icon */}
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                            {SPEC_ICON_MAP[key] || (
                              <Package className="w-5 h-5" />
                            )}
                          </div>

                          {/* Text content */}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                              {label}
                            </p>
                            <p className="font-bold text-foreground text-lg truncate">
                              {value}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}

                    {/* Customizable badge */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-background/80 p-5 shadow-sm md:col-span-2"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-md">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {t("productDetail.customizable.label")}
                        </p>
                        <Badge
                          variant={
                            technicalSpecs.customizable
                              ? "default"
                              : "secondary"
                          }
                          className="px-4 py-1.5 text-sm"
                        >
                          {technicalSpecs.customizable
                            ? t("productDetail.customizable.yes")
                            : t("productDetail.customizable.no")}
                        </Badge>
                      </div>
                    </motion.div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Warranty Info */}
        {product.warrantyPolicy && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={cn(
              "mt-10 rounded-3xl border-2 p-6 shadow-lg",
              isDark
                ? "border-blue-700/50 bg-slate-800/90 shadow-blue-500/20"
                : "border-blue-300 bg-white shadow-blue-500/10"
            )}
          >
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "rounded-2xl p-3 shadow-md",
                  isDark ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
                )}
              >
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h4
                  className={cn(
                    "mb-2 text-lg font-bold leading-tight",
                    isDark ? "text-blue-100" : "text-slate-900"
                  )}
                >
                  {t("productDetail.warranty.title", "Warranty Information")}
                </h4>
                <p
                  className={cn(
                    "text-base font-semibold leading-relaxed",
                    isDark ? "text-blue-200" : "text-slate-800"
                  )}
                >
                  {t("productDetail.warranty.message")}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 mb-12"
        >
          <Card className="overflow-hidden border border-primary/20 shadow-2xl shadow-primary/10">
            <div className="relative bg-linear-to-br from-primary/15 via-primary/5 to-transparent p-8 lg:p-12">
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative mx-auto max-w-3xl text-center">
                <Badge className="mb-4 rounded-full bg-primary px-4 py-1.5 text-primary-foreground shadow-sm shadow-primary/40">
                  {t("productDetail.cta.badge", "Need Help?")}
                </Badge>
                <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
                  {t("productDetail.cta.title", "Interested in this product?")}
                </h2>
                <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
                  {t(
                    "productDetail.cta.description",
                    "Contact us for detailed information, custom quotes, or to discuss your specific requirements."
                  )}
                </p>

                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <AppButton
                    variant="default"
                    size="lg"
                    label={t("productDetail.cta.contactButton", "Gọi ngay")}
                    to={`tel:${PHONE_NUMBER}`}
                    leftSection={<Phone className="w-5 h-5" />}
                  />
                  <a
                    href={`https://zalo.me/${ZALO_PHONE_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 transition-all duration-300 text-base font-bold shadow-sm hover:shadow-md",
                      isDark
                        ? "border-blue-400 hover:border-blue-300 bg-blue-500/25 hover:bg-blue-500/35 text-blue-200 hover:text-blue-100"
                        : "border-blue-500 hover:border-blue-600 bg-blue-500/20 hover:bg-blue-500/30 text-blue-800 hover:text-blue-900"
                    )}
                  >
                    <AppThumbnailImage
                      src={zaloImage}
                      alt="Zalo"
                      className="w-5 h-5"
                    />
                    <span>
                      {t("productDetail.cta.zaloButton", "Chat Zalo")}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
