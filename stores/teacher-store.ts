import { create } from "zustand";

export type LessonDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface Group {
  id: string;
  name: string;
  subject: string;
  lessonTime: string; // e.g., "09:00 - 10:30"
  lessonDays: LessonDay[];
  studentIds: string[]; // Array of student IDs
  active: boolean;
}

export interface Lesson {
  id: string;
  groupId: string;
  topic: string;
  date: string; // YYYY-MM-DD
  homework: string;
}

export interface AttendanceRecord {
  id: string;
  lessonId: string;
  groupId: string;
  studentId: string;
  date: string; // YYYY-MM-DD
  status: "present" | "absent" | "late";
}

export interface StudentPoint {
  id: string;
  studentId: string;
  groupId: string;
  points: number;
  reason: string;
  date: string; // YYYY-MM-DD
}

export interface TeacherActivity {
  id: string;
  type: "lesson" | "homework" | "attendance" | "group" | "point";
  message: string;
  timestamp: string;
}

interface TeacherState {
  groups: Group[];
  lessons: Lesson[];
  attendanceRecords: AttendanceRecord[];
  studentPoints: StudentPoint[];
  teacherActivities: TeacherActivity[];

  // Group CRUD
  addGroup: (group: Omit<Group, "id" | "active">) => void;
  updateGroup: (id: string, group: Partial<Group>) => void;
  deleteGroup: (id: string) => void;
  assignStudentsToGroup: (groupId: string, studentIds: string[]) => void;

  // Lesson CRUD
  addLesson: (lesson: Omit<Lesson, "id">) => void;
  updateLesson: (id: string, lesson: Partial<Lesson>) => void;
  deleteLesson: (id: string) => void;

  // Attendance
  addAttendanceRecord: (record: Omit<AttendanceRecord, "id">) => void;
  updateAttendanceRecord: (
    id: string,
    record: Partial<AttendanceRecord>
  ) => void;
  getAttendanceForLesson: (lessonId: string) => AttendanceRecord[];

  // Points
  addStudentPoint: (point: Omit<StudentPoint, "id">) => void;
  getStudentPoints: (studentId: string) => StudentPoint[];

  // Activities
  addTeacherActivity: (activity: Omit<TeacherActivity, "id">) => void;
}

// Mock Data
const mockGroups: Group[] = [
  {
    id: "g1",
    name: "Math A",
    subject: "Mathematics",
    lessonTime: "09:00 - 10:30",
    lessonDays: ["Monday", "Wednesday", "Friday"],
    studentIds: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], // Alice, Bob, Carol, David, Eva, etc.
    active: true,
  },
  {
    id: "g2",
    name: "Math B",
    subject: "Mathematics",
    lessonTime: "14:00 - 15:30",
    lessonDays: ["Tuesday", "Thursday"],
    studentIds: ["13", "14", "15", "16", "17", "18", "19", "20", "21", "22"],
    active: true,
  },
  {
    id: "g3",
    name: "Physics A",
    subject: "Physics",
    lessonTime: "11:00 - 12:30",
    lessonDays: ["Monday", "Wednesday"],
    studentIds: ["1", "2", "23", "24", "25", "26", "27", "28"],
    active: true,
  },
  {
    id: "g4",
    name: "Chemistry A",
    subject: "Chemistry",
    lessonTime: "16:00 - 17:30",
    lessonDays: ["Tuesday", "Saturday"],
    studentIds: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
    ],
    active: true,
  },
];

const mockLessons: Lesson[] = [
  {
    id: "l1",
    groupId: "g1",
    topic: "Introduction to Algebra",
    date: "2024-01-15",
    homework: "Complete exercises 1-10 in Chapter 2",
  },
  {
    id: "l2",
    groupId: "g1",
    topic: "Linear Equations",
    date: "2024-01-17",
    homework: "Solve problems 1-15 in workbook",
  },
  {
    id: "l3",
    groupId: "g3",
    topic: "Newton's Laws of Motion",
    date: "2024-01-16",
    homework: "Read Chapter 3 and answer questions",
  },
];

const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: "a1",
    lessonId: "l1",
    groupId: "g1",
    studentId: "1",
    date: "2024-01-15",
    status: "present",
  },
  {
    id: "a2",
    lessonId: "l1",
    groupId: "g1",
    studentId: "2",
    date: "2024-01-15",
    status: "present",
  },
  {
    id: "a3",
    lessonId: "l1",
    groupId: "g1",
    studentId: "3",
    date: "2024-01-15",
    status: "absent",
  },
  {
    id: "a4",
    lessonId: "l3",
    groupId: "g3",
    studentId: "1",
    date: "2024-01-16",
    status: "present",
  },
  {
    id: "a5",
    lessonId: "l3",
    groupId: "g3",
    studentId: "2",
    date: "2024-01-16",
    status: "late",
  },
];

const mockStudentPoints: StudentPoint[] = [
  {
    id: "p1",
    studentId: "1",
    groupId: "g1",
    points: 10,
    reason: "Participated actively in class",
    date: "2024-07-20",
  },
  {
    id: "p2",
    studentId: "2",
    groupId: "g1",
    points: 5,
    reason: "Completed extra homework",
    date: "2024-07-22",
  },
];

