import { pages } from "@/info";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import GhostButton from "../Button/Ghost";
import { Typo } from "../Typo";

export default function Navbar() {
  return (
    <div className="w-full">
      <div className="content flex justify-between items-center w-full mt-16">
        <Link href="/">
          <Image
            src="/logo.svg"
            loading="eager"
            alt="Logo"
            width={200}
            height={200}
            className="unselectable undraggable"
          />
        </Link>
        <div className="gap-[30px] xl:flex md:flex hidden">
          <div className="justify-end items-center gap-[30px] inline-flex">
            {pages.map((page) => (
              <Link key={page.href} href={page.href}>
                <Typo typo="nav">{page.title}</Typo>
              </Link>
            ))}
          </div>
          <GhostButton>Entrar em Contato</GhostButton>
        </div>
      </div>
    </div>
  );
}
