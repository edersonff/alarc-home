"use client";

import Button from "@/components/Button";
import OutlinedButton from "@/components/Button/Outlined";
import Partner from "@/components/Partner";
import { Info } from "@/components/Typo";
import ContentLayout from "@/layout/content";
import { useInfoStore } from "@/store/info";
import { useRouter } from "next/navigation";
import React from "react";

const basePath = "/images/parters";

const getParter = (name: string) => `${basePath}/${name}.svg`;

const partnerAgency = [
  getParter("amazon"),
  getParter("mercado-livre"),
  getParter("magalu"),
];

const asian = [
  getParter("shein"),
  getParter("shopee"),
  getParter("aliexpress"),
];

const ownSite = [
  getParter("nuvem-shop"),
  getParter("tray"),
  getParter("loja-integrada"),
];

const others = [
  getParter("americanas"),
  getParter("leroy"),
  getParter("casas-bahia"),
];

export default function CanaisAtuacao() {
  const canaisAtuacao = useInfoStore((state) => state.canaisAtuacao);
  const { push } = useRouter();
  return (
    <ContentLayout info="canaisAtuacao">
      <div className="content flex flex-col gap-14 my-[72px]">
        <div className="paragraph xl-lg:w-2/3">
          <Info info="canaisAtuacao" text="text" />
        </div>

        <img
          className="xl-lg:absolute xl-lg:w-[35%] w-full right-0 h-auto object-right relative"
          src={canaisAtuacao.image}
          alt="Canais de Atuação"
        />

        <hr />

        <div className="flex flex-col xl-lg:gap-11 gap-20">
          <Partner title="Canais Certificados" images={partnerAgency} />
          <Partner title="Marketplaces Asiátios" images={asian} />
          <Partner title="Site Próprio" images={ownSite} />
          <Partner title="Demais Marketplaces" images={others} />
        </div>

        <div className="flex gap-main xl-lg:mt-24">
          <Button target="" href={canaisAtuacao.redirect}>
            Saiba Mais
          </Button>
          <OutlinedButton onClick={() => push("/")}>Voltar</OutlinedButton>
        </div>
      </div>
    </ContentLayout>
  );
}
