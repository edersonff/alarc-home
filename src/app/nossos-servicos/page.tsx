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
        <div className="">
          <Typo typo="paragraph">
            <Info info="nossosServicos" text="text" />
          </Typo>
          <br />
          <div className="flex flex-col gap-main my-20">
            <div className="flex xl-lg:flex-row flex-col gap-main">
              <ServiceBlock title="Marketing" Icon={FaBullhorn} url="/contato">
                Marketing editorial, aquisições, monetização, estudo de mercado
                e web design.
              </ServiceBlock>
              <ServiceBlock title="Anúncios" Icon={FaAd} url="/contato">
                Fotografia e vídeo, criação de anúncios, revisão de anúncios,
                precificação ampla, vinculações TI e cadastros em canais.
              </ServiceBlock>
            </div>
            <div className="flex xl-lg:flex-row flex-col gap-main">
              <ServiceBlock
                title="Desempenho"
                Icon={FaChartLine}
                url="/contato"
              >
                Campanhas canais, ads e cupons, positivação {">"} 80%,
                gerenciamento Fulfillment, acompanhamento de indicadores e
                monitoria de níveis de serviço.
              </ServiceBlock>
              <ServiceBlock title="Atendimento" Icon={FaUser} url="/contato">
                Perguntas pré-vendas, atendimento pós-vendas, resolução de
                conflitos, negociação de vendas e chamados com canais.
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
