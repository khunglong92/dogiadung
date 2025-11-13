import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Contact } from "@/services/api/contactsService";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { Mail, Phone, MapPin, Calendar, CheckCircle } from "lucide-react";

interface ContactDetailDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  contact: Contact | null;
  onConfirm?: (id: string) => void;
}

export function ContactDetailDialog({
  isOpen,
  onOpenChange,
  contact,
  onConfirm,
}: ContactDetailDialogProps) {
  const { t } = useTranslation();

  if (!contact) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{t("contacts.detailTitle")}</span>
            {contact.isConfirmed ? (
              <Badge variant="default" className="bg-green-600">
                {t("contacts.confirmed")}
              </Badge>
            ) : (
              <Badge variant="secondary">{t("contacts.pending")}</Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                {t("contacts.name")}
              </label>
              <p className="text-lg font-semibold">{contact.name}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                {t("contacts.title")}
              </label>
              <p className="text-base">{contact.title}</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contact.email && (
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
                <div className="flex-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    {t("contacts.email")}
                  </label>
                  <p className="text-base break-all">{contact.email}</p>
                </div>
              </div>
            )}

            {contact.phone && (
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                <div className="flex-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    {t("contacts.phone")}
                  </label>
                  <p className="text-base">{contact.phone}</p>
                </div>
              </div>
            )}
          </div>

          {/* Address */}
          {contact.address && (
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
              <div className="flex-1">
                <label className="text-sm font-medium text-muted-foreground">
                  {t("contacts.address")}
                </label>
                <p className="text-base">{contact.address}</p>
              </div>
            </div>
          )}

          {/* Content */}
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              {t("contacts.content")}
            </label>
            <div className="mt-2 p-4 bg-muted/50 rounded-md">
              <p className="text-base whitespace-pre-wrap">{contact.content}</p>
            </div>
          </div>

          {/* Timestamps */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {t("contacts.createdAt")}:{" "}
              {format(new Date(contact.createdAt), "dd/MM/yyyy HH:mm")}
            </span>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("common.close")}
          </Button>
          {!contact.isConfirmed && onConfirm && (
            <Button
              onClick={() => {
                onConfirm(contact.id);
                onOpenChange(false);
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              {t("contacts.confirmContact")}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

