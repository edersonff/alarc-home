import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import AppLayout from "@/layout/app";
import HydrationZustand from "@/layout/hydration";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

const adam = localFont({
  variable: "--font-adam",
  src: [
    {
      path: "../../public/static/font/Adam-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/static/font/Adam-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
});

import "./globals.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const metadata: Metadata = {
  title: "Alarc - Página Inicial",
  description:
    "A Alarc é uma empresa de serviços de e-commerce completa. Nossos clientes se ocupam com a operação física de compras e logística. Nós fazemos todo o resto, desde atendimento, chamados, anúncios, marketing, fotos, entre outros.",
  alternates: {
    canonical: "https://alarc.com.br",
  },
  openGraph: {
    url: "https://alarc.com.br",
    type: "website",
    title: "Alarc - Página Inicial",
    description:
      "A Alarc é uma empresa de serviços de e-commerce completa. Nossos clientes se ocupam com a operação física de compras e logística. Nós fazemos todo o resto, desde atendimento, chamados, anúncios, marketing, fotos, entre outros.",
    images: [
      {
        url: "https://alarc.com.br/images/og/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Alarc - Página Inicial",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.variable} ${adam.variable}`}>
        <HydrationZustand>
          <AppLayout>{children}</AppLayout>
        </HydrationZustand>
      </body>
    </html>
  );
}
