import api from "../api";
import { EmailRequest } from "./type";

export const emailService = {
  send: async (data: EmailRequest) => await api.post("/email", data),
};
