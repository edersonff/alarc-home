import api from "../api";
import { LoginResponse } from "./type";

export const authService = {
  login: async (user: string, password: string) =>
    await api.post<LoginResponse>("/auth", {
      user,
      password,
    }),
};
