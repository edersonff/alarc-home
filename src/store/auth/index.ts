import { create } from "zustand";
import { share, isSupported } from "shared-zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type AuthStore = {
  isLogged: boolean;
  setLogged: (logged: boolean) => void;
};

const authStore = persist<AuthStore>(
  (set, get) => ({
    isLogged: false,
    setLogged: (logged) => set({ isLogged: logged }),
  }),
  {
    name: "auth-store",
    storage: createJSONStorage(() => sessionStorage),
  }
);

export const useAuthStore = create(authStore);

if ("BroadcastChannel" in globalThis && isSupported()) {
  share("auth-store", useAuthStore);
}
