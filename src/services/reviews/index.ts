import api from "../api";

export const reviewsService = {
  create: async (review: FormData) => await api.post("/reviews", review),
  update: async (id: number, review: FormData) =>
    await api.put("/reviews/" + id, review),
  delete: async (id: number) => await api.delete("/reviews/" + id),
};
