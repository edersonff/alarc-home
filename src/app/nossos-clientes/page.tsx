"use client";

import Button from "@/components/Button";
import OutlinedButton from "@/components/Button/Outlined";
import Testimonials from "@/components/Testimonials";
import { Info, Typo } from "@/components/Typo";
import { nossosClientes } from "@/info";
import ContentLayout from "@/layout/content";
import { useRouter } from "next/navigation";
import React from "react";

export default function NossosClientes() {
  const { push } = useRouter();
  return (
    <ContentLayout info="nossosClientes">
      <div className="content flex flex-col gap-14 my-[72px]">
        <Typo typo="paragraph">
          <Info info="nossosClientes" text="text" />
        </Typo>
        <div className="center flex-col gap-[70px] w-full mt-16">
          <Typo
            typo="sectionTitle"
            className="xl-lg:px-[70px] text-center px-10 py-[10px] bg-neutral-600 text-white uppercase"
          >
            O que as pessoas dizem
          </Typo>
          <Testimonials />
        </div>
        <div className="center w-full gap-[30px] mt-16">
          <Button onClick={() => push(nossosClientes.redirect)}>
            Saiba Mais
          </Button>
          <OutlinedButton onClick={() => push("/")}>Voltar</OutlinedButton>
        </div>
      </div>
    </ContentLayout>
  );
}
