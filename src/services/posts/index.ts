import api from "../api";
import { PostType } from "@/@types/Post";

export const postsService = {
  create: async (post: FormData) => await api.post("/posts", post),
  update: async (slug: string, post: FormData) =>
    await api.put("/posts/" + slug, post),
  delete: async (slug: string) => await api.delete("/posts/" + slug),
};
