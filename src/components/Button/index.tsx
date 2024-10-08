import Link from "next/link";
import React, { useMemo } from "react";

export default function Button({
  className,
  href,
  target = "_blank",
  ...props
}: JSX.IntrinsicElements["button"] & {
  href?: string;
  target?: string;
}) {
  const Tag: any = useMemo(() => (href ? Link : "button"), [href]);

  return (
    <Tag
      href={href}
      target={target}
      className={
        className +
        " py-[14px] px-12 min-w-44 center rounded-full font-medium text-[18px] bg-primary text-white hover:bg-opacity-85 transition-all active:bg-opacity-100 "
      }
      {...props}
    />
  );
}
