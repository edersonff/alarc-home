"use client";

import Button from "@/components/Button";
import OutlinedButton from "@/components/Button/Outlined";
import { Info, Typo } from "@/components/Typo";
import ContentLayout from "@/layout/content";
import { useInfoStore } from "@/store/info";
import { useRouter } from "next/navigation";
import React from "react";

export default function HeroTools() {
  const tools = useInfoStore((state) => state.tools);
  const { push } = useRouter();
  return (
    <ContentLayout info="tools">
      <div className="content flex flex-col gap-14 my-[72px]">
        <Typo typo="paragraph" className="xl-lg:w-2/3">
          <Info info="tools" text="text" />
        </Typo>
        <img
          className="xl-lg:absolute xl-lg:w-[35%] w-full right-0 h-auto object-right relative"
          src={tools.image}
          alt="Tools Image"
        />
        <div className="flex gap-main">
          <Button onClick={() => push(tools.redirect)}>Saiba Mais</Button>
          <OutlinedButton onClick={() => push("/")}>Voltar</OutlinedButton>
        </div>
      </div>
    </ContentLayout>
  );
}
