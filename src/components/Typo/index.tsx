import { infoData } from "@/info";
import React, { useMemo } from "react";

export function Info({
  text,
  info,
}: {
  info: keyof typeof infoData;
  text: string;
}) {
  const infoText = useMemo(() => {
    return (infoData[info] as any)[text];
  }, [info, text]);

  return <span dangerouslySetInnerHTML={{ __html: infoText || "" }} />;
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
    tag: "p",
  },
  button: { class: "text-xl font-bold", tag: "span" },
  agency: { class: "text-black text-[32px] font-semibold", tag: "span" },
  post: { class: "text-black text-[32px] font-medium", tag: "h1" },
  date: { class: "text-xs leading-normal text-dark/50 font-medium", tag: "p" },
};

type TypoProps = {
  children: React.ReactNode;
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
