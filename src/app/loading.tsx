import Image from "next/image";
import React from "react";

export default function Loading() {
  return (
    <div className="fixed w-full h-full center">
      <Image
        src="/alarc/logo-without-text.svg"
        alt="Loading Logo"
        width={50}
        height={50}
        className="animate-spin"
      />
    </div>
  );
}
