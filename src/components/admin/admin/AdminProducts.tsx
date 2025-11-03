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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export function AdminProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const products = [
    {
      id: 1,
      name: "Bàn ăn gỗ sồi",
      category: "Bàn ăn",
      price: "15,000,000 VNĐ",
      stock: 45,
      status: "Còn hàng",
      image: "📦",
    },
    {
      id: 2,
      name: "Ghế sofa 3 chỗ",
      category: "Ghế sofa",
      price: "25,000,000 VNĐ",
      stock: 12,
      status: "Còn hàng",
      image: "🛋️",
    },
    {
      id: 3,
      name: "Tủ quần áo 4 cánh",
      category: "Tủ",
      price: "20,000,000 VNĐ",
      stock: 8,
      status: "Còn hàng",
      image: "🚪",
    },
    {
      id: 4,
      name: "Giường ngủ 1m8",
      category: "Giường",
      price: "18,000,000 VNĐ",
      stock: 0,
      status: "Hết hàng",
      image: "🛏️",
    },
    {
      id: 5,
      name: "Kệ sách 5 tầng",
      category: "Kệ",
      price: "8,000,000 VNĐ",
      stock: 25,
      status: "Còn hàng",
      image: "📚",
    },
  ];

  const handleDelete = (id: number) => {
    toast.success("Đã xóa sản phẩm thành công!");
  };

  const handleEdit = (id: number) => {
    setIsDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Quản lý sản phẩm</h1>
          <p className="text-muted-foreground">
            Quản lý danh sách sản phẩm của cửa hàng
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-amber-500 to-orange-600">
              <Plus className="mr-2 h-4 w-4" />
              Thêm sản phẩm
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Thêm sản phẩm mới</DialogTitle>
              <DialogDescription>
                Nhập thông tin sản phẩm mới vào form bên dưới
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên sản phẩm</Label>
                  <Input id="name" placeholder="Nhập tên sản phẩm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Danh mục</Label>
                  <Input id="category" placeholder="Nhập danh mục" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Giá</Label>
                  <Input id="price" type="number" placeholder="Nhập giá" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Số lượng</Label>
                  <Input id="stock" type="number" placeholder="Nhập số lượng" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  placeholder="Nhập mô tả sản phẩm"
                  rows={4}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Hủy
              </Button>
              <Button
                className="bg-gradient-to-r from-amber-500 to-orange-600"
                onClick={() => {
                  toast.success("Đã thêm sản phẩm thành công!");
                  setIsDialogOpen(false);
                }}
              >
                Lưu
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Danh sách sản phẩm</CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm sản phẩm..."
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
                <TableHead>Sản phẩm</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Tồn kho</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{product.image}</span>
                      <span>{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.status === "Còn hàng"
                          ? "default"
                          : "destructive"
                      }
                      className={
                        product.status === "Còn hàng"
                          ? "bg-green-600 hover:bg-green-700"
                          : ""
                      }
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(product.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(product.id)}
                      >
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
