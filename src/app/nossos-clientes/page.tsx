"use client";

import Button from "@/components/Button";
import OutlinedButton from "@/components/Button/Outlined";
import Reviews from "@/components/Reviews";
import { Info } from "@/components/Typo";
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
        <div className="paragraph">
          <Info info="nossosClientes" text="text" />
        </div>
        <div className="center flex-col gap-[70px] w-full mt-16">
          <h2 className="section-title xl-lg:px-[70px] text-center px-10 py-[10px] mb-16 bg-neutral-600 text-white uppercase">
            O que as pessoas dizem
          </h2>
          <Reviews />
        </div>
        <div className="center w-full gap-main xl-lg:mt-24">
          <Button onClick={() => push(nossosClientes.redirect)}>
            Saiba Mais
          </Button>
          <OutlinedButton onClick={() => push("/")}>Voltar</OutlinedButton>
        </div>
      </div>
    </ContentLayout>
  );
}
