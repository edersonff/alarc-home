import React from "react";

export default function Block({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={
        "py-10 px-12 bg-white border-2 border-gray-300 rounded-xl " + className
      }
      {...props}
    >
      {children}
    </div>
  );
}
