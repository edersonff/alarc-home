import React from "react";

export default function OutlinedButton({
  className,
  ...props
}: JSX.IntrinsicElements["button"]) {
  return (
    <button
      className={
        className +
        " py-4 px-8 center border-2 min-w-44 rounded-full font-medium text-xl border-primary text-primary hover:bg-primary/15 transition-all active:bg-opacity-85 "
      }
      {...props}
    />
  );
}
