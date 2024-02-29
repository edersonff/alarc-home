import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { useInfoStore } from "@/store/info";

export default function Footer() {
  const pages = useInfoStore((state) => state.pages);

  return (
    <footer className="content-container border-t border-t-neutral-200 mt-[7%]">
      <div className="mx-auto w-full content p-4 py-6 lg:py-12">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="#" className="flex items-center">
              <Image
                src="/alarc/logo-without-text.svg"
                width={32}
                height={32}
                className="me-3"
                alt="FlowBite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap font-['Adam'] ">
                Alarc
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-14 sm:grid-cols-3">
            <div>
              <h2 className="mb-7 text-sm font-semibold text-gray-900 uppercase ">
                Recursos
              </h2>
              <ul className="text-gray-500 font-medium text-sm">
                {pages.map((page) => (
                  <li key={page.title} className="mb-5">
                    <Link href={page.href} className="hover:underline">
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-7 text-sm font-semibold text-gray-900 uppercase ">
                Contato
              </h2>
              <ul className="text-gray-500 font-medium text-sm">
                <li>
                  <Link href="/contact#forms" className="hover:underline">
                    Formulário
                  </Link>
                </li>
                <li className="my-5">
                  <Link
                    href="https://maps.app.goo.gl/y4QbqLAiceuuVnpt8"
                    target="_blank"
                    className="hover:underline"
                  >
                    Endereço
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://wa.me/479996259340"
                    className="hover:underline"
                  >
                    WhatsApp
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-7 text-sm font-semibold text-gray-900 uppercase ">
                Siga-nos
              </h2>
              <ul className="text-gray-500 font-medium text-sm">
                <li className="my-5">
                  <Link href={"#"} target="_blank" className="hover:underline ">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href={"#"} target="_blank" className="hover:underline">
                    Facebook
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <p className="p-small">
            © {2018}-{new Date().getFullYear()}{" "}
            <Link href="/" className="text-gray-900 hover:underline">
              Alarc
            </Link>
            . Todos os direitos reservados.
          </p>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <SocialFooterItem
              type="facebook"
              href="https://www.facebook.com/"
            />
            <SocialFooterItem
              type="instagram"
              href="https://www.instagram.com/"
            />
            <SocialFooterItem type="twitter" href="https://twitter.com/" />
            <SocialFooterItem
              type="linkedin"
              href="https://www.linkedin.com/company/alarc-br"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SocialFooterItem({
  type,
  href,
}: {
  type: "facebook" | "twitter" | "instagram" | "linkedin";
  href: string;
}) {
  const Icon = useMemo(() => {
    const icons = {
      facebook: <FaFacebook />,
      twitter: <BsTwitter />,
      instagram: <BsInstagram />,
      linkedin: <FaLinkedinIn />,
    };
    return icons[type];
  }, [type]);

  return (
    <Link
      target="_blank"
      href={href}
      className="text-gray-500 hover:text-gray-900  ms-5"
    >
      {Icon}
      <span className="sr-only">{type} page</span>
    </Link>
  );
}
