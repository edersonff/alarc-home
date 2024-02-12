import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Alarc - Admin",
  description: "Administração do site da Alarc.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
