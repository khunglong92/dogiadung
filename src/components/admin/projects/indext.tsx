import { useState } from "react";
import { motion } from "framer-motion";
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
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function AdminProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const projects = [
    {
      id: 1,
      name: "Nhà máy gia công ABC",
      client: "Công ty ABC",
      status: "Đang thực hiện",
      progress: 75,
      startDate: "01/01/2026",
      endDate: "30/06/2026",
      budget: "5,000,000,000 VNĐ",
    },
    {
      id: 2,
      name: "Hệ thống trần văn phòng XYZ",
      client: "Công ty XYZ",
      status: "Đang thực hiện",
      progress: 45,
      startDate: "15/02/2026",
      endDate: "15/05/2026",
      budget: "2,500,000,000 VNĐ",
    },
    {
      id: 3,
      name: "Gia công kết cấu nhà xưởng",
      client: "Công ty DEF",
      status: "Hoàn thành",
      progress: 100,
      startDate: "01/11/2025",
      endDate: "31/12/2025",
      budget: "8,000,000,000 VNĐ",
    },
    {
      id: 4,
      name: "Thi công trần thạch cao showroom",
      client: "Công ty GHI",
      status: "Đang thực hiện",
      progress: 30,
      startDate: "01/03/2026",
      endDate: "30/04/2026",
      budget: "1,500,000,000 VNĐ",
    },
    {
      id: 5,
      name: "Cắt laser chi tiết ô tô",
      client: "Công ty JKL",
      status: "Chờ duyệt",
      progress: 0,
      startDate: "01/04/2026",
      endDate: "30/09/2026",
      budget: "6,500,000,000 VNĐ",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hoàn thành":
        return "bg-green-600 hover:bg-green-700";
      case "Đang thực hiện":
        return "bg-blue-600 hover:bg-blue-700";
      case "Chờ duyệt":
        return "bg-yellow-600 hover:bg-yellow-700";
      default:
        return "";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Quản lý dự án</h1>
          <p className="text-muted-foreground">
            Quản lý các dự án đang thực hiện
          </p>
        </div>
        <Button className="bg-gradient-to-r from-orange-500 to-red-500">
          <Plus className="mr-2 h-4 w-4" />
          Thêm dự án
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Danh sách dự án</CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm dự án..."
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
                <TableHead>Tên dự án</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Tiến độ</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngân sách</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project, index) => (
                <motion.tr
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TableCell>{project.id}</TableCell>
                  <TableCell>
                    <div>
                      <p>{project.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {project.startDate} - {project.endDate}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{project.client}</TableCell>
                  <TableCell>
                    <div className="space-y-1 min-w-32">
                      <div className="flex items-center justify-between text-xs">
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{project.budget}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
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
