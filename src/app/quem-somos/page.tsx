"use client";

import Button from "@/components/Button";
import OutlinedButton from "@/components/Button/Outlined";
import { Info, Typo } from "@/components/Typo";
import { quemSomos } from "@/info";
import ContentLayout from "@/layout/content";
import { useRouter } from "next/navigation";
import React from "react";

export default function QuemSomos() {
  const { push } = useRouter();
  return (
    <ContentLayout info="quemSomos">
      <div className="content flex flex-col gap-14 my-[72px]">
        <Typo typo="paragraph" className="lg:w-2/3 xl:w-2/3">
          <Info info="quemSomos" text="text" />
        </Typo>
        <div className="flex gap-[30px]">
          <Button onClick={() => push(quemSomos.redirect)}>Saiba Mais</Button>
          <OutlinedButton onClick={() => push("/")}>Voltar</OutlinedButton>
        </div>
        <img
          className="absolute right-0 w-[35%] h-auto object-scale-down object-right xl:block lg:block hidden"
          src={quemSomos.image}
          alt="Quem Somos"
        />
      </div>
    </ContentLayout>
  );
}
