import Link from "next/link";
import React, { useMemo } from "react";

export default function Button({
  className,
  href,
  target,
  ...props
}: JSX.IntrinsicElements["button"] & {
  href?: string;
  target?: string;
}) {
  const Tag: any = useMemo(() => (href ? Link : "button"), [href]);

  return (
    <Tag
      href={href}
      target={href ? "_blank" : target}
      className={
        className +
        " py-4 px-8 min-w-44 center rounded-full font-medium text-xl bg-primary text-white hover:bg-opacity-85 transition-all active:bg-opacity-100 "
      }
      {...props}
    />
  );
}
