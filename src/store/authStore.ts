import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "super_admin" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  resetEmail: string;
  resetOtp: string;
  resetUserId: string;

  setAuth: (user: User, token: string) => void;
  logout: () => void;

  setResetEmail: (email: string) => void;
  setResetOtp: (otp: string) => void;
  setResetUserId: (id: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      resetEmail: "",
      resetOtp: "",
      resetUserId: "",

      setAuth: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),

      setResetEmail: (email) => set({ resetEmail: email }),
      setResetOtp: (otp) => set({ resetOtp: otp }),
      setResetUserId: (id) => set({ resetUserId: id }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
