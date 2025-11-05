import { useMemo, useState } from "react";
import {
  useCreateService,
  useDeleteService,
  useServices,
  useUpdateService,
  type CompanyService,
} from "@/services/hooks/useServices";
import { toast } from "sonner";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";

export function useServiceCrud(parentId?: string) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editing, setEditing] = useState<CompanyService | null>(null);
  const [form, setForm] = useState<{
    name: string;
    slug: string;
    description: string;
    content: string;
    image: string;
    order: number;
    isActive: boolean;
    parentId: string | null;
  }>({
    name: "",
    slug: "",
    description: "",
    content: "",
    image: "",
    order: 0,
    isActive: true,
    parentId: parentId ?? null,
  });

  const { data, isFetching } = useServices(parentId);
  const createMutation = useCreateService();
  const updateMutation = useUpdateService();
  const deleteMutation = useDeleteService();

  const items = useMemo(() => {
    const list = data ?? [];
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        (s.slug || "").toLowerCase().includes(q) ||
        (s.description || "").toLowerCase().includes(q)
    );
  }, [data, searchQuery]);

  const openCreate = () => {
    setEditing(null);
    setForm({
      name: "",
      slug: "",
      description: "",
      content: "",
      image: "",
      order: 0,
      isActive: true,
      parentId: parentId ?? null,
    });
    setIsDialogOpen(true);
  };

  const openEdit = (s: CompanyService) => {
    setEditing(s);
    setForm({
      name: s.name,
      slug: s.slug,
      description: s.description || "",
      content: s.content || "",
      image: s.image || "",
      order: s.order ?? 0,
      isActive: s.isActive,
      parentId: s.parent?.id ?? null,
    });
    setIsDialogOpen(true);
  };

  const submit = async () => {
    if (!form.name.trim()) {
      notifications.show({
        color: "red",
        message: t("services.toast.nameRequired"),
      });
      return;
    }
    if (!form.slug.trim()) {
      notifications.show({
        color: "red",
        message: t("services.toast.slugRequired"),
      });
      return;
    }
    try {
      toast.loading("Đang lưu...", { id: "service-saving" });
      if (editing) {
        await updateMutation.mutateAsync({
          id: editing.id,
          body: {
            name: form.name.trim(),
            slug: form.slug.trim(),
            description: form.description || null,
            content: form.content || null,
            image: form.image || null,
            order: form.order,
            isActive: !!form.isActive,
            parentId: form.parentId || null,
          },
        });
        toast.success(t("services.toast.updateSuccess"));
      } else {
        await createMutation.mutateAsync({
          name: form.name.trim(),
          slug: form.slug.trim(),
          description: form.description || null,
          content: form.content || null,
          image: form.image || null,
          order: form.order,
          isActive: !!form.isActive,
          parentId: form.parentId || null,
        });
        toast.success(t("services.toast.createSuccess"));
      }
      setIsDialogOpen(false);
    } catch (e: any) {
      notifications.show({ color: "red", message: e?.message || "Error" });
    }
  };

  const submitWithData = async (payload: {
    name: string;
    slug: string;
    description: string;
    content: string;
    image: string;
    order: number;
    isActive: boolean;
    parentId: string | null;
  }) => {
    if (!payload.name.trim()) {
      notifications.show({
        color: "red",
        message: t("services.toast.nameRequired"),
      });
      return;
    }
    if (!payload.slug.trim()) {
      notifications.show({
        color: "red",
        message: t("services.toast.slugRequired"),
      });
      return;
    }
    try {
      if (editing) {
        await updateMutation.mutateAsync({
          id: editing.id,
          body: {
            name: payload.name.trim(),
            slug: payload.slug.trim(),
            description: payload.description || null,
            content: payload.content || null,
            image: payload.image || null,
            order: payload.order,
            isActive: !!payload.isActive,
            parentId: payload.parentId || null,
          },
        });
        toast.success(t("services.toast.updateSuccess"));
      } else {
        await createMutation.mutateAsync({
          name: payload.name.trim(),
          slug: payload.slug.trim(),
          description: payload.description || null,
          content: payload.content || null,
          image: payload.image || null,
          order: payload.order,
          isActive: !!payload.isActive,
          parentId: payload.parentId || null,
        });
        toast.success(t("services.toast.createSuccess"));
      }
    } catch (e: any) {
      notifications.show({ color: "red", message: e?.message || "Error" });
      throw e;
    } finally {
      toast.dismiss("service-saving");
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success(t("services.toast.deleteSuccess"));
    } catch (e: any) {
      toast.error(e?.message || "Error");
    }
  };

  return {
    items,
    isFetching,
    searchQuery,
    setSearchQuery,
    isDialogOpen,
    setIsDialogOpen,
    editing,
    form,
    setForm,
    openCreate,
    openEdit,
    submit,
    submitWithData,
    remove,
    isSaving: createMutation.isPending || updateMutation.isPending,
  };
}
