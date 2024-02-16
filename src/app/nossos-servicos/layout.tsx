import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Alarc - Nossos Serviços",
  description:
    "A Alarc é uma empresa de tecnologia e serviços que oferece soluções para a venda de produtos na internet.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
