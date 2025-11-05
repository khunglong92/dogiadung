import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import { ServiceTable } from "@/components/admin/services/components/service-table";
import { useServiceCrud } from "@/components/admin/services/hooks/use-service-crud";
import ServiceForm from "@/components/admin/services/components/service-form";
import { useEffect, useState } from "react";

export function AdminServices() {
  const { t } = useTranslation();
  const crud = useServiceCrud();
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
              <h1 className="text-3xl mb-2">{t("services.title")}</h1>
              <p className="text-muted-foreground">{t("services.subtitle")}</p>
            </div>
            <Button
              onClick={() => setMode("create")}
              className="bg-linear-to-r from-purple-500 to-pink-500"
            >
              <Plus className="mr-2 h-4 w-4" />
              {t("services.add")}
            </Button>
          </div>

          <ServiceTable
            items={crud.items}
            searchQuery={crud.searchQuery}
            setSearchQuery={crud.setSearchQuery}
            onEdit={(s) => {
              crud.openEdit(s as any);
              crud.setIsDialogOpen(false);
              setMode("edit");
            }}
            onDelete={crud.remove}
          />
        </>
      )}

      {mode !== "list" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl mb-2">
                {mode === "create" ? "Thêm dịch vụ" : "Chỉnh sửa dịch vụ"}
              </h1>
              <p className="text-muted-foreground">
                {mode === "create"
                  ? "Nhập thông tin dịch vụ"
                  : "Cập nhật thông tin dịch vụ"}
              </p>
            </div>
            <Button variant="outline" onClick={() => setMode("list")}>
              Quay lại danh sách
            </Button>
          </div>

          <ServiceForm
            isEditing={mode === "edit"}
            form={{
              name: crud.form.name,
              slug: crud.form.slug,
              description: crud.form.description,
              content: crud.form.content,
              order: crud.form.order,
              isActive: crud.form.isActive,
              imageUrl: crud.form.image || null,
            }}
            onSubmit={async (finalForm) => {
              try {
                await crud.submitWithData({
                  name: finalForm.name,
                  slug: finalForm.slug,
                  description: finalForm.description,
                  content: finalForm.content,
                  order: finalForm.order ?? 0,
                  isActive: finalForm.isActive,
                  image: finalForm.imageUrl || "",
                  parentId: null,
                });
                setMode("list");
              } catch {
                // keep staying on form; notifications already shown
              }
            }}
            onCancel={() => setMode("list")}
            isSaving={crud.isSaving}
          />
        </div>
      )}
    </div>
  );
}
