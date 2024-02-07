import academiaInfo from "@/info/pages/academia.json";
import canaisAtuacaoInfo from "@/info/pages/canais-atuacao.json";
import contatoInfo from "@/info/pages/contato.json";
import nossosClientesInfo from "@/info/pages/nossos-clientes.json";
import noticiasInfo from "@/info/pages/noticias.json";
import pagesInfo from "@/info/pages/pages.json";
import quemSomosInfo from "@/info/pages/quem-somos.json";
import toolsInfo from "@/info/pages/tools.json";
import postsInfo from "@/info/posts/posts.json";
import reviewsInfo from "@/info/reviews/reviews.json";

export const infoData = {
  academia: academiaInfo,
  canaisAtuacao: canaisAtuacaoInfo,
  contato: contatoInfo,
  nossosClientes: nossosClientesInfo,
  noticias: noticiasInfo,
  pages: pagesInfo,
  quemSomos: quemSomosInfo,
  tools: toolsInfo,
  posts: postsInfo,
  reviews: reviewsInfo,
};

export const basePath = "/src/info";
export const imagePath = "public/images/blog/";

export const infoPath = {
  academia: "/pages/academia.json",
  canaisAtuacao: "/pages/canais-atuacao.json",
  contato: "/pages/contato.json",
  nossosClientes: "/pages/nossos-clientes.json",
  noticias: "/pages/noticias.json",
  pages: "/pages/pages.json",
  quemSomos: "/pages/quem-somos.json",
  tools: "/pages/tools.json",
  posts: "/posts/posts.json",
  reviews: "/reviews/reviews.json",
};

export const academia = academiaInfo;
export const canaisAtuacao = canaisAtuacaoInfo;
export const contato = contatoInfo;
export const nossosClientes = nossosClientesInfo;
export const noticias = noticiasInfo;
export const pages = pagesInfo;
export const quemSomos = quemSomosInfo;
export const tools = toolsInfo;
export const posts = postsInfo;
export const reviews = reviewsInfo;
