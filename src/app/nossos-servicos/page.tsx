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
                  "Aquisições",
                  "Web design",
                  "Monetização",
                  "Marketing digital",
                  "Estudo de mercado",
                ].map((item, index) => (
                  <li className="-m-0.5 text-center" key={index}>
                    {item}
                  </li>
                ))}
              </ServiceBlock>
              <ServiceBlock title="Anúncios" Icon={FaAd} url="/contato">
                {[
                  "Vinculações TI",
                  "Fotografia e vídeo",
                  "Precificação ampla",
                  "Criação de anúncios",
                  "Revisão de anúncios",
                  "Cadastros em canais",
                ].map((item, index) => (
                  <li className="-m-0.5 text-center" key={index}>
                    {item}
                  </li>
                ))}
              </ServiceBlock>
            </div>
            <div className="flex justify-center gap-main">
              <ServiceBlock
                title="Desempenho"
                Icon={FaChartLine}
                url="/contato"
              >
                {[
                  "Ads e cupons",
                  "Positivação > 80%",
                  "Campanhas canais",
                  "Gerenciamento Fulfillment",
                  "Monitoria de níveis de serviço",
                  "Acompanhamento de indicadores",
                ].map((item, index) => (
                  <li className="-m-0.5 text-center" key={index}>
                    {item}
                  </li>
                ))}
              </ServiceBlock>
              <ServiceBlock title="Atendimento" Icon={FaUser} url="/contato">
                {[
                  "Perguntas pré-vendas",
                  "Chamados com canais",
                  "Negociação de vendas",
                  "Resolução de conflitos",
                  "Atendimento pós-vendas",
                ].map((item, index) => (
                  <li className="-m-0.5 text-center" key={index}>
                    {item}
                  </li>
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
