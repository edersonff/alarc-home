"use client";

import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const route = useRouter();
  const { isLogged } = useAuthStore();

  if (!isLogged) {
    route.push("/admin");

    return <></>;
  }

  return (
    <div>
      <>{children}</>
    </div>
  );
}
