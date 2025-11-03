import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export function AdminServices() {
  const [searchQuery, setSearchQuery] = useState("");

  const services = [
    {
      id: 1,
      name: "Gia công kim loại tấm",
      description: "Dịch vụ gia công kim loại tấm chuyên nghiệp",
      price: "Liên hệ",
      active: true,
      orders: 45,
    },
    {
      id: 2,
      name: "Đột dập kim loại",
      description: "Công nghệ đột dập hiện đại, độ chính xác cao",
      price: "Liên hệ",
      active: true,
      orders: 32,
    },
    {
      id: 3,
      name: "Chấn gấp kim loại",
      description: "Chấn gấp kim loại với độ chính xác cao",
      price: "Liên hệ",
      active: true,
      orders: 28,
    },
    {
      id: 4,
      name: "Soi rãnh kim loại",
      description: "Tạo đường rãnh chính xác phục vụ gấp nếp",
      price: "Liên hệ",
      active: true,
      orders: 18,
    },
    {
      id: 5,
      name: "Cắt laser kim loại",
      description: "Công nghệ cắt laser CNC hiện đại",
      price: "Liên hệ",
      active: true,
      orders: 56,
    },
    {
      id: 6,
      name: "Thi công trần thạch cao",
      description: "Thiết kế và thi công trần thạch cao, trần nhựa",
      price: "Liên hệ",
      active: false,
      orders: 12,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Quản lý dịch vụ</h1>
          <p className="text-muted-foreground">Quản lý các dịch vụ cung cấp</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
          <Plus className="mr-2 h-4 w-4" />
          Thêm dịch vụ
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Danh sách dịch vụ</CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm dịch vụ..."
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
                <TableHead>Tên dịch vụ</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Đơn hàng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service, index) => (
                <motion.tr
                  key={service.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TableCell>{service.id}</TableCell>
                  <TableCell>{service.name}</TableCell>
                  <TableCell className="max-w-xs">
                    <p className="truncate text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </TableCell>
                  <TableCell>{service.price}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{service.orders} đơn</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch checked={service.active} />
                      <span className="text-sm text-muted-foreground">
                        {service.active ? "Hoạt động" : "Tạm dừng"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
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
    </div>
  );
}
