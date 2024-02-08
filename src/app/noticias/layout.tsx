import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Alarc - Notícias",
  description:
    "Acompanhe todas as novidades da Alarc e do mercado de e-commerce.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
