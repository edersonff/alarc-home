import Image from "next/image";
import React from "react";

export default function Partner({
  title,
  images,
}: {
  title: string;
  images: string[];
}) {
  return (
    <div className="flex items-center justify-between gap-12">
      <h2 className="text-black text-[32px] font-semibold">{title}</h2>
      <div className="w-2/3 flex gap-20">
        {images.map((image, index) => (
          <div className="w-[160px] h-[120px] relative" key={index}>
            <Image
              src={image}
              alt={title}
              layout="fill"
              className="object-scale-down"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
