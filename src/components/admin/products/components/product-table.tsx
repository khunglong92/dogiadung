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
    <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-800 px-2 py-0.5 text-xs font-medium">
      {children}
    </span>
  );

  const Pill = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center rounded-md bg-purple-100 text-purple-700 px-2 py-0.5 text-xs font-semibold">
      {children}
    </span>
  );

  return (
    <Card className="overflow-hidden shadow-xl border-none">
      {/* 🌈 Header */}
      <CardHeader className="pb-4 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 text-white">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold tracking-wide">
            🌟 Danh sách sản phẩm
          </CardTitle>
          <div className="flex items-center gap-3">
            <div className="relative w-72">
              <Search className="absolute left-3 top-3 h-4 w-4 text-sky-200" />
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                className="pl-10 bg-white/20 text-white placeholder:text-white/70 border border-white/30 rounded-md focus:ring-2 focus:ring-yellow-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardHeader>

      {/* 📋 Table */}
      <CardContent className="bg-white">
        <div className="overflow-x-auto rounded-md border border-gray-200">
          <Table className="text-sm">
            <TableHeader className="bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100">
              <TableRow className="[&>th]:py-3 [&>th]:px-3 border-b border-indigo-200">
                <TableHead className="w-[72px] text-xs font-bold uppercase text-indigo-700">
                  ID
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-indigo-700">
                  Tên
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-indigo-700">
                  Danh mục
                </TableHead>
                <TableHead className="text-right text-xs font-bold uppercase text-indigo-700">
                  Giá
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-indigo-700">
                  Ảnh
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-indigo-700">
                  Mô tả
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-indigo-700">
                  Thông số
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-indigo-700">
                  Bảo hành
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-indigo-700">
                  Tạo lúc
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-indigo-700">
                  Cập nhật
                </TableHead>
                <TableHead className="text-right text-xs font-bold uppercase text-indigo-700">
                  Thao tác
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {safeItems.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={12}
                    className="py-10 text-center text-gray-400"
                  >
                    Không có sản phẩm nào.
                  </TableCell>
                </TableRow>
              )}
              {safeItems.map((product, index) => {
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
                    className="border-b hover:bg-blue-50 transition-colors"
                  >
                    <TableCell className="text-gray-500">
                      {product.id}
                    </TableCell>
                    <TableCell className="font-semibold text-gray-800">
                      {product.name}
                    </TableCell>
                    <TableCell>
                      {product.category?.name ? (
                        <Pill>{product.category.name}</Pill>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right text-blue-700 font-medium">
                      {product.price
                        ? new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(Number(product.price))
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <div className="inline-flex items-center gap-1">
                        <ImageIcon className="h-4 w-4 text-indigo-500" />
                        <Badge>{imagesCount}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{overview}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {specBadges.length > 0 ? (
                          specBadges.map((s, i) => <Badge key={i}>{s}</Badge>)
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {product.warrantyPolicy ? (
                        <Badge>{product.warrantyPolicy}</Badge>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>{fmtDate(product.createdAt)}</TableCell>
                    <TableCell>{fmtDate(product.updatedAt)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(product)}
                          className="hover:bg-blue-100 text-blue-600"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(product.id)}
                          className="hover:bg-red-100 text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* 🔥 Pagination */}
        <div className="mt-6 flex items-center justify-between gap-4 rounded-md bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-3 text-white shadow-md">
          <span className="px-1 font-semibold">
            Tổng: {total} mục • Trang {currentPage}/{totalPages}
          </span>
          {onPageChange && (
            <Pagination className="px-1">
              <PaginationContent className="gap-2">
                <PaginationItem>
                  <PaginationPrevious
                    className="rounded-md bg-white/20 px-3 text-white hover:bg-white/40 transition"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) onPageChange(currentPage - 1);
                    }}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    className="rounded-md bg-white text-indigo-600 font-bold shadow px-3 hover:bg-yellow-200"
                    isActive
                  >
                    {currentPage}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    className="rounded-md bg-white/20 px-3 text-white hover:bg-white/40 transition"
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
          {onLimitChange && (
            <div className="flex items-center gap-2">
              <span className="text-white/90 text-sm">Hiển thị</span>
              <select
                className="h-9 rounded-md border-none bg-white/90 text-indigo-700 px-2 text-sm font-medium shadow hover:bg-white"
                value={limit}
                onChange={(e) => onLimitChange(Number(e.target.value))}
              >
                {[10, 20, 50].map((n) => (
                  <option key={n} value={n} className="text-black">
                    {n}/trang
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