const mockTeacherActivities: TeacherActivity[] = [
  {
    id: "ta1",
    type: "lesson",
    message: "Advanced Calculus - Math A group lesson completed",
    timestamp: "1 hour ago",
  },
  {
    id: "ta2",
    type: "homework",
    message: "15 students submitted Physics homework",
    timestamp: "3 hours ago",
  },
  {
    id: "ta3",
    type: "attendance",
    message: "Attendance taken Chemistry A - 14/15 students present",
    timestamp: "5 hours ago",
  },
];

export const useTeacherStore = create<TeacherState>((set, get) => ({
  groups: mockGroups,
  lessons: mockLessons,
  attendanceRecords: mockAttendanceRecords,
  studentPoints: mockStudentPoints,
  teacherActivities: mockTeacherActivities,

  // Group CRUD
  addGroup: (group) => {
    const newGroup = { ...group, id: `g${Date.now()}`, active: true };
    set((state) => ({
      groups: [...state.groups, newGroup],
      teacherActivities: [
        {
          id: `ta${Date.now()}`,
          type: "group",
          message: `New group "${group.name}" created`,
          timestamp: "Just now",
        },
        ...state.teacherActivities,
      ],
    }));
  },
  updateGroup: (id, updates) => {
    set((state) => ({
      groups: state.groups.map((group) =>
        group.id === id ? { ...group, ...updates } : group
      ),
    }));
  },
  deleteGroup: (id) => {
    const group = get().groups.find((g) => g.id === id);
    set((state) => ({
      groups: state.groups.filter((group) => group.id !== id),
      lessons: state.lessons.filter((lesson) => lesson.groupId !== id), // Delete associated lessons
      teacherActivities: [
        {
          id: `ta${Date.now()}`,
          type: "group",
          message: `Group "${group?.name}" deleted`,
          timestamp: "Just now",
        },
        ...state.teacherActivities,
      ],
    }));
  },
  assignStudentsToGroup: (groupId, studentIds) => {
    set((state) => ({
      groups: state.groups.map((group) =>
        group.id === groupId ? { ...group, studentIds } : group
      ),
    }));
  },

  // Lesson CRUD
  addLesson: (lesson) => {
    const newLesson = { ...lesson, id: `l${Date.now()}` };
    set((state) => ({
      lessons: [...state.lessons, newLesson],
      teacherActivities: [
        {
          id: `ta${Date.now()}`,
          type: "lesson",
          message: `New lesson "${lesson.topic}" added to group ${
            get().groups.find((g) => g.id === lesson.groupId)?.name
          }`,
          timestamp: "Just now",
        },
        ...state.teacherActivities,
      ],
    }));
  },
  updateLesson: (id, updates) => {
    set((state) => ({
      lessons: state.lessons.map((lesson) =>
        lesson.id === id ? { ...lesson, ...updates } : lesson
      ),
    }));
  },
  deleteLesson: (id) => {
    const lesson = get().lessons.find((l) => l.id === id);
    set((state) => ({
      lessons: state.lessons.filter((lesson) => lesson.id !== id),
      attendanceRecords: state.attendanceRecords.filter(
        (record) => record.lessonId !== id
      ), // Delete associated attendance
      teacherActivities: [
        {
          id: `ta${Date.now()}`,
          type: "lesson",
          message: `Lesson "${lesson?.topic}" deleted`,
          timestamp: "Just now",
        },
        ...state.teacherActivities,
      ],
    }));
  },

  // Attendance
  addAttendanceRecord: (record) => {
    const newRecord = { ...record, id: `a${Date.now()}` };
    set((state) => ({
      attendanceRecords: [...state.attendanceRecords, newRecord],
    }));
  },
  updateAttendanceRecord: (id, updates) => {
    set((state) => ({
      attendanceRecords: state.attendanceRecords.map((record) =>
        record.id === id ? { ...record, ...updates } : record
      ),
    }));
  },
  getAttendanceForLesson: (lessonId) => {
    return get().attendanceRecords.filter(
      (record) => record.lessonId === lessonId
    );
  },

  // Points
  addStudentPoint: (point) => {
    const newPoint = { ...point, id: `p${Date.now()}` };
    set((state) => ({
      studentPoints: [...state.studentPoints, newPoint],
      teacherActivities: [
        {
          id: `ta${Date.now()}`,
          type: "point",
          message: `Assigned ${point.points} points to student ${
            get().students.find((s) => s.id === point.studentId)?.name
          } for "${point.reason}"`,
          timestamp: "Just now",
        },
        ...state.teacherActivities,
      ],
    }));
  },
  getStudentPoints: (studentId) => {
    return get().studentPoints.filter((point) => point.studentId === studentId);
  },

  // Activities
  addTeacherActivity: (activity) => {
    set((state) => ({
      teacherActivities: [
        { ...activity, id: `ta${Date.now()}` },
        ...state.teacherActivities,
      ],
    }));
  },
}));
