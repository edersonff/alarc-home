"use client";

import { infoService } from "@/services/info";
import { useEditorStore } from "@/store/editor";
import { useInfoStore } from "@/store/info";
import { infoData } from "@/utils/api/info";
import React, { useMemo, useRef } from "react";

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function Info({
  text,
  info,
}: {
  info: keyof typeof infoData;
  text: string;
}) {
  const data = useInfoStore();
  const savedRef = useRef<HTMLDivElement>(null);
  const { isEditing } = useEditorStore();
  const infoText = useMemo(() => {
    return (data[info] as any)[text];
  }, [info, text, data]);

  async function handleInput(e: React.FormEvent<HTMLDivElement>) {
    const target = e.target as HTMLDivElement;
    const value = target.innerHTML;

    await sleep(500);

    if (value !== target.innerHTML) return;

    await infoService.update(info, {
      name: text,
      value,
    });

    savedRef.current?.style.setProperty("opacity", "1", "important");

    await sleep(1500);

    savedRef.current?.style.setProperty("opacity", "0", "important");
  }

  return (
    <>
      <div className="fixed">
        <div
          ref={savedRef}
          className="absolute -right-full bg-green-500 text-white px-2 py-1 rounded-md text-xs font-bold flex opacity-0 pointer-events-none transition-all duration-300"
        >
          <p className="text-white">Salvo</p>
        </div>
      </div>
      <span
        onClick={(e) => {
          if (isEditing) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        contentEditable={isEditing}
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: infoText || "" }}
      />
    </>
  );
}

export const typoStyles = {
  nav: {
    class:
      "text-neutral-600 text-sm font-medium hover:text-primary transition-all active:text-opacity-70",
    tag: "div",
  },
  block: {
    class: "text-[32px] font-light leading-[32px]",
    tag: "h2",
  },
  sectionTitle: {
    class:
      "text-dark xl-lg:text-[40px] text-2xl font-bold font-['Adam'] uppercase leading-[44px] tracking-[5.20px]",
    tag: "h2",
  },
  paragraph: {
    class:
      "text-dark xl-lg:text-[20px] text-[18px] leading-[50px] tracking-wide ",
    tag: "div",
  },
  button: { class: "text-xl font-bold", tag: "span" },
  agency: { class: "text-black text-[32px] font-semibold", tag: "span" },
  post: { class: "text-black text-[32px] font-medium", tag: "h1" },
  date: { class: "text-xs leading-normal text-dark/50 font-medium", tag: "p" },
  blockTitle: {
    class: "text-[24px] font-bold",
    tag: "h2",
  },
};

type TypoProps = {
  children?: React.ReactNode;
  className?: string;
  typo: keyof typeof typoStyles;
} & JSX.IntrinsicElements["p"];

export function Typo({
  children,
  className,
  typo,
  as: tag,
  ...props
}: TypoProps & { as?: keyof JSX.IntrinsicElements }) {
  const style = useMemo(() => {
    const type = typoStyles[typo];

    return {
      class: type.class + " " + String(className),
      tag: tag || type.tag,
    };
  }, [typo, className, tag]);

  return (
    <style.tag className={style.class} {...(props as any)}>
      {children}
    </style.tag>
  );
}
