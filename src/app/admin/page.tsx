"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import AdminLayout from "@/layout/admin";
import { authService } from "@/services/auth";
import { useAuthStore } from "@/store/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

export default function Admin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { push } = useRouter();
  const { isLogged, setLogged } = useAuthStore();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      return;
    }

    const {
      data: { token },
    } = await authService.login(username, password);

    if (token) {
      setLogged(true);
      localStorage.setItem("token", token);
      push("/admin/dashboard");
    }
  }

  if (isLogged) {
    push("/admin/dashboard");

    return <></>;
  }

  return (
    <div className="flex min-h-[100vh] w-full ">
      <div className="flex-1">
        <div className="center h-full">
          <form
            onSubmit={handleLogin}
            className="min-w-[450px] flex flex-col gap-20"
          >
            <h1 className="font-light text-6xl">
              <span>Dashboard</span>
              <br className="mb-3" />
              <b className="text-primary font-bold font-['Adam']">Alarc</b>{" "}
            </h1>

            <div>
              <Input
                type="text"
                placeholder="Usuário"
                name="username"
                className="mb-8 bg-white"
                innerRef={usernameRef}
              />
              <Input
                type="password"
                placeholder="Senha"
                name="password"
                className="bg-white"
                innerRef={passwordRef}
              />
            </div>
            <div>
              <Button
                type="submit"
                className="w-full text-lg py-[12px] font-normal rounded-md"
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex-1 relative xl-lg:block hidden">
        <Image
          src="/images/background/admin.svg"
          alt="Admin Background"
          layout="fill"
          objectFit="cover"
          loading="eager"
        />
      </div>
    </div>
  );
}
