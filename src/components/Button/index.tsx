import Link from "next/link";
import React, { useMemo } from "react";

export default function Button({
  className,
  href,
  ...props
}: JSX.IntrinsicElements["button"] & {
  href?: string;
}) {
  const Tag: any = useMemo(() => (href ? Link : "button"), [href]);

  return (
    <Tag
      href={href}
      target={href ? "_blank" : ""}
      className={
        "py-4 px-8 min-w-44 center rounded-full font-medium text-xl bg-primary text-white hover:bg-primary/85 transition-all active:bg-primary " +
        className
      }
      {...props}
    />
  );
}
