"use client";

import Footer from "@/components/Footer";
import ImageLoading from "@/components/Image";
import Navbar from "@/components/Navbar";
import { Info, Typo } from "@/components/Typo";
import { useInfoStore } from "@/store/info";
import { InfoKeys } from "@/utils/api/info";
import React from "react";

export default function ContentLayout({
  children,
  info,
}: {
  children: React.ReactNode;
  info: InfoKeys;
}) {
  const infoData = useInfoStore();

  return (
    <div className="flex flex-col br">
      <Navbar />
      <div className="w-full relative mt-14">
        <div className="content flex items-start relative z-10 py-16">
          <Typo
            typo="section-title"
            className="px-10 py-3 bg-white xl-lg:w-auto w-full text-center"
          >
            <Info info={info} text="title" />
          </Typo>
        </div>
        <ImageLoading
          src={(infoData[info] as any).background}
          alt="Banner"
          layout="fill"
          objectFit="cover"
          loading="eager"
          className="-z-10 unselectable undraggable"
        />
      </div>
      <div className="w-full">{children}</div>
      <Footer />
    </div>
  );
}
