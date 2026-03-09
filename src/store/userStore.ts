import { create } from "zustand";
import type { UserRole } from "./authStore";

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface UserState {
  users: ManagedUser[];
  addUser: (user: Omit<ManagedUser, "id">) => void;
  removeUser: (id: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [
    {
      id: "1",
      name: "Super Admin",
      email: "admin@wedding.com",
      role: "super_admin",
    },
    { id: "2", name: "Admin User", email: "user@wedding.com", role: "admin" },
  ],
  addUser: (user) =>
    set((state) => ({
      users: [...state.users, { ...user, id: crypto.randomUUID() }],
    })),
  removeUser: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    })),
}));
