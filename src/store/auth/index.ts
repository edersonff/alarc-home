import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type AuthStore = {
  isLogged: boolean;
  setLogged: (logged: boolean) => void;
};

const adminStore = persist<AuthStore>(
  (set, get) => ({
    isLogged: false,
    setLogged: (logged) => set({ isLogged: logged }),
  }),
  {
    name: "admin-store",
    storage: createJSONStorage(() => sessionStorage),
  }
);

export const useAuthStore = create(adminStore);
