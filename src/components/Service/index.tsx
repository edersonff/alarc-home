import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { FiExternalLink } from "react-icons/fi";

export default function ServiceBlock({
  title,
  url,
  Icon,
  children,
}: {
  title: string;
  url: string;
  Icon: IconType;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={url}
      className="flex-1 border-2 bg-white hover:bg-primary hover:text-white group transition-all duration-200 px-6 py-8"
    >
      <div className="flex gap-main h-full">
        <Icon className="text-4xl min-w-11 text-primary group-hover:text-white" />
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-[24px] font-bold mb-4">{title}</h3>
            <p className="mb-6 text-black/70 leading-[280%] text-[12px] font-medium group-hover:text-white/90 duration-200">
              {children}
            </p>
          </div>
          <span className=" text-primary group-hover:text-white flex text-sm font-bold hover:underline">
            Learn more
            <FiExternalLink className="inline-block ml-2 -mt-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
