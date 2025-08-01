import { create } from "zustand";
import { useTeacherStore } from "./teacher-store";

export interface StudentActivity {
  id: string;
  type: "earned" | "spent";
  message: string;
  pointsChange: number;
  timestamp: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name or path to image
  earnedDate: string | null;
}

interface StudentState {
  currentStudentId: string | null;
  totalPoints: number;
  studentActivities: StudentActivity[];
  achievements: Achievement[];

  setStudentId: (id: string) => void;
  earnPoints: (points: number, reason: string) => void;
  spendPoints: (points: number, item: string) => boolean; // Returns true if successful
  addAchievement: (achievement: Omit<Achievement, "id" | "earnedDate">) => void;
}

// Mock Achievements
const mockAchievements: Achievement[] = [
  {
    id: "ach1",
    name: "Perfect Attendance",
    description: "Achieved perfect attendance for a month",
    icon: "CalendarCheck",
    earnedDate: null,
  },
  {
    id: "ach2",
    name: "Top Scorer",
    description: "Scored 90%+ in a major exam",
    icon: "Award",
    earnedDate: null,
  },
  {
    id: "ach3",
    name: "Homework Master",
    description: "Completed all homework assignments for a subject",
    icon: "BookCheck",
    earnedDate: null,
  },
  {
    id: "ach4",
    name: "Active Participant",
    description: "Consistently participated in class discussions",
    icon: "MessageSquare",
    earnedDate: null,
  },
];

export const useStudentStore = create<StudentState>((set, get) => ({
  currentStudentId: null,
  totalPoints: 0,
  studentActivities: [],
  achievements: mockAchievements,

  setStudentId: (id: string) => {
    set({ currentStudentId: id });
    // When student ID is set, calculate initial points and activities
    const studentPoints = useTeacherStore
      .getState()
      .studentPoints.filter((p) => p.studentId === id);
    const initialTotalPoints = studentPoints.reduce(
      (sum, p) => sum + p.points,
      0
    );

    const initialActivities: StudentActivity[] = studentPoints.map((p) => ({
      id: `sa${Date.now()}-${p.id}`,
      type: "earned",
      message: p.reason,
      pointsChange: p.points,
      timestamp: `${Math.floor(Math.random() * 7) + 1} days ago`, // Mock timestamp
    }));

    set({
      totalPoints: initialTotalPoints,
      studentActivities: initialActivities.reverse(),
    });
  },

  earnPoints: (points: number, reason: string) => {
    set((state) => ({
      totalPoints: state.totalPoints + points,
      studentActivities: [
        {
          id: `sa${Date.now()}`,
          type: "earned",
          message: reason,
          pointsChange: points,
          timestamp: "Just now",
        },
        ...state.studentActivities,
      ],
    }));
  },

  spendPoints: (points: number, item: string) => {
    const { totalPoints } = get();
    if (totalPoints >= points) {
      set((state) => ({
        totalPoints: state.totalPoints - points,
        studentActivities: [
          {
            id: `sa${Date.now()}`,
            type: "spent",
            message: `Bought ${item}`,
            pointsChange: -points,
            timestamp: "Just now",
          },
          ...state.studentActivities,
        ],
      }));
      return true;
    }
    return false;
  },

  addAchievement: (achievement) => {
    set((state) => {
      const existingAchievement = state.achievements.find(
        (a) => a.name === achievement.name
      );
      if (existingAchievement && !existingAchievement.earnedDate) {
        return {
          achievements: state.achievements.map((a) =>
            a.name === achievement.name
              ? { ...a, earnedDate: new Date().toISOString().split("T")[0] }
              : a
          ),
        };
      } else if (!existingAchievement) {
        return {
          achievements: [
            ...state.achievements,
            {
              ...achievement,
              id: `ach${Date.now()}`,
              earnedDate: new Date().toISOString().split("T")[0],
            },
          ],
        };
      }
      return state; // No change if already earned or exists
    });
  },
}));
