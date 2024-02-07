"use client";

import { PostType } from "@/@types/Post";
import Navbar from "@/components/Navbar";
import { Info, Typo } from "@/components/Typo";
import Image from "@/components/Image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useInfoStore } from "@/store/info";
import GhostButton from "@/components/Button/Ghost";
import Button from "@/components/Button";
import CTA from "@/components/CTA";
import OutlinedButton from "@/components/Button/Outlined";

export default function Contato() {
  const contato = useInfoStore((state) => state.contato);

  return (
    <div className="flex flex-col relative">
      <Navbar absolute />
      <div className="relative w-full bg-[#EEE] flex flex-col justify-end mb-32">
        <div className="h-[123px] w-full"></div>
        <div className="content w-full relative z-50">
          <div className="w-full flex py-36">
            <div className="xl-lg:w-[60%]">
              <h1 className="xl-lg:text-[64px] text-5xl font-['Adam'] tracking-[0.06em] font-bold mb-8">
                Entre em Contato
              </h1>
              <Typo
                typo="paragraph"
                style={{
                  fontSize: "18px",
                  lineHeight: "2",
                }}
                className="xl-lg:max-w-[600px] font-light text-dark/70 mb-[90px]"
              >
                Est libero exercitationem occaecati ducimus sit corrupti. Eos
                asperiores qui porro facere quis velit. Iure magnam cupiditate
                et minima dolores iste.
              </Typo>
              <div className="flex xl-lg:gap-main gap-2">
                <Button
                  style={{
                    fontSize: "18px",
                  }}
                  className="min-w-[267px]"
                >
                  Enviar Mensagem
                </Button>
                <GhostButton
                  style={{
                    fontSize: "18px",
                  }}
                  className="min-w-[169px] hover:bg-opacity-20"
                >
                  Voltar
                </GhostButton>
              </div>
            </div>
          </div>
        </div>
        <img
          src="/images/background/contato.jpg"
          className="absolute top-0 right-0 w-[50vw] h-full object-scale-down object-right-bottom xl-lg:block hidden"
          alt="background"
          loading="eager"
        />
      </div>
      <div className="w-full mb-[250px]">
        <div className="content w-full flex flex-col gap-48">
          <CTA
            title="Venha nos conhecer"
            subtitle="Nosso endereço"
            link={{
              label: "Vinhedo, São Paulo 13280168, BR",
              href: "https://maps.app.goo.gl/y4QbqLAiceuuVnpt8",
            }}
            image={
              <iframe
                className="w-full h-full absolute top-0 left-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117486.80135974068!2d-47.07295625420295!3d-23.04349805682956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf32972381d79d%3A0x1dd8779027018146!2sVinhedo%2C%20SP%2C%2013280-000!5e0!3m2!1spt-BR!2sbr!4v1707251754335!5m2!1spt-BR!2sbr"
              />
            }
            orientation="left"
          >
            Est libero exercitationem occaecati ducimus sit corrupti. Eos
            asperiores qui porro facere quis velit. Iure magnam cupiditate et
            minima dolores iste. Autem debitis vel porro itaque voluptatem.
          </CTA>
          <CTA
            title="Mande mensagem"
            subtitle="Nosso Whatsapp"
            link={{
              label: "Whatsapp - (47) 9 99625 9340",
              href: "https://wa.me/479996259340",
            }}
            image={
              <Image
                src="/images/banner/whatsapp.jpg"
                alt="whatsapp phone app"
                layout="fill"
                className="object-cover undraggable unselectable"
              />
            }
            orientation="right"
          >
            Est libero exercitationem occaecati ducimus sit corrupti. Eos
            asperiores qui porro facere quis velit. Iure magnam cupiditate et
            minima dolores iste. Autem debitis vel porro itaque voluptatem.
          </CTA>
        </div>
      </div>
      <div className="min-h-[621px] w-full relative">
        <Image
          src="/images/background/forms.jpg"
          alt="Contato forms"
          layout="fill"
          className="object-cover undraggable unselectable"
        />
        <div className="py-24 relative z-30 text-center text-white">
          <h2 className="text-5xl mb-2 uppercase mix-blend-overlay">
            Entre em <b>Contato</b>
          </h2>
          <p className="text-[18px] font-light text-opacity-70">
            Nós iremos responder suas perguntas e questões.
          </p>
        </div>
        <div className="w-full flex justify-center">
          <Forms />
        </div>
      </div>
      <div className="w-full h-[40vh]" />
    </div>
  );
}

export function Forms() {
  return (
    <div className="flex gap-main content xl-lg:w-1/2 overflow-hidden xl-lg:rounded-[0px] absolute mx-auto z-50 bg-white shadow-xl">
      <form className="flex-1 xl-lg:px-16 py-10 px-10">
        <div className="mb-12">
          <p className="text-[18px] font-light">
            Envie-nos uma mensagem e nós iremos responder suas perguntas e
            questões.
          </p>
        </div>

        <div className="flex flex-col gap-[5px] mb-12">
          <div className="flex gap-main">
            <div className="flex-1">
              <Input required type="text" name="name" placeholder="Nome" />
            </div>
            <div className="flex-1">
              <Input
                required
                type="email"
                name="email"
                placeholder="Email"
                className="mb-6"
              />
            </div>
          </div>

          <div>
            <Input
              type="text"
              required
              name="subject"
              placeholder="Assunto"
              className="mb-6"
            />
          </div>

          <textarea
            name="message"
            required
            placeholder="Mensagem"
            className="w-full h-[200px] p-4 rounded-[10px] border-2 border-dark/20 focus:border-primary outline-none resize-none"
          ></textarea>
        </div>
        <div className="flex xl-lg:gap-main gap-2 max-h-14">
          <Button
            style={{
              fontSize: "18px",
            }}
            className="min-w-[267px]"
          >
            Enviar Mensagem
          </Button>
          <OutlinedButton
            style={{
              fontSize: "18px",
            }}
            className="min-w-[169px]"
          >
            Cancelar
          </OutlinedButton>
        </div>
      </form>
    </div>
  );
}

function Input({
  className,
  innerRef,
  onChange,
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  innerRef?: React.RefObject<HTMLInputElement>;
}) {
  const [error, setError] = useState(false);

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value) {
      setError(false);
    } else if (e.target.required) {
      setError(true);
    }
    onChange && onChange(e);
  }

  return (
    <>
      <input
        {...props}
        onChange={handleOnChange}
        ref={innerRef}
        className={
          "mb-2 w-full py-3 border-2 border-dark/20 focus:border-primary outline-none rounded-[10px] px-4 " +
          className +
          (error ? " invalid" : "")
        }
      />
    </>
  );
}
