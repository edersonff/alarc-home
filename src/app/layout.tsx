import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

export const adam = localFont({
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

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./globals.css";

export const metadata: Metadata = {
  title: "Alarc - Página Inicial",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${adam.variable}`}>{children}</body>
    </html>
  );
}
