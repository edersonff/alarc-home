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
          "py-[13.5px] px-4 block w-full border-2 border-gray-400 rounded-lg text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none " +
          className
        }
      />
    </>
  );
}
