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
    <div className="flex items-center justify-between xl-lg:flex-row flex-col xl-lg:gap-12 gap-6">
      <h2 className="text-black xl-lg:text-[32px] text-[20px] font-normal">
        {title}
      </h2>
      <div className="xl-lg:w-2/3 w-full flex justify-between gap-20">
        {images.map((image, index) => (
          <div className="w-[160px] h-[120px] relative" key={index}>
            <Image
              src={image}
              alt={title}
              layout="fill"
              className="object-scale-down grayscale hover:grayscale-0 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
