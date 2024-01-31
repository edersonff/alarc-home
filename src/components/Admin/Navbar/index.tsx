import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { AdminNavbarItems } from "./items";
import { IconType } from "react-icons";
import Link from "next/link";
import { IoExit } from "react-icons/io5";

export default function Navbar() {
  const path = usePathname();

  return (
    <div className="px-8 min-w-[240px] h-full flex flex-col">
      <div className="mb-8">
        <Image
          src="/alarc/logo-without-text.svg"
          alt="Alarc"
          width={50}
          height={50}
        />
      </div>
      <div className="flex flex-col h-full justify-between mb-8">
        <div className="flex flex-col gap-4">
          {AdminNavbarItems.map((item, index) => {
            return (
              <>
                {index === 2 && <hr className="my-2 opacity-40" />}
                <Nav
                  key={index}
                  className={"bg-black"}
                  icon={item.icon}
                  label={item.label}
                  path={item.path}
                  selected={path === item.path}
                />
              </>
            );
          })}
        </div>

        <Nav
          className={"bg-red-600/10 text-red-600"}
          icon={IoExit}
          label={"Sair"}
          path={"/admin/sair"}
          selected={true}
        />
      </div>
    </div>
  );
}

function Nav({
  className,
  icon: Icon,
  label,
  path,
  selected,
}: {
  className: string;
  icon: IconType | typeof Image | any;
  label: string;
  path: string;
  selected: boolean;
}) {
  return (
    <Link
      href={path}
      className={
        "flex items-center gap-4 py-3 px-4 rounded-lg cursor-pointer " +
        (selected ? className + " text-white" : "hover:bg-gray-100")
      }
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
}
