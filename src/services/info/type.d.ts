import { infoData } from "@/utils/api/info";

export type InfoGet = {
  [K in keyof typeof infoData]: typeof infoData;
};

export type InfoUpdateBody = {
  name: string;
  value: string;
};
