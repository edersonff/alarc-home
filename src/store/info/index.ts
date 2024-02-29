import { PostType } from "@/@types/Post";
import { ReviewType } from "@/@types/Review";

import academia from "@/info/pages/academia.json";
import canaisAtuacao from "@/info/pages/canais-atuacao.json";
import contato from "@/info/pages/contato.json";
import nossosClientes from "@/info/pages/nossos-clientes.json";
import nossosServicos from "@/info/pages/nossos-servicos.json";
import noticias from "@/info/pages/noticias.json";
import pages from "@/info/pages/pages.json";
import quemSomos from "@/info/pages/quem-somos.json";
import tools from "@/info/pages/tools.json";
import posts from "@/info/posts/posts.json";
import reviews from "@/info/reviews/reviews.json";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type InfoStore = {
  academia: any;
  canaisAtuacao: any;
  contato: any;
  nossosClientes: any;
  nossosServicos: any;
  noticias: any;
  pages: (typeof pages)[0][];
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
    nossosServicos,
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
