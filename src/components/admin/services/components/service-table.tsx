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
import { Edit, Search, Trash2 } from "lucide-react";
import type { CompanyService } from "@/services/api/servicesService";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";

interface ServiceTableProps {
  items: CompanyService[];
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  onEdit: (s: CompanyService) => void;
  onDelete: (id: string) => void;
}

export function ServiceTable({
  items,
  searchQuery,
  setSearchQuery,
  onEdit,
  onDelete,
}: ServiceTableProps) {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t("services.listTitle")}</CardTitle>
          <div className="relative w-72">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("services.searchPlaceholder")}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>{t("services.name")}</TableHead>
              <TableHead>{t("services.slug")}</TableHead>
              <TableHead>{t("services.description")}</TableHead>
              <TableHead>{t("services.order")}</TableHead>
              <TableHead>{t("services.active")}</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(items || []).map((service, index) => (
              <motion.tr
                key={service.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <TableCell className="max-w-[140px] truncate">{service.id}</TableCell>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.slug}</TableCell>
                <TableCell className="max-w-[420px] truncate">
                  {service.description}
                </TableCell>
                <TableCell>{service.order ?? 0}</TableCell>
                <TableCell>
                  <Badge variant={service.isActive ? "default" : "outline"}>
                    {service.isActive ? t("services.activeOn") : t("services.activeOff")}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(service)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(service.id)}>
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}


