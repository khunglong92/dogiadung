import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Search, Trash2, Image as ImageIcon } from "lucide-react";
import type { Product } from "@/services/api/productsService";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination";

interface ProductTableProps {
  items: Product[];
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  onEdit: (p: Product) => void;
  onDelete: (id: number) => void;
  page?: number;
  limit?: number;
  total?: number;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

export function ProductTable({
  items,
  searchQuery,
  setSearchQuery,
  onEdit,
  onDelete,
  page = 1,
  limit = 10,
  total = 0,
  onPageChange,
  onLimitChange,
}: ProductTableProps) {
  const safeItems = Array.isArray(items) ? items : [];
  const totalPages = Math.max(1, Math.ceil(total / Math.max(1, limit)));
  const currentPage = Math.min(Math.max(1, page), totalPages);

  const fmtDate = (iso?: string) =>
    iso ? new Date(iso).toLocaleString("vi-VN") : "-";

  const Badge = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
      {children}
    </span>
  );

  const Pill = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center rounded-md bg-muted/60 px-2 py-0.5 text-xs text-foreground">
      {children}
    </span>
  );

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            Danh sách sản phẩm
          </CardTitle>
          <div className="flex items-center gap-3">
            <div className="relative w-72">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                className="pl-10 bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {onLimitChange && (
              <select
                className="h-10 rounded-md border border-border bg-background px-2 text-sm text-foreground"
                value={limit}
                onChange={(e) => onLimitChange(Number(e.target.value))}
              >
                {[10, 20, 50].map((n) => (
                  <option key={n} value={n}>
                    {n}/trang
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-md border border-border bg-card">
          <Table className="text-sm">
            <TableHeader className="sticky top-0 z-10 bg-linear-to-r from-primary/25 via-secondary/20 to-primary/10 text-primary-foreground backdrop-blur shadow-sm supports-backdrop-filter:from-primary/25">
              <TableRow className="border-b border-primary/30 [&>th]:py-3 [&>th]:px-3 first:[&>th]:rounded-tl-md last:[&>th]:rounded-tr-md">
                <TableHead className="w-[72px] text-xs font-semibold uppercase tracking-wide">
                  ID
                </TableHead>
                <TableHead className="min-w-[280px] text-xs font-semibold uppercase tracking-wide">
                  Tên
                </TableHead>
                <TableHead className="min-w-[180px] text-xs font-semibold uppercase tracking-wide">
                  Danh mục
                </TableHead>
                <TableHead className="min-w-[120px] text-right text-xs font-semibold uppercase tracking-wide">
                  Giá
                </TableHead>
                <TableHead className="w-[96px] text-xs font-semibold uppercase tracking-wide">
                  Ảnh
                </TableHead>
                <TableHead className="min-w-[260px] text-xs font-semibold uppercase tracking-wide">
                  Mô tả
                </TableHead>
                <TableHead className="min-w-[240px] text-xs font-semibold uppercase tracking-wide">
                  Thông số
                </TableHead>
                <TableHead className="w-[120px] text-xs font-semibold uppercase tracking-wide">
                  Bảo hành
                </TableHead>
                <TableHead className="min-w-[160px] text-xs font-semibold uppercase tracking-wide">
                  Tạo lúc
                </TableHead>
                <TableHead className="min-w-[160px] text-xs font-semibold uppercase tracking-wide">
                  Cập nhật
                </TableHead>
                <TableHead className="w-[120px] text-right text-xs font-semibold uppercase tracking-wide">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {safeItems?.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={12}
                    className="py-10 text-center text-sm text-muted-foreground"
                  >
                    Không có sản phẩm nào.
                  </TableCell>
                </TableRow>
              )}
              {safeItems?.map((product, index) => {
                const imagesCount = Array.isArray(product.images)
                  ? product.images.length
                  : 0;
                const overview =
                  product.description && typeof product.description === "object"
                    ? String((product.description as any).overview || "")
                    : "";
                const specs = product.technicalSpecs || {};
                const specBadges: string[] = [];
                if ((specs as any).dimensions)
                  specBadges.push(String((specs as any).dimensions));
                if ((specs as any).material)
                  specBadges.push(String((specs as any).material));
                if ((specs as any).weight)
                  specBadges.push(String((specs as any).weight));

                return (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="group border-b last:border-0 odd:bg-primary/10 even:bg-secondary/10 hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors hover:ring-1 hover:ring-primary/40 [&>td]:py-3 [&>td]:px-3"
                  >
                    <TableCell className="font-medium text-muted-foreground">
                      {product.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex max-w-[420px] flex-col gap-0.5">
                        <span className="truncate font-medium">
                          {product.name}
                        </span>
                        {overview && (
                          <span
                            className="line-clamp-2 text-sm text-muted-foreground"
                            title={overview}
                          >
                            {overview}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {product.category?.name ? (
                        <Pill>{product.category.name}</Pill>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {product.price
                        ? new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(Number(product.price))
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <div className="inline-flex items-center gap-1">
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                        <Badge>{imagesCount}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[340px]">
                      {overview ? (
                        <span className="line-clamp-2 text-sm text-muted-foreground">
                          {overview}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="max-w-[320px]">
                      <div className="flex flex-wrap gap-1">
                        {specBadges.length > 0 ? (
                          specBadges.map((s, i) => <Badge key={i}>{s}</Badge>)
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {product.warrantyPolicy ? (
                        <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs text-foreground">
                          {product.warrantyPolicy}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>{fmtDate(product.createdAt)}</TableCell>
                    <TableCell>{fmtDate(product.updatedAt)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(product)}
                          className="hover:bg-primary/10"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(product.id)}
                          className="hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-md border border-primary/30 bg-linear-to-r from-primary/15 via-secondary/15 to-transparent p-3 text-sm text-foreground">
          <span className="px-1">
            Tổng: {total} mục • Trang {currentPage}/{totalPages}
          </span>
          {onPageChange && (
            <Pagination className="px-1">
              <PaginationContent className="gap-2">
                <PaginationItem>
                  <PaginationPrevious
                    className="rounded-md border border-primary/50 bg-primary/90 px-3 text-primary-foreground hover:bg-primary"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) onPageChange(currentPage - 1);
                    }}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    className="rounded-md border border-primary bg-primary px-3 text-primary-foreground shadow-sm hover:opacity-90"
                    isActive
                  >
                    {currentPage}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    className="rounded-md border border-primary/50 bg-primary/90 px-3 text-primary-foreground hover:bg-primary"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages)
                        onPageChange(currentPage + 1);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
