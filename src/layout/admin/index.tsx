"use client";

import Header from "@/components/Admin/Header";
import Navbar from "@/components/Admin/Navbar";
import Alert from "@/components/Alert";
import { useAuthStore } from "@/store/auth";
import { useErrorStore } from "@/store/error";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import "react-quill/dist/quill.snow.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLogged } = useAuthStore();
  const { errors } = useErrorStore();

  if (!isLogged) {
    return notFound();
  }

  return (
    <div className="w-full h-[100vh]">
      <div className="fixed left-5 top-5 h-full z-[500] flex flex-col gap-2">
        {errors.map((error, index) => (
          <Alert key={index} {...error} />
        ))}
      </div>
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
