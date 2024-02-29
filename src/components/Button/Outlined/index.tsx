import React from "react";

export default function OutlinedButton({
  className,
  innerRef,
  ...props
}: {
  innerRef?: React.RefObject<HTMLButtonElement>;
} & JSX.IntrinsicElements["button"]) {
  return (
    <button
      ref={innerRef}
      className={
        className +
        " py-[14px] px-8 center border-2 min-w-44 rounded-full font-medium text-[18px] border-primary text-primary hover:bg-primary/15 transition-all active:bg-opacity-85 "
      }
      {...props}
    />
  );
}
