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

  return <span dangerouslySetInnerHTML={{ __html: infoText }} />;
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
      "text-dark text-[40px] font-light font-['Adam'] leading-[44px] tracking-[5.20px]",
    tag: "h2",
  },
  paragraph: {
    class: "text-dark text-xl font-normal leading-[50px] tracking-wide",
    tag: "p",
  },
  button: { class: "text-xl font-bold", tag: "span" },
  agency: { class: "text-black text-[32px] font-semibold", tag: "span" },
};

export function Typo({
  children,
  className,
  typo,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  typo: keyof typeof typoStyles;
} & JSX.IntrinsicElements["p"]) {
  const style = useMemo(() => {
    return typoStyles[typo];
  }, [typo]);

  return (
    <style.tag className={`${className} ${style.class}`} {...(props as any)}>
      {children}
    </style.tag>
  );
}
