import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Alarc - Contato",
  description:
    "Entre em contato com a Alarc para saber mais sobre nossos serviços.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
