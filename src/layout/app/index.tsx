"use client";

import Alert from "@/components/Alert";
import { infoService } from "@/services/info";
import { useEditorStore } from "@/store/editor";
import { useErrorStore } from "@/store/error";
import { InfoStore, useInfoStore } from "@/store/info";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const { errors } = useErrorStore();
  const setInfo = useInfoStore((state) => state.setInfo);
  const { isEditing } = useEditorStore();

  useEffect(() => {
    async function getInfo() {
      const { data: info } = (await infoService.get()) as any;

      const keys = Object.keys(info) as (keyof InfoStore)[];

      for (const key of keys) {
        const value = info[key];
        setInfo(key, value);
      }
    }

    getInfo();
  }, [setInfo]);

  if (!setInfo) return <></>;

  return (
    <>
      {!setInfo && (
        <div
          aria-hidden
          className="w-full h-full fixed top-0 left-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"
        >
          <div className="p-4 bg-white rounded-lg">
            <p className="text-2xl font-bold text-center">Carregando...</p>
          </div>
        </div>
      )}
      <div className="fixed left-5 top-5 h-full z-[500] flex flex-col gap-2">
        {errors.map((error, index) => (
          <Alert key={index} {...error} />
        ))}
      </div>
      {children}
      {!path.includes("admin") && isEditing && (
        <>
          <div className="w-full h-full fixed top-0 left-0 border-4 border-primary pointer-events-none" />
          <div className="bottom-4 right-4 fixed flex gap-2">
            <div className="px-6 py-2 bg-primary rounded-full center text-white font-bold">
              <p>Modo edição</p>
            </div>
            <Link
              href="/admin/editor/sair"
              className="px-2 py-2 text-3xl bg-primary hover:opacity-80 focus:opacity-100 transition-all delay-100 rounded-full text-white font-extrabold center"
            >
              <IoCloseSharp />
            </Link>
          </div>
        </>
      )}
    </>
  );
}
