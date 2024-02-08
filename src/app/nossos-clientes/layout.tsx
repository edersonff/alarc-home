import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Alarc - Nossos Clientes",
  description:
    "Conheça alguns dos clientes que confiam na Alarc para gerenciar suas lojas virtuais.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
