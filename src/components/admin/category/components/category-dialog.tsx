import AppModal from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";

interface CategoryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditing: boolean;
  form: { name: string; description: string };
  setForm: (
    updater: (prev: { name: string; description: string }) => {
      name: string;
      description: string;
    }
  ) => void;
  onSubmit: () => void;
  isSaving?: boolean;
}

export function CategoryDialog({
  isOpen,
  onOpenChange,
  isEditing,
  form,
  setForm,
  onSubmit,
  isSaving,
}: CategoryDialogProps) {
  console.log("isOpen", isOpen);
  const { t } = useTranslation();
  return (
    <AppModal
      opened={isOpen}
      onClose={() => onOpenChange(false)}
      title={
        isEditing ? t("categories.updateTitle") : t("categories.createTitle")
      }
      size="lg"
      primaryAction={{
        label: isEditing ? t("categories.update") : t("categories.save"),
        onClick: onSubmit,
        disabled: isSaving,
      }}
      secondaryAction={{
        label: t("categories.cancel"),
        onClick: () => onOpenChange(false),
      }}
    >
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t("categories.name")}</Label>
          <Input
            id="name"
            placeholder={t("categories.name")}
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">{t("categories.description")}</Label>
          <Textarea
            id="description"
            placeholder={t("categories.description")}
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm((s) => ({ ...s, description: e.target.value }))
            }
          />
        </div>
      </div>
    </AppModal>
  );
}
