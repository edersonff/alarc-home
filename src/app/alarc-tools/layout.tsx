import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Alarc - Tools",
  description: "Ferramentas para auxiliar na gestão de lojas virtuais.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
