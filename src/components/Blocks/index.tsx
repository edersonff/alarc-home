"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { Info, Typo } from "../Typo";
import { BsArrowRightCircle } from "react-icons/bs";
import TouchRipple, {
  TouchRippleProps,
} from "@material-ui/core/ButtonBase/TouchRipple";
import Link from "next/link";

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
            <Block className="bg-secondary flex-1 text-white">
              <div className="w-full">
                <Typo typo="block" className="mb-3">
                  <Info info="quemSomos" text="label" />
                </Typo>
                <BsArrowRightCircle className="text-white text-[54px]" />
              </div>
            </Block>
          </div>

          <div className="flex-1 gap-8 flex flex-col">
            <Block className="bg-primary flex-1 text-white">
              <div className="w-full">
                <Typo typo="block" className="mb-3">
                  <Info info="quemSomos" text="label" />
                </Typo>
              </div>
            </Block>
            <Block className="bg-neutral-200 text-black flex-1">
              <div className="w-full">
                <Typo typo="block" className="mb-3">
                  <Info info="tools" text="label" />
                </Typo>
              </div>
            </Block>
          </div>

          <div className="flex-1 gap-8 flex flex-col">
            <Block className="bg-neutral-200 flex-1 text-black">
              <div className="w-full">
                <Typo typo="block" className="mb-3">
                  <Info info="nossosClientes" text="label" />
                </Typo>
              </div>
            </Block>
            <Block className="bg-secondary text-white flex-1">
              <div className="w-full">
                <Typo typo="block" className="mb-3">
                  <Info info="canaisAtuacao" text="label" />
                </Typo>
              </div>
            </Block>
          </div>

          <div className="flex-1 gap-8 flex flex-col">
            <Block className="bg-neutral-200 h-44 center">
              <Image
                src="/alarc/logo-gray.svg"
                loading="eager"
                alt="Logo"
                width={200}
                height={200}
              />
            </Block>
            <Block className="bg-black flex-1 text-white">
              <div className="w-full">
                <Typo typo="block" className="mb-3">
                  <Info info="quemSomos" text="label" />
                </Typo>
                <BsArrowRightCircle className="text-white text-[54px]" />
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
}: {
  className: string;
  children: React.ReactNode;
}) {
  const rippleRef = useRef<TouchRippleProps>(null);
  const onRippleStart = (e) => {
    if (!rippleRef.current) return;
    rippleRef.current.start(e);
  };
  const onRippleStop = (e) => {
    if (!rippleRef.current) return;
    rippleRef.current.stop(e);
  };

  return (
    <Link
      href="#"
      onMouseDown={onRippleStart}
      onMouseLeave={onRippleStop}
      onMouseUp={onRippleStop}
      className={
        "flex flex-col justify-end items-center p-6 overflow-hidden rounded-[17px] relative z-10 unselectable undraggable " +
        className
      }
    >
      <TouchRipple ref={rippleRef} />
      {children}
    </Link>
  );
}
