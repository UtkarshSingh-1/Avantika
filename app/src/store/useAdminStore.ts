import { create } from "zustand";

type AdminState = {
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
  hydrate: () => void;
};

const key = "awantika_admin";

export const useAdminStore = create<AdminState>((set) => ({
  isAdmin: false,
  login: () => {
    localStorage.setItem(key, "true");
    set({ isAdmin: true });
  },
  logout: () => {
    localStorage.removeItem(key);
    set({ isAdmin: false });
  },
  hydrate: () => {
    const stored = localStorage.getItem(key) === "true";
    set({ isAdmin: stored });
  },
}));
