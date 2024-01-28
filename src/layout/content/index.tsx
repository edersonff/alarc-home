import Navbar from "@/components/Navbar";
import { Info, Typo } from "@/components/Typo";
import { infoData } from "@/info";
import Image from "next/image";
import React from "react";

export default function ContentLayout({
  children,
  info,
}: {
  children: React.ReactNode;
  info: keyof typeof infoData;
}) {
  const data = infoData[info] as any;
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="w-full relative mt-14">
        <div className="content flex items-start relative z-10 py-16">
          <Typo typo="sectionTitle" className="px-10 py-[10px] bg-white">
            <Info info={info} text="title" />
          </Typo>
        </div>
        <Image
          src={data.background}
          alt="Banner"
          layout="fill"
          objectFit="cover"
          loading="eager"
          className="absolute top-0 left-0 -z-10 unselectable undraggable"
        />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
