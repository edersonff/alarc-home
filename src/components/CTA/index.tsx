import Link from "next/link";
import React, { useMemo } from "react";
import { FiExternalLink } from "react-icons/fi";

export default function CTA({
  title,
  subtitle,
  children,
  image,
  link,
  orientation,
}: {
  title: string | React.ReactNode;
  subtitle: string | React.ReactNode;
  children: React.ReactNode;
  image: React.ReactNode;
  link: {
    href: string;
    label: string;
  };
  orientation: "left" | "right";
}) {
  const orientationClass = useMemo(() => {
    switch (orientation) {
      case "left":
        return "xl-lg:flex-row";
      case "right":
        return "xl-lg:flex-row-reverse";
    }
  }, [orientation]);

  return (
    <div className={"flex flex-col gap-main " + orientationClass}>
      <div className="xl-lg:flex-1 xl-lg:min-h-auto w-full min-h-72 overflow-hidden relative rounded-[20px]">
        {image}
      </div>
      <div className="flex-1">
        <p className="text-[20px] font-light mb-1">{subtitle}</p>
        <h2 className="text-[48px] font-bold mb-12">{title}</h2>
        <p
          style={{
            fontSize: "18px",
          }}
          className="paragraph mb-16 text-opacity-80 font-light"
        >
          {children}
        </p>
        <Link
          target="_blank"
          href={link.href}
          className="text-xl text-[#0066FF] font-bold hover:underline"
        >
          {link.label}
          <FiExternalLink className="inline-block ml-2 -mt-1" />
        </Link>
      </div>
    </div>
  );
}
