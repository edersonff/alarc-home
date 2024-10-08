"use client";

import Loading from "@/app/loading";
import Header from "@/components/Admin/Header";
import Navbar from "@/components/Admin/Navbar";
import { useAuthStore } from "@/store/auth";
import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";

import "react-quill/dist/quill.snow.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hydrated, setHydrated] = useState(false);
  const { isLogged } = useAuthStore();

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <Loading />;
  }

  if (!isLogged) {
    return notFound();
  }

  return (
    <div className="w-full h-[100vh]">
      <div className="flex w-full h-full">
        <Navbar />
        <div className="w-full h-full flex flex-col pt-7 overflow-y-scroll">
          <Header />
          <div className="bg-neutral-100 xl-lg:p-[30px] rounded-tl-[25px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
