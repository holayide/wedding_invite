import { create } from "zustand";

export type UserRole = "super_admin" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  resetEmail: string;
  setResetEmail: (email: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  isAuthenticated: false,
  resetEmail: "",
  setResetEmail: (email) => set({ resetEmail: email }),
  login: (email, password) => {
    // Demo credentials
    if (email === "admin@wedding.com" && password === "admin123") {
      set({
        currentUser: {
          id: "1",
          name: "Super Admin",
          email,
          role: "super_admin",
        },
        isAuthenticated: true,
      });
      return true;
    }
    if (email === "user@wedding.com" && password === "user123") {
      set({
        currentUser: { id: "2", name: "Admin User", email, role: "admin" },
        isAuthenticated: true,
      });
      return true;
    }
    return false;
  },
  logout: () => set({ currentUser: null, isAuthenticated: false }),
}));
