"use client";

import Button from "@/components/Button";
import OutlinedButton from "@/components/Button/Outlined";
import { Info } from "@/components/Typo";
import ContentLayout from "@/layout/content";
import { useInfoStore } from "@/store/info";
import { useRouter } from "next/navigation";
import React from "react";

export default function QuemSomos() {
  const quemSomos = useInfoStore((state) => state.quemSomos);
  const { push } = useRouter();
  return (
    <ContentLayout info="quemSomos">
      <div className="content flex flex-col gap-14 my-[72px]">
        <div className="paragraph xl-lg:w-2/3">
          <Info info="quemSomos" text="text" />
        </div>
        <img
          className="xl-lg:absolute xl-lg:w-[35%] w-full right-0 h-auto object-right relative"
          src={quemSomos.image}
          alt="Quem Somos"
        />
        <div className="flex gap-main xl-lg:mt-24">
          <Button onClick={() => push(quemSomos.redirect)}>Saiba Mais</Button>
          <OutlinedButton onClick={() => push("/")}>Voltar</OutlinedButton>
        </div>
      </div>
    </ContentLayout>
  );
}
