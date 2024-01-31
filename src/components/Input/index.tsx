import React from "react";

export default function Input({
  className,
  placeholder,
  innerRef,
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  innerRef?: React.RefObject<HTMLInputElement>;
}) {
  return (
    <>
      <label className="block font-medium text-gray-700 mb-2">
        {placeholder}
      </label>
      <input
        {...props}
        ref={innerRef}
        className={
          "py-[13.5px] px-4 block w-full border-2 border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-primary " +
          className
        }
      />
    </>
  );
}
