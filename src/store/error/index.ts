import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Error = {
  message: string;
  status: number;
};

export type ErrorStore = {
  errors: Error[];
  pushError: (error: Error) => void;
};

const infoStore = persist<ErrorStore>(
  (set, get) => ({
    errors: [],
    pushError: (error) => {
      set((state) => ({
        errors: [...state.errors, error],
      }));
      setTimeout(() => {
        set((state) => ({
          errors: state.errors.filter((e) => e !== error),
        }));
      }, 5000);
    },
  }),
  {
    name: "error-store",
    storage: createJSONStorage(() => sessionStorage),
  }
);

export const useErrorStore = create(infoStore);
