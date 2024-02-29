"use client";

import Image from "next/image";
import React, { useMemo, useRef } from "react";
import { Info, Typo } from "../Typo";
import { BsArrowRightCircle } from "react-icons/bs";
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple";
import Link from "next/link";
import { FaCirclePlus } from "react-icons/fa6";
import { useInfoStore } from "@/store/info";
import Show from "../Show";

export default function Blocks() {
  const {
    academia,
    canaisAtuacao,
    nossosClientes,
    nossosServicos,
    noticias,
    quemSomos,
    tools,
    contato,
  } = useInfoStore((state) => ({
    academia: state.academia,
    canaisAtuacao: state.canaisAtuacao,
    nossosClientes: state.nossosClientes,
    nossosServicos: state.nossosServicos,
    noticias: state.noticias,
    quemSomos: state.quemSomos,
    tools: state.tools,
    contato: state.contato,
  }));

  return (
    <div className="w-full">
      <div className="content">
        <div className="flex gap-main columns-4 w-full min-h-[60vh] xl-lg:flex-row flex-col">
          <div className="flex-1 gap-main flex flex-col">
            <Show delay={0}>
              <Block
                className="bg-neutral-200 text-black h-44"
                href={nossosServicos.href}
                plus="text-primary"
              >
                <div className="w-full">
                  <Typo typo="block" className="mb-3">
                    <Info info="nossosServicos" text="label" />
                  </Typo>
                </div>
              </Block>
            </Show>
            <Show className="flex-1" delay={0.4}>
              <Block
                className="bg-secondary text-white"
                href={academia.href}
                target="_blank"
              >
                <div className="w-full">
                  <Typo typo="block" className="mb-3">
                    <Info info="academia" text="label" />
                  </Typo>
                  <BsArrowRightCircle className="text-white text-[54px]" />
                </div>
              </Block>
            </Show>
          </div>

          <div className="flex-1 gap-main flex flex-col">
            <Show delay={0.1} className="flex-1">
              <Block
                className="bg-primary text-white"
                href={quemSomos.href}
                plus="text-white"
              >
                <div className="w-full">
                  <Typo typo="block" className="mb-3">
                    <Info info="quemSomos" text="label" />
                  </Typo>
                </div>
              </Block>
            </Show>
            <Show delay={0.5} className="flex-1">
              <Block
                className="bg-neutral-200 text-black"
                href={tools.href}
                plus="text-primary"
              >
                <div className="w-full">
                  <Typo typo="block" className="mb-3">
                    <Info info="tools" text="label" />
                  </Typo>
                </div>
              </Block>
            </Show>
          </div>

          <div className="flex-1 gap-main flex flex-col">
            <Show delay={0.2} className="flex-1">
              <Block
                className="bg-neutral-200 text-black"
                href={nossosClientes.href}
                plus="text-primary"
              >
                <div className="w-full">
                  <Typo typo="block" className="mb-3">
                    <Info info="nossosClientes" text="label" />
                  </Typo>
                </div>
              </Block>
            </Show>
            <Show delay={0.6} className="flex-1">
              <Block
                className="bg-secondary text-white"
                href={canaisAtuacao.href}
                plus="text-white"
              >
                <div className="w-full">
                  <Typo typo="block" className="mb-3">
                    <Info info="canaisAtuacao" text="label" />
                  </Typo>
                </div>
              </Block>
            </Show>
          </div>

          <div className="flex-1 gap-main flex flex-col">
            <Show delay={0.3}>
              <Block
                className="bg-primary text-white"
                href={noticias.href}
                plus="text-white"
              >
                <div className="w-full">
                  <Typo typo="block" className="mb-3">
                    <Info info="noticias" text="label" />
                  </Typo>
                </div>
              </Block>
            </Show>
            <Show className="flex-1" delay={0.7}>
              <Block href={contato.href} className="bg-black flex-1 text-white">
                <div className="w-full">
                  <Typo typo="block" className="mb-3">
                    <Info info="contato" text="label" />
                  </Typo>
                </div>

                <Image
                  src="/images/block/about.png"
                  alt="Logo"
                  layout="fill"
                  objectFit="cover"
                  loading="eager"
                  className="absolute top-0 left-0 -z-10 unselectable undraggable"
                />
              </Block>
            </Show>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Block({
  className,
  children,
  href,
  target,
  plus,
}: {
  className: string;
  children: React.ReactNode;
  href?: string;
  target?: string;
  plus?: string;
}) {
  const rippleRef = useRef<any>(null);

  const onRippleStart = (e: any) => {
    if (!rippleRef.current) return;
    rippleRef.current.start(e);
  };

  const onRippleStop = (e: any) => {
    if (!rippleRef.current) return;
    rippleRef.current.stop(e);
  };

  const Tag = useMemo(() => (href ? Link : "div"), [href]);

  return (
    <Tag
      href={href || ""}
      target={target}
      onMouseDown={onRippleStart}
      onMouseLeave={onRippleStop}
      onMouseUp={onRippleStop}
      className={
        "flex flex-col h-full justify-end items-center p-6 overflow-hidden rounded-[17px] relative z-10 unselectable undraggable min-h-52 cursor-pointer " +
        className
      }
    >
      {plus && (
        <FaCirclePlus
          className={"absolute top-0 right-0 text-3xl mr-6 mt-6 " + plus}
        />
      )}
      <TouchRipple ref={rippleRef} />
      {children}
    </Tag>
  );
}
