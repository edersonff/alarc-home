import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type EditorStore = {
  isEditing: boolean;
  setEditing: (logged: boolean) => void;
};

const editingStore = persist<EditorStore>(
  (set, get) => ({
    isEditing: false,
    setEditing: (logged) => set({ isEditing: logged }),
  }),
  {
    name: "editing-store",
    storage: createJSONStorage(() => sessionStorage),
  }
);

export const useEditorStore = create(editingStore);
