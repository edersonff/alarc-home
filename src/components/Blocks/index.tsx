"use client";

import Image from "next/image";
import React, { useMemo, useRef } from "react";
import { Info, Typo } from "../Typo";
import { BsArrowRightCircle } from "react-icons/bs";
import TouchRipple, {
  TouchRippleProps,
} from "@material-ui/core/ButtonBase/TouchRipple";
import Link from "next/link";
import {
  academia,
  canaisAtuacao,
  nossosClientes,
  noticias,
  quemSomos,
  tools,
} from "@/info";

export default function Blocks() {
  return (
    <div className="w-full">
      <div className="content">
        <div className="flex gap-8 columns-4 w-full h-[55vh] min-h-96 xl:flex-row lg:flex-row flex-col">
          <div className="flex-1 gap-8 flex flex-col">
            <Block className="bg-neutral-200 h-44 center">
              <Image
                src="/alarc/logo-gray.svg"
                alt="Logo"
                width={200}
                height={200}
                className="unselectable undraggable"
              />
            </Block>
            <Block
              className="bg-secondary flex-1 text-white"
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
          </div>

          <div className="flex-1 gap-8 flex flex-col">
            <Block
              className="bg-primary flex-1 text-white"
              href={quemSomos.href}
            >
              <div className="w-full">
                <Typo typo="block" className="mb-3">
                  <Info info="quemSomos" text="label" />
                </Typo>
              </div>
            </Block>
            <Block
              className="bg-neutral-200 text-black flex-1"
              href={tools.href}
            >
              <div className="w-full">
                <Typo typo="block" className="mb-3">
                  <Info info="tools" text="label" />
                </Typo>
              </div>
            </Block>
          </div>

          <div className="flex-1 gap-8 flex flex-col">
            <Block
              className="bg-neutral-200 flex-1 text-black"
              href={nossosClientes.href}
            >
              <div className="w-full">
                <Typo typo="block" className="mb-3">
                  <Info info="nossosClientes" text="label" />
                </Typo>
              </div>
            </Block>
            <Block
              className="bg-secondary text-white flex-1"
              href={canaisAtuacao.href}
            >
              <div className="w-full">
                <Typo typo="block" className="mb-3">
                  <Info info="canaisAtuacao" text="label" />
                </Typo>
              </div>
            </Block>
          </div>

          <div className="flex-1 gap-8 flex flex-col">
            <Block className="bg-neutral-200 h-44" href={noticias.href}>
              <div className="w-full">
                <Typo typo="block" className="mb-3">
                  <Info info="noticias" text="label" />
                </Typo>
              </div>
            </Block>
            <Block className="bg-black flex-1 text-white">
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
}: {
  className: string;
  children: React.ReactNode;
  href?: string;
  target?: string;
}) {
  const rippleRef = useRef<any>(null);

  const onRippleStart = (e) => {
    if (!rippleRef.current) return;
    rippleRef.current.start(e);
  };

  const onRippleStop = (e) => {
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
        "flex flex-col justify-end items-center p-6 overflow-hidden rounded-[17px] relative z-10 unselectable undraggable min-h-52 cursor-pointer " +
        className
      }
    >
      <TouchRipple ref={rippleRef} />
      {children}
    </Tag>
  );
}
