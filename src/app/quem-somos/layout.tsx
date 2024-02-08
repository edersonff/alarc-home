import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Alarc - Quem Somos",
  description:
    "Nossos clientes se ocupam com a operação física de compras e logística. Nós fazemos todo o resto, desde atendimento, chamados, anúncios, marketing, fotos, entre outros.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
