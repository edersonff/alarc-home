"use client";

import Button from "@/components/Button";
import OutlinedButton from "@/components/Button/Outlined";
import Partner from "@/components/Partner";
import { Info, Typo } from "@/components/Typo";
import { canaisAtuacao } from "@/info";
import ContentLayout from "@/layout/content";
import { useRouter } from "next/navigation";
import React from "react";

const basePath = "/images/parters";

const getParter = (name: string) => `${basePath}/${name}.svg`;

const partnerAgency = [
  getParter("amazon"),
  getParter("magalu"),
  getParter("mercado-livre"),
];

const asian = [getParter("shein"), getParter("shopee")];

const others = [
  getParter("americanas"),
  getParter("leroy"),
  getParter("casas-bahia"),
];

export default function CanaisAtuacao() {
  const { push } = useRouter();
  return (
    <ContentLayout info="canaisAtuacao">
      <div className="content flex flex-col gap-14 my-[72px]">
        <Typo typo="paragraph" className="xl-lg:w-2/3">
          <Info info="canaisAtuacao" text="text" />
        </Typo>

        <img
          className="xl-lg:absolute xl-lg:w-[35%] w-full right-0 h-auto object-right relative"
          src={canaisAtuacao.image}
          alt="Quem Somos"
        />

        <hr />

        <div className="flex flex-col xl-lg:gap-11 gap-20">
          <Partner title="Agências parceiras" images={partnerAgency} />
          <Partner title="Asiáticos" images={asian} />
          <Partner title="Outros canais" images={others} />
        </div>

        <div className="flex gap-[30px]">
          <Button href={canaisAtuacao.redirect}>Saiba Mais</Button>
          <OutlinedButton onClick={() => push("/")}>Voltar</OutlinedButton>
        </div>
      </div>
    </ContentLayout>
  );
}
