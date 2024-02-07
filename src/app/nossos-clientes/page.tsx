"use client";

import Button from "@/components/Button";
import OutlinedButton from "@/components/Button/Outlined";
import Reviews from "@/components/Reviews";
import { Info, Typo } from "@/components/Typo";
import ContentLayout from "@/layout/content";
import { useInfoStore } from "@/store/info";
import { useRouter } from "next/navigation";
import React from "react";

export default function NossosClientes() {
  const nossosClientes = useInfoStore((state) => state.nossosClientes);
  const { push } = useRouter();
  return (
    <ContentLayout info="nossosClientes">
      <div className="content flex flex-col overflow-hidden gap-14 my-[72px]">
        <Typo typo="paragraph">
          <Info info="nossosClientes" text="text" />
        </Typo>
        <div className="center flex-col gap-[70px] w-full mt-16">
          <Typo
            typo="sectionTitle"
            className="xl-lg:px-[70px] text-center px-10 py-[10px] mb-16 bg-neutral-600 text-white uppercase"
          >
            O que as pessoas dizem
          </Typo>
          <Reviews />
        </div>
        <div className="center w-full gap-main mt-16">
          <Button onClick={() => push(nossosClientes.redirect)}>
            Saiba Mais
          </Button>
          <OutlinedButton onClick={() => push("/")}>Voltar</OutlinedButton>
        </div>
      </div>
    </ContentLayout>
  );
}
