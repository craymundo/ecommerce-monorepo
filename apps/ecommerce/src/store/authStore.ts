import { create } from "zustand";

interface AuthStore {
  userRole: "admin" | "client" | null;
  setUserRole: (role: "admin" | "client") => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  userRole: localStorage.getItem("userRole") as "admin" | "client" | null,

  setUserRole: (role) => {
    localStorage.setItem("userRole", role);
    set({ userRole: role });
  },

  logout: () => {
    localStorage.removeItem("userRole");
    set({ userRole: null });
  },
}));
