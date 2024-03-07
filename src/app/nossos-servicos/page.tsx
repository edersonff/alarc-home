"use client";

import Button from "@/components/Button";
import OutlinedButton from "@/components/Button/Outlined";
import ServiceBlock from "@/components/Service";
import { Info, Typo } from "@/components/Typo";
import ContentLayout from "@/layout/content";
import { useInfoStore } from "@/store/info";
import { useRouter } from "next/navigation";
import React from "react";
import { FaAd, FaBullhorn, FaChartLine, FaUser } from "react-icons/fa";

export default function NossosServicos() {
  const nossosServicos = useInfoStore((state) => state.nossosServicos);
  const { push } = useRouter();
  return (
    <ContentLayout info="nossosServicos">
      <div className="content flex flex-col gap-14 mt-24 mb-[72px]">
        <div>
          <Typo typo="paragraph">
            <Info info="nossosServicos" text="text" />
          </Typo>
          <br />
          <div className="flex flex-col gap-main my-20">
            <div className="flex xl-lg:flex-row flex-col gap-main">
              <ServiceBlock title="Marketing" Icon={FaBullhorn} url="/contato">
                {[
                  "Marketing digital",
                  "Aquisições",
                  "Monetização",
                  "Estudo de mercado",
                  "Web design",
                ].map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ServiceBlock>
              <ServiceBlock title="Anúncios" Icon={FaAd} url="/contato">
                {[
                  "Fotografia e vídeo",
                  "Criação de anúncios",
                  "Revisão de anúncios",
                  "Precificação ampla",
                  "Vinculações TI",
                  "Cadastros em canais",
                ].map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ServiceBlock>
            </div>
            <div className="flex xl-lg:flex-row flex-col gap-main">
              <ServiceBlock
                title="Desempenho"
                Icon={FaChartLine}
                url="/contato"
              >
                {[
                  "Campanhas canais",
                  "Ads e cupons",
                  "Positivação > 80%",
                  "Gerenciamento Fulfillment",
                  "Acompanhamento de indicadores",
                  "Monitoria de níveis de serviço",
                ].map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ServiceBlock>
              <ServiceBlock title="Atendimento" Icon={FaUser} url="/contato">
                {[
                  "Perguntas pré-vendas",
                  "Atendimento pós-vendas",
                  "Resolução de conflitos",
                  "Negociação de vendas",
                  "Chamados com canais",
                ].map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ServiceBlock>
            </div>
          </div>

          <br />
          <Typo typo="paragraph">
            <Info info="nossosServicos" text="text-end" />
          </Typo>
        </div>
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
