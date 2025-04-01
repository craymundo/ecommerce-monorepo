import { create } from "zustand";
import { localStorageUtils } from "../utils/localStorageUtils";

type UserRole = "admin" | "client" | null;

interface AuthStore {
  userRole: UserRole;
  setUserRole: (role: Exclude<UserRole, null>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  userRole: localStorageUtils.getItem<UserRole>("userRole") ?? null,

  setUserRole: (role) => {
    localStorageUtils.setItem("userRole", role);
    set({ userRole: role });
  },

  logout: () => {
    localStorageUtils.removeItem("userRole");
    set({ userRole: null });
  },
}));
