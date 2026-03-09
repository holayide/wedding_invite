import { create } from "zustand";

export interface Invitee {
  id: string;
  name: string;
  code: string;
  createdAt: string;
}

interface InviteState {
  invitees: Invitee[];
  addInvitee: (name: string) => void;
  removeInvitee: (id: string) => void;
}

const generateCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(
    { length: 6 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
};

export const useInviteStore = create<InviteState>((set) => ({
  invitees: [
    {
      id: "1",
      name: "John & Jane Smith",
      code: "WED001",
      createdAt: "2026-03-01",
    },
    {
      id: "2",
      name: "Michael & Sarah Johnson",
      code: "WED002",
      createdAt: "2026-03-02",
    },
    {
      id: "3",
      name: "David & Emily Brown",
      code: "WED003",
      createdAt: "2026-03-03",
    },
    {
      id: "4",
      name: "Robert & Lisa Davis",
      code: "WED004",
      createdAt: "2026-03-04",
    },
    {
      id: "5",
      name: "William & Anna Wilson",
      code: "WED005",
      createdAt: "2026-03-05",
    },
  ],
  addInvitee: (name) =>
    set((state) => ({
      invitees: [
        ...state.invitees,
        {
          id: crypto.randomUUID(),
          name,
          code: generateCode(),
          createdAt: new Date().toISOString().split("T")[0],
        },
      ],
    })),
  removeInvitee: (id) =>
    set((state) => ({
      invitees: state.invitees.filter((i) => i.id !== id),
    })),
}));
