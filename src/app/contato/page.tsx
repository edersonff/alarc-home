"use client";

import Navbar from "@/components/Navbar";
import { Typo } from "@/components/Typo";
import Image from "@/components/Image";
import React, { useEffect, useRef, useState } from "react";
import { useInfoStore } from "@/store/info";
import GhostButton from "@/components/Button/Ghost";
import Button from "@/components/Button";
import CTA from "@/components/CTA";
import OutlinedButton from "@/components/Button/Outlined";
import { emailService } from "@/services/email";
import { useErrorStore } from "@/store/error";
import Lottie, { LottieRef } from "lottie-react";
import emailAnim from "@/../public/static/lottie/email.json";
import Link from "next/link";
import Footer from "@/components/Footer";
import Show from "@/components/Show";

export default function Contato() {
  const contato = useInfoStore((state) => state.contato);

  return (
    <div className="flex flex-col relative">
      <Navbar absolute />
      <div className="relative w-full bg-[#EEE] flex flex-col justify-end">
        <div className="h-[123px] w-full"></div>
        <div className="w-full">
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
                <div className="flex xl-lg:flex-row flex-col xl-lg:gap-main gap-2">
                  <Button
                    style={{
                      fontSize: "18px",
                    }}
                    href="#forms"
                    target="_self"
                    className="min-w-[267px] center"
                  >
                    Enviar Mensagem
                  </Button>
                  <GhostButton
                    style={{
                      fontSize: "18px",
                    }}
                    target="_self"
                    href="/"
                    as={Link}
                    className="min-w-[169px] center hover:bg-opacity-20"
                  >
                    Voltar
                  </GhostButton>
                </div>
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
      <div className="w-full my-[230px]">
        <div className="content w-full flex flex-col gap-48">
          <Show>
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
          </Show>
          <Show>
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
          </Show>
        </div>
      </div>
      <div className="xl-lg:min-h-[621px] w-full relative" id="forms">
        <Image
          src="/images/background/forms.jpg"
          alt="Contato forms"
          layout="fill"
          className="object-cover undraggable unselectable"
        />
        <div className="py-24 relative z-30 text-center text-white">
          <h2 className="text-5xl mb-4 uppercase mix-blend-overlay">
            Entre em <b>Contato</b>
          </h2>
          <p className="text-[16px] font-light text-opacity-70">
            Nós iremos responder suas perguntas e questões.
          </p>
        </div>
        <div className="w-full flex justify-center">
          <Forms />
        </div>
      </div>
      <div className="w-full h-[40vh]" />
      <Footer />
    </div>
  );
}

export function Forms() {
  const { pushError } = useErrorStore();

  const subjectRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const [loading, setLoading] = useState(false);

  const resetButton = useRef<HTMLButtonElement>(null);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const subject = subjectRef.current?.value;
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const message = messageRef.current?.value;

    if (subject && name && email && message) {
      setLoading(true);

      await emailService.send({
        subject,
        name,
        email,
        message,
      });

      setLoading(false);

      pushError({
        message: "Mensagem enviada com sucesso!",
        status: 200,
      });

      resetButton.current?.click();
    }
  };

  return (
    <div className="flex content w-full overflow-hidden xl-lg:absolute mx-auto z-50 rounded-2xl bg-white shadow-lg shadow-black/5">
      <div className="center xl-lg:px-20 border-r border-r-neutral-200">
        <Image
          src="/images/illustrations/email.svg"
          alt="Email illustration"
          width={300}
          height={300}
          className="object-contain"
        />
      </div>
      <form onSubmit={sendEmail} className="flex-1 py-12 px-16">
        {loading ? (
          <div className="w-full h-full center">
            <Lottie
              loop={false}
              animationData={emailAnim}
              style={{
                width: "200px",
                height: "200px",
              }}
            />
          </div>
        ) : (
          <>
            <div className="mb-10">
              <p className="text-[16px] font-light">
                Envie-nos uma mensagem e nós iremos responder suas perguntas e
                questões.
              </p>
            </div>

            <div className="flex flex-col gap-[5px] mb-12">
              <div className="flex gap-3 xl-lg:flex-row flex-col">
                <div className="flex-1">
                  <Input
                    innerRef={nameRef}
                    required
                    type="text"
                    name="name"
                    placeholder="Nome"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    innerRef={emailRef}
                    required
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="mb-3"
                  />
                </div>
              </div>

              <div>
                <Input
                  innerRef={subjectRef}
                  type="text"
                  required
                  name="subject"
                  placeholder="Assunto"
                  className="mb-3"
                />
              </div>

              <textarea
                ref={messageRef}
                name="message"
                required
                placeholder="Mensagem"
                className="w-full h-[200px] p-4 rounded-[10px] border-2 bg-white border-dark/20 focus:border-primary outline-none resize-none"
              ></textarea>
            </div>
            <div className="flex xl-lg:flex-row flex-col xl-lg:gap-main gap-2 xl-lg:max-h-14">
              <Button className="min-w-[267px] flex-1" type="submit">
                Enviar Mensagem
              </Button>
              <OutlinedButton
                innerRef={resetButton}
                className="min-w-[169px]"
                type="reset"
              >
                Cancelar
              </OutlinedButton>
            </div>
          </>
        )}
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
          "mb-2 w-full py-2.5 border-2 border-dark/20 bg-white focus:border-primary outline-none rounded-[10px] px-4 " +
          className +
          (error ? " invalid" : "")
        }
      />
    </>
  );
}
