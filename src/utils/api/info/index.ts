import { PostType } from "@/@types/Post";
import { ReviewType } from "@/@types/Review";
import { readFileSync } from "fs";
import { readFile } from "fs/promises";
import path from "path";

function getFileContent(filePath: string) {
  return () => {
    const file = readFileSync(path.join(process.cwd(), filePath), "utf-8");
    return JSON.parse(file);
  };
}

export const basePath = "/src/info";

export const infoData = (info?: keyof typeof infoPath) => {
  const academiaInfo = getFileContent(basePath + "/pages/academia.json");
  const canaisAtuacaoInfo = getFileContent(
    basePath + "/pages/canais-atuacao.json"
  );
  const contatoInfo = getFileContent(basePath + "/pages/contato.json");
  const nossosClientesInfo = getFileContent(
    basePath + "/pages/nossos-clientes.json"
  );
  const noticiasInfo = getFileContent(basePath + "/pages/noticias.json");
  const pagesInfo = getFileContent(basePath + "/pages/pages.json");
  const quemSomosInfo = getFileContent(basePath + "/pages/quem-somos.json");
  const toolsInfo = getFileContent(basePath + "/pages/tools.json");
  const postsInfo = getFileContent(basePath + "/posts/posts.json");
  const reviewsInfo = getFileContent(basePath + "/reviews/reviews.json");

  switch (info) {
    case "academia":
      return academiaInfo();
    case "canaisAtuacao":
      return canaisAtuacaoInfo();
    case "contato":
      return contatoInfo();
    case "nossosClientes":
      return nossosClientesInfo();
    case "noticias":
      return noticiasInfo();
    case "pages":
      return pagesInfo();
    case "quemSomos":
      return quemSomosInfo();
    case "tools":
      return toolsInfo();
    case "posts":
      return postsInfo() as PostType[];
    case "reviews":
      return reviewsInfo() as ReviewType[];
  }

  return {
    academia: academiaInfo(),
    canaisAtuacao: canaisAtuacaoInfo(),
    contato: contatoInfo(),
    nossosClientes: nossosClientesInfo(),
    noticias: noticiasInfo(),
    pages: pagesInfo(),
    quemSomos: quemSomosInfo(),
    tools: toolsInfo(),
    posts: postsInfo(),
    reviews: reviewsInfo(),
  };
};

export const imageBlogPath = "public/images/blog/";
export const imageReviewPath = "public/images/review/";

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

export type InfoKeys = keyof typeof infoPath;
