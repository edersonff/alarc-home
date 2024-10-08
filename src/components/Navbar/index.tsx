"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import GhostButton from "../Button/Ghost";

import { useInfoStore } from "@/store/info";

export default function Navbar({ absolute }: { absolute?: boolean }) {
  const pages = useInfoStore((state) => state.pages);
  return (
    <div className={"w-full z-50 " + (absolute ? "absolute" : "relative")}>
      <div className="content flex justify-between items-center w-full mt-16">
        <Link href="/">
          <Image
            src="/logo.svg"
            loading="eager"
            alt="Logo"
            width={200}
            height={60}
            className="unselectable undraggable"
          />
        </Link>
        <div className="gap-main xl-lg:flex hidden">
          <div className="justify-end items-center gap-main inline-flex">
            {pages?.map((page: any) => (
              <Link key={page.href} href={page.href}>
                <div className="nav">{page.title}</div>
              </Link>
            ))}
          </div>
          <GhostButton as={Link} href="/contato#forms">
            Entrar em Contato
          </GhostButton>
        </div>
      </div>
    </div>
  );
}
