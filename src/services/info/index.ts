import { InfoKeys } from "@/utils/api/info";
import api from "../api";
import { InfoGet, InfoUpdateBody } from "./type";

export const infoService = {
  get: async () => await api.get<InfoGet>("/info"),
  update: async (name: InfoKeys, data: InfoUpdateBody) =>
    await api.put("/info/" + name, data),
};
