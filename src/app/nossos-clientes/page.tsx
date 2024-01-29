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
          <h2 className="py-[4px] px-[70px] bg-neutral-600 text-white font-['Adam'] text-[40px] font-bold uppercase">
            O que as pessoas dizem
          </h2>
          <Testimonials />
        </div>
        <div className="center w-full gap-7 mt-16">
          <Button onClick={() => push(nossosClientes.redirect)}>
            Saiba Mais
          </Button>
          <OutlinedButton onClick={() => push("/")}>Voltar</OutlinedButton>
        </div>
      </div>
    </ContentLayout>
  );
}
