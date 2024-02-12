import { create } from "zustand";
import { persistNSync } from "persist-and-sync";

export type AuthStore = {
  isLogged: boolean;
  setLogged: (logged: boolean) => void;
};

const authStore = persistNSync<AuthStore>(
  (set, get) => ({
    isLogged: false,
    setLogged: (logged) => set({ isLogged: logged }),
  }),
  {
    name: "auth-store",
    storage: "localStorage",
  }
);

export const useAuthStore = create(authStore);
