import Link from "next/link";
import React, { useMemo } from "react";

export default function GhostButton({
  className,
  as: Tag = "button",
  ...props
}: {
  as?: any;
} & JSX.IntrinsicElements["a" | "button"]) {
  return (
    <Tag
      className={
        "py-4 px-8 min-w-20 bg-primary bg-opacity-15 text-primary hover:bg-opacity-100 transition-all active:bg-opacity-85 hover:text-white rounded-full font-medium text-sm " +
        className
      }
      {...props}
    />
  );
}
