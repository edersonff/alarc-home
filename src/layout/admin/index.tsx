"use client";

import Header from "@/components/Admin/Header";
import Navbar from "@/components/Admin/Navbar";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import "react-quill/dist/quill.snow.css";

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
      <div className="flex w-full h-full">
        <Navbar />
        <div className="w-full h-full flex flex-col pt-7 overflow-y-scroll">
          <Header />
          <div className="bg-green-600/5 xl-lg:p-[30px] rounded-tl-[25px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
