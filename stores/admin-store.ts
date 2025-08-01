import { create } from "zustand";

export interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  phone: string;
  salary: number;
  studentCount: number;
  joinDate: string;
  status: "active" | "inactive";
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  teacher: string;
  fee: number;
  joinDate: string;
  status: "active" | "inactive";
  paymentStatus: "paid" | "pending" | "overdue";
}

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
  method: "cash" | "card" | "bank";
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
}

export interface Activity {
  id: string;
  type: "registration" | "payment" | "product" | "teacher";
  message: string;
  timestamp: string;
}

interface AdminState {
  teachers: Teacher[];
  students: Student[];
  payments: Payment[];
  products: Product[];
  activities: Activity[];

  // Teacher CRUD
  addTeacher: (teacher: Omit<Teacher, "id">) => void;
  updateTeacher: (id: string, teacher: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;

  // Student CRUD
  addStudent: (student: Omit<Student, "id">) => void;
  updateStudent: (id: string, student: Partial<Student>) => void;
  deleteStudent: (id: string) => void;

  // Payment CRUD
  addPayment: (payment: Omit<Payment, "id">) => void;
  updatePayment: (id: string, payment: Partial<Payment>) => void;

  // Product CRUD
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Activity
  addActivity: (activity: Omit<Activity, "id">) => void;
}

// Mock data
const mockTeachers: Teacher[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@educrm.com",
    subject: "Mathematics",
    phone: "+1234567890",
    salary: 2500,
    studentCount: 12,
    joinDate: "2024-01-15",
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@educrm.com",
    subject: "English",
    phone: "+1234567891",
    salary: 3000,
    studentCount: 15,
    joinDate: "2024-02-01",
    status: "active",
  },
  {
    id: "3",
    name: "Mike Wilson",
    email: "mike@educrm.com",
    subject: "Science",
    phone: "+1234567892",
    salary: 1800,
    studentCount: 8,
    joinDate: "2024-03-10",
    status: "active",
  },
  {
    id: "4",
    name: "Lisa Brown",
    email: "lisa@educrm.com",
    subject: "History",
    phone: "+1234567893",
    salary: 2200,
    studentCount: 10,
    joinDate: "2024-01-20",
    status: "active",
  },
];

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@student.com",
    phone: "+1234567894",
    course: "Math Class",
    teacher: "John Smith",
    fee: 500,
    joinDate: "2024-01-20",
    status: "active",
    paymentStatus: "paid",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@student.com",
    phone: "+1234567895",
    course: "English Class",
    teacher: "Sarah Johnson",
    fee: 450,
    joinDate: "2024-02-15",
    status: "active",
    paymentStatus: "pending",
  },
];

const mockPayments: Payment[] = [
  {
    id: "1",
    studentId: "1",
    studentName: "Alice Johnson",
    amount: 500,
    date: "2024-07-01",
    status: "completed",
    method: "card",
  },
  {
    id: "2",
    studentId: "2",
    studentName: "Bob Smith",
    amount: 450,
    date: "2024-07-15",
    status: "pending",
    method: "cash",
  },
];

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Notebook",
    description: "High-quality notebook for students",
    price: 25,
    category: "Stationery",
    stock: 50,
    image: "/notebook.png",
  },
  {
    id: "2",
    name: "Scientific Calculator",
    description: "Advanced calculator for math classes",
    price: 85,
    category: "Electronics",
    stock: 20,
    image: "/scientific-calculator.webp",
  },
];

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "registration",
    message: "Alice Johnson registered for Math class",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    type: "payment",
    message: "Monthly fee payment from Bob Smith",
    timestamp: "4 hours ago",
  },
  {
    id: "3",
    type: "product",
    message: "Premium notebook added to shop",
    timestamp: "6 hours ago",
  },
];

export const useAdminStore = create<AdminState>((set, get) => ({
  teachers: mockTeachers,
  students: mockStudents,
  payments: mockPayments,
  products: mockProducts,
  activities: mockActivities,

  // Teacher CRUD
  addTeacher: (teacher) => {
    const newTeacher = { ...teacher, id: Date.now().toString() };
    set((state) => ({
      teachers: [...state.teachers, newTeacher],
      activities: [
        {
          id: Date.now().toString(),
          type: "teacher",
          message: `New teacher ${teacher.name} added`,
          timestamp: "Just now",
        },
        ...state.activities,
      ],
    }));
  },

  updateTeacher: (id, updates) => {
    set((state) => ({
      teachers: state.teachers.map((teacher) =>
        teacher.id === id ? { ...teacher, ...updates } : teacher
      ),
    }));
  },

  deleteTeacher: (id) => {
    const teacher = get().teachers.find((t) => t.id === id);
    set((state) => ({
      teachers: state.teachers.filter((teacher) => teacher.id !== id),
      activities: [
        {
          id: Date.now().toString(),
          type: "teacher",
          message: `Teacher ${teacher?.name} removed`,
          timestamp: "Just now",
        },
        ...state.activities,
      ],
    }));
  },

  // Student CRUD
  addStudent: (student) => {
    const newStudent = { ...student, id: Date.now().toString() };
    set((state) => ({
      students: [...state.students, newStudent],
      activities: [
        {
          id: Date.now().toString(),
          type: "registration",
          message: `${student.name} registered for ${student.course}`,
          timestamp: "Just now",
        },
        ...state.activities,
      ],
    }));
  },

  updateStudent: (id, updates) => {
    set((state) => ({
      students: state.students.map((student) =>
        student.id === id ? { ...student, ...updates } : student
      ),
    }));
  },

  deleteStudent: (id) => {
    const student = get().students.find((s) => s.id === id);
    set((state) => ({
      students: state.students.filter((student) => student.id !== id),
      activities: [
        {
          id: Date.now().toString(),
          type: "registration",
          message: `Student ${student?.name} removed`,
          timestamp: "Just now",
        },
        ...state.activities,
      ],
    }));
  },

  // Payment CRUD
  addPayment: (payment) => {
    const newPayment = { ...payment, id: Date.now().toString() };
    set((state) => ({
      payments: [...state.payments, newPayment],
      activities: [
        {
          id: Date.now().toString(),
          type: "payment",
          message: `Payment received from ${payment.studentName}`,
          timestamp: "Just now",
        },
        ...state.activities,
      ],
    }));
  },

  updatePayment: (id, updates) => {
    set((state) => ({
      payments: state.payments.map((payment) =>
        payment.id === id ? { ...payment, ...updates } : payment
      ),
    }));
  },

  // Product CRUD
  addProduct: (product) => {
    const newProduct = { ...product, id: Date.now().toString() };
    set((state) => ({
      products: [...state.products, newProduct],
      activities: [
        {
          id: Date.now().toString(),
          type: "product",
          message: `${product.name} added to shop`,
          timestamp: "Just now",
        },
        ...state.activities,
      ],
    }));
  },

  updateProduct: (id, updates) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, ...updates } : product
      ),
    }));
  },

  deleteProduct: (id) => {
    const product = get().products.find((p) => p.id === id);
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
      activities: [
        {
          id: Date.now().toString(),
          type: "product",
          message: `${product?.name} removed from shop`,
          timestamp: "Just now",
        },
        ...state.activities,
      ],
    }));
  },

  addActivity: (activity) => {
    set((state) => ({
      activities: [
        { ...activity, id: Date.now().toString() },
        ...state.activities,
      ],
    }));
  },
}));
