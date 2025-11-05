import AppModal from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "react-i18next";

interface ServiceDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditing: boolean;
  form: {
    name: string;
    slug: string;
    description: string;
    content: string;
    image: string;
    order: number;
    isActive: boolean;
  };
  setForm: (updater: (prev: ServiceDialogProps["form"]) => ServiceDialogProps["form"]) => void;
  onSubmit: () => void;
  isSaving?: boolean;
}

export function ServiceDialog({
  isOpen,
  onOpenChange,
  isEditing,
  form,
  setForm,
  onSubmit,
  isSaving,
}: ServiceDialogProps) {
  const { t } = useTranslation();
  return (
    <AppModal
      opened={isOpen}
      onClose={() => onOpenChange(false)}
      title={isEditing ? t("services.updateTitle") : t("services.createTitle")}
      size="lg"
      primaryAction={{
        label: isEditing ? t("services.update") : t("services.save"),
        onClick: onSubmit,
        disabled: isSaving,
      }}
      secondaryAction={{
        label: t("services.cancel"),
        onClick: () => onOpenChange(false),
      }}
    >
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("services.name")}</Label>
            <Input
              id="name"
              placeholder={t("services.name")}
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">{t("services.slug")}</Label>
            <Input
              id="slug"
              placeholder={t("services.slug")}
              value={form.slug}
              onChange={(e) => setForm((s) => ({ ...s, slug: e.target.value }))}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">{t("services.description")}</Label>
          <Textarea
            id="description"
            placeholder={t("services.description")}
            rows={3}
            value={form.description}
            onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">{t("services.content")}</Label>
          <Textarea
            id="content"
            placeholder={t("services.content")}
            rows={5}
            value={form.content}
            onChange={(e) => setForm((s) => ({ ...s, content: e.target.value }))}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="image">{t("services.image")}</Label>
            <Input
              id="image"
              placeholder={t("services.imagePlaceholder")}
              value={form.image}
              onChange={(e) => setForm((s) => ({ ...s, image: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="order">{t("services.order")}</Label>
            <Input
              id="order"
              type="number"
              value={form.order}
              onChange={(e) => setForm((s) => ({ ...s, order: Number(e.target.value) }))}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Switch
            checked={form.isActive}
            onCheckedChange={(v) => setForm((s) => ({ ...s, isActive: v }))}
          />
          <span className="text-sm text-muted-foreground">{t("services.active")}</span>
        </div>
      </div>
    </AppModal>
  );
}


