import { PostType } from "@/@types/Post";
import { ReviewType } from "@/@types/Review";
import {
  academia,
  canaisAtuacao,
  contato,
  nossosClientes,
  noticias,
  pages,
  posts,
  quemSomos,
  reviews,
  tools,
} from "@/utils/api/info";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type InfoStore = {
  academia: any;
  canaisAtuacao: any;
  contato: any;
  nossosClientes: any;
  noticias: any;
  pages: any;
  quemSomos: any;
  tools: any;
  posts: PostType[];
  reviews: ReviewType[];
  setInfo: (name: keyof InfoStore, value: any) => void;
};

const infoStore = persist<InfoStore>(
  (set, get) => ({
    academia,
    canaisAtuacao,
    contato,
    nossosClientes,
    noticias,
    pages,
    quemSomos,
    tools,
    posts,
    reviews,
    setInfo: (name, value) => {
      set({ [name]: value });
    },
  }),
  {
    name: "info-store",
    storage: createJSONStorage(() => sessionStorage),
  }
);

export const useInfoStore = create(infoStore);
