import { InfoKeys } from "@/utils/api/info";

export type InfoGet = {
  [K in InfoKeys]: string;
};

export type InfoUpdateBody = {
  name: string;
  value: string;
};
