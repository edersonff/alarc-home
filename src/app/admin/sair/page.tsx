"use client";
import { authService } from "@/services/auth";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

export default function AdminSair() {
  const { push } = useRouter();
  const { setLogged } = useAuthStore();

  useEffect(() => {
    function logout() {
      setLogged(false);
      localStorage.removeItem("token");
      push("/admin");
    }

    logout();
  }, []);

  return null;
}
