import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Alarc - Canais de Atuação",
  description:
    "A Alarc atua em diversos canais de vendas, como Mercado Livre, Amazon, Americanas, Magalu, Casas Bahia, entre outros.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
