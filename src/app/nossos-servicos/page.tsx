"use client";

import Button from "@/components/Button";
import OutlinedButton from "@/components/Button/Outlined";
import { Info, Typo } from "@/components/Typo";
import ContentLayout from "@/layout/content";
import { useInfoStore } from "@/store/info";
import { useRouter } from "next/navigation";
import React from "react";

export default function NossosServicos() {
  const nossosServicos = useInfoStore((state) => state.nossosServicos);
  const { push } = useRouter();
  return (
    <ContentLayout info="nossosServicos">
      <div className="content flex flex-col gap-14 mt-24 mb-[72px]">
        <Typo typo="paragraph" className="xl-lg:w-2/3">
          <Info info="nossosServicos" text="text" />
        </Typo>
        <img
          className="xl-lg:absolute xl-lg:w-[35%] w-full right-0 h-auto object-right relative"
          src={nossosServicos.image}
          alt="Nossos Serviços"
        />
        <div className="flex gap-main xl-lg:mt-24">
          <Button onClick={() => push(nossosServicos.redirect)}>
            Saiba Mais
          </Button>
          <OutlinedButton onClick={() => push("/")}>Voltar</OutlinedButton>
        </div>
      </div>
    </ContentLayout>
  );
}
