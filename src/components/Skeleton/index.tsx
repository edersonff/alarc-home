import React from "react";

export default function Skeleton({
  className,
  ...props
}: { className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`animate-pulse bg-gray-300 ${className}`} {...props} />
  );
}
