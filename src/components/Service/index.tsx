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
      className="flex-1 border-2 bg-white rounded-2xl hover:bg-primary hover:text-white group transition-all duration-200 px-6 py-8"
    >
      <div className="flex gap-main h-full relative">
        <Icon className="text-4xl min-w-11 absolute left-2 top-0 text-primary group-hover:text-white" />
        <div className="w-full flex justify-center">
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-[24px] font-bold mb-6 text-center">
                {title}
              </h3>
              <p className="mb-8 text-black/70 leading-[280%] text-[14px] font-medium group-hover:text-white/90 duration-200">
                {children}
              </p>
            </div>
            <span className=" text-primary group-hover:text-white flex text-sm font-bold justify-center hover:underline">
              Saiba mais
              <FiExternalLink className="inline-block ml-2 mt-0.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
