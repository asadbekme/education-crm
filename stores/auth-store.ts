import { create } from "zustand";

export type UserRole = "admin" | "teacher" | "student";

interface User {
  id: string;
  username: string;
  role: UserRole;
  name: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  setDemoUser: (role: UserRole) => void;
}

// Mock users data
const mockUsers: User[] = [
  { id: "1", username: "admin", role: "admin", name: "Admin User" },
  { id: "2", username: "teacher", role: "teacher", name: "John Teacher" },
  { id: "3", username: "student", role: "student", name: "Jane Student" },
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,

  login: async (username: string, password: string) => {
    set({ isLoading: true });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = mockUsers.find((u) => u.username === username);

    if (user && password === "password") {
      set({ user, isLoading: false });
      return true;
    }

    set({ isLoading: false });
    return false;
  },

  logout: () => set({ user: null }),

  setDemoUser: (role: UserRole) => {
    const user = mockUsers.find((u) => u.role === role);
    if (user) {
      set({ user });
    }
  },
}));
