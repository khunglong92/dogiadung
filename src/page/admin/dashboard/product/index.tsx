import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useProductCrud } from "@/components/admin/product/hooks/use-product-crud";

import { ProductTable } from "@/components/admin/product/components/product-table";
import { useEffect, useState } from "react";
import ProductForm from "@/components/admin/product/components/product-form";

export default function AdminProductPage() {
  const crud = useProductCrud();
  const [mode, setMode] = useState<"list" | "create" | "edit">("list");

  useEffect(() => {
    if (mode === "create") {
      crud.openCreate();
      crud.setIsDialogOpen(false);
    }
  }, [mode]);

  return (
    <div className="p-6 space-y-6">
      {mode === "list" && (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl mb-2">Quản lý sản phẩm</h1>
              <p className="text-muted-foreground">
                Thêm/sửa/xóa sản phẩm, gắn danh mục
              </p>
            </div>
            <Button
              onClick={() => setMode("create")}
              className="bg-linear-to-r from-amber-500 to-orange-600"
            >
              <Plus className="mr-2 h-4 w-4" />
              Thêm sản phẩm
            </Button>
          </div>

          <ProductTable
            items={crud.items}
            searchQuery={crud.searchQuery}
            setSearchQuery={crud.setSearchQuery}
            onEdit={(p) => {
              crud.openEdit(p as any);
              crud.setIsDialogOpen(false);
              setMode("edit");
            }}
            onDelete={crud.remove}
            page={crud.page}
            limit={crud.limit}
            total={crud.total}
            onPageChange={(p) => crud.setPage(p)}
            onLimitChange={(l) => {
              crud.setLimit(l);
              crud.setPage(1);
            }}
          />
        </>
      )}

      {mode !== "list" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl mb-2">
                {mode === "create" ? "Thêm sản phẩm" : "Chỉnh sửa sản phẩm"}
              </h1>
              <p className="text-muted-foreground">
                {mode === "create"
                  ? "Nhập thông tin sản phẩm"
                  : "Cập nhật thông tin sản phẩm"}
              </p>
            </div>
            <Button variant="outline" onClick={() => setMode("list")}>
              Quay lại danh sách
            </Button>
          </div>

          <ProductForm
            isEditing={mode === "edit"}
            form={crud.form as any}
            setForm={(next) => crud.setForm(next as any)}
            onSubmit={async (finalForm) => {
              await crud.submit(finalForm as any);
              setMode("list");
            }}
            onCancel={() => setMode("list")}
            isSaving={crud.isSaving}
            categories={crud.categories}
          />
        </div>
      )}
    </div>
  );
}
