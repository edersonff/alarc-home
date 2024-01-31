"use client";

import Header from "@/components/Admin/Header";
import Navbar from "@/components/Admin/Navbar";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push } = useRouter();
  const { isLogged } = useAuthStore();

  useEffect(() => {
    if (!isLogged) {
      push("/admin");
    }
  }, [isLogged, push]);

  if (!isLogged) {
    return <></>;
  }

  return (
    <div className="w-full h-[100vh]">
      <div className="pt-7 flex w-full h-full">
        <Navbar />
        <div className="w-full h-full flex flex-col">
          <Header />
          <div className="bg-green-600/5 h-full p-[30px] rounded-tl-[25px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
