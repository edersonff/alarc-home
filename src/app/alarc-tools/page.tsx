"use client";

import Button from "@/components/Button";
import OutlinedButton from "@/components/Button/Outlined";
import { Info, Typo } from "@/components/Typo";
import { tools } from "@/info";
import ContentLayout from "@/layout/content";
import { useRouter } from "next/navigation";
import React from "react";

export default function HeroTools() {
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
          alt="Quem Somos"
        />
        <div className="flex gap-[30px]">
          <Button onClick={() => push(tools.redirect)}>Saiba Mais</Button>
          <OutlinedButton onClick={() => push("/")}>Voltar</OutlinedButton>
        </div>
      </div>
    </ContentLayout>
  );
}
