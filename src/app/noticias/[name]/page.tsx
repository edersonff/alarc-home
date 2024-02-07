"use client";

import { PostType } from "@/@types/Post";
import Navbar from "@/components/Navbar";
import { Typo } from "@/components/Typo";
import Image from "@/components/Image";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import { useInfoStore } from "@/store/info";

export default function Blog({ params }: { params: { name: string } }) {
  const posts = useInfoStore((state) => state.posts);

  const post = useMemo(() => {
    return posts.find((post) => post.slug === params.name) as PostType;
  }, [params.name, posts]);

  useEffect(() => {
    if (!post) {
      window.location.href = "/noticias";
    }
  }, [post]);

  return (
    <div className="flex flex-col gap-12 mb-24">
      <Navbar />
      <div className="w-full center flex-col">
        <div className="px-10 py-2.5 bg-green-400 bg-opacity-20 rounded-full mb-6 text-green-400 text-[13px] font-semibold uppercase tracking-wide">
          <span>E-commerce</span>
        </div>
        <div className="mb-12 text-center">
          <Typo typo="post" className="mb-3">
            {post.title}
          </Typo>
          <Typo typo="date">
            {post.date} - <b>{post.owner}</b>
          </Typo>
        </div>
        <div className="content w-full">
          <div className="min-h-[400px] mb-[68px] w-full relative rounded-[22px] overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="object-center"
            />
          </div>
          <div className="w-full flex xl-lg:flex-row flex-col-reverse xl-lg:gap-main gap-14">
            <div className="xl-lg:w-1/4">
              <p className="text-[15px] font-bold tracking-wide mb-[18px]">
                Compartilhar Artigo
              </p>
              <div className="flex gap-9">
                <Link
                  target="_blank"
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://alarc.com.br/noticias/${post.slug}`}
                >
                  <Image
                    src="/images/social/facebook.svg"
                    alt="Facebook"
                    width={30}
                    height={30}
                    className="cursor-pointer unselectable"
                  />
                </Link>
                <Link
                  target="_blank"
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=https://alarc.com.br/noticias/${post.slug}`}
                >
                  <Image
                    src="/images/social/linkedin.svg"
                    alt="Linkedin"
                    width={30}
                    height={30}
                    className="cursor-pointer unselectable"
                  />
                </Link>
                <Link
                  target="_blank"
                  href={`https://wa.me/?text=https://alarc.com.br/noticias/${post.slug}`}
                >
                  <Image
                    src="/images/social/whatsapp.svg"
                    alt="Whatsapp"
                    width={30}
                    height={30}
                    className="cursor-pointer unselectable"
                  />
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <Typo typo="paragraph">{post.text}</Typo>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
