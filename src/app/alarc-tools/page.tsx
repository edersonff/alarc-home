"use client";

import Button from "@/components/Button";
import OutlinedButton from "@/components/Button/Outlined";
import FeatureBlock from "@/components/Feature";
import { Info } from "@/components/Typo";
import ContentLayout from "@/layout/content";
import { useInfoStore } from "@/store/info";
import { useRouter } from "next/navigation";
import React from "react";
import { FaAd, FaBoxOpen } from "react-icons/fa";
import { IoPricetags } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";

export default function HeroTools() {
  const tools = useInfoStore((state) => state.tools);
  const { push } = useRouter();
  return (
    <ContentLayout info="tools">
      <div className="content flex flex-col gap-14 my-[72px]">
        <div>
          <div className="relative">
            <div className="paragraph xl-lg:w-2/3">
              <Info info="tools" text="text" />
            </div>

            <img
              className="xl-lg:absolute xl-lg:w-[40%] w-full right-0 bottom-0 h-auto object-right relative pointer-events-none"
              src={tools.image}
              alt="Tools Image"
            />
          </div>

          <br />

          <div className="flex flex-col gap-main my-20">
            <div className="flex xl-lg:flex-row flex-col gap-main">
              <FeatureBlock
                title="Precificação do Mercado Livre "
                Icon={IoPricetags}
                url="/contato"
              >
                Controle de preço de estoque do Mercado Livre
              </FeatureBlock>
              <FeatureBlock
                title="Relatórios"
                Icon={TbReportAnalytics}
                url="/contato"
              >
                Relatórios de vendas detalhados por canal
              </FeatureBlock>
            </div>
            <div className="flex xl-lg:flex-row flex-col gap-main">
              <FeatureBlock
                title="Automatização para carga"
                Icon={FaBoxOpen}
                url="/contato"
              >
                Automatização de carga FULL Mercado Livre
              </FeatureBlock>
              <FeatureBlock
                title="Automatização de anuncios"
                Icon={FaAd}
                url="/contato"
              >
                Automatização de ADS Mercado Livre
              </FeatureBlock>
            </div>
          </div>
        </div>

        <div className="flex gap-main xl-lg:mt-24">
          <Button onClick={() => push(tools.redirect)}>Saiba Mais</Button>
          <OutlinedButton onClick={() => push("/")}>Voltar</OutlinedButton>
        </div>
      </div>
    </ContentLayout>
  );
}
