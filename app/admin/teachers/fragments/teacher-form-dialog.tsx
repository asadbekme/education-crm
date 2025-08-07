"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Teacher } from "@/types/teacher-types";
import { useState, useEffect } from "react";

type TeacherFormDialogProps = {
  open: boolean;
  setOpen: (state: boolean) => void;
  onSubmit: (
    formData: {
      name: string;
      email: string;
      phone: string;
      subject: string;
      salary: string;
      studentCount: string;
      status: "active" | "inactive";
    },
    editingTeacher: Teacher | null
  ) => void;
  editingTeacher: Teacher | null;
  setEditingTeacher: (teacher: Teacher | null) => void;
};

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  salary: "",
  studentCount: "",
  status: "active" as "active" | "inactive",
};

export function TeacherFormDialog({
  open,
  setOpen,
  onSubmit,
  editingTeacher,
  setEditingTeacher,
}: TeacherFormDialogProps) {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (editingTeacher) {
      setFormData({
        name: editingTeacher.name,
        email: editingTeacher.email,
        phone: editingTeacher.phone,
        subject: editingTeacher.subject,
        salary: editingTeacher.salary.toString(),
        studentCount: editingTeacher.studentCount.toString(),
        status: editingTeacher.status,
      });
    } else {
      setFormData(initialFormState);
    }
  }, [editingTeacher, open]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, editingTeacher);
    setFormData(initialFormState);
    setEditingTeacher(null);
    setOpen(false);
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setEditingTeacher(null);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setEditingTeacher(null)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Teacher
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingTeacher ? "Edit Teacher" : "Add New Teacher"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="salary">Monthly Salary ($)</Label>
            <Input
              id="salary"
              type="number"
              value={formData.salary}
              onChange={(e) =>
                setFormData({ ...formData, salary: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="studentCount">Students Assigned</Label>
            <Input
              id="studentCount"
              type="number"
              value={formData.studentCount}
              onChange={(e) =>
                setFormData({ ...formData, studentCount: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: "active" | "inactive") =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              {editingTeacher ? "Update" : "Add"} Teacher
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
