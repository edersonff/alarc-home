"use client";

import ImageLoading from "@/components/Image";
import Navbar from "@/components/Navbar";
import { Info, Typo } from "@/components/Typo";
import { useInfoStore } from "@/store/info";
import { infoData as data } from "@/utils/api/info";
import React from "react";

export default function ContentLayout({
  children,
  info,
}: {
  children: React.ReactNode;
  info: keyof typeof data;
}) {
  const infoData = useInfoStore();

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="w-full relative mt-14">
        <div className="content flex items-start relative z-10 py-16">
          <Typo typo="sectionTitle" className="px-10 py-[10px] bg-white">
            <Info info={info} text="title" />
          </Typo>
        </div>
        <ImageLoading
          src={infoData[info].background}
          alt="Banner"
          layout="fill"
          objectFit="cover"
          loading="eager"
          className="-z-10 unselectable undraggable"
        />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
