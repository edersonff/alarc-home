"use client";

import { PostType } from "@/@types/Post";
import Navbar from "@/components/Navbar";
import { Typo } from "@/components/Typo";
import Image from "@/components/Image";
import Link from "next/link";
import React, { useMemo } from "react";
import { useInfoStore } from "@/store/info";

export default function Blog() {
  const posts = useInfoStore((state) => state.posts);

  return (
    <div className="flex flex-col gap-20 mb-24">
      <Navbar />
      <div className="w-full">
        <div className="content flex xl-lg:flex-row flex-col xl-lg:h-[40vh] gap-main">
          <div className="flex-1 h-full">
            <PostBanner {...posts[0]} size={2} />
          </div>
          <div className="h-full flex xl-lg:flex-col gap-main">
            <div className="flex-1">
              <PostBanner {...posts[1]} />
            </div>
            <div className="flex-1">
              <PostBanner {...posts[2]} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="content">
          <Typo
            typo="sectionTitle"
            as="h2"
            className="text-[28px] font-bold mt-10 mb-16"
          >
            Últimos posts
          </Typo>
          <div className="flex flex-col gap-20">
            <PostCard {...posts[0]} />
            <PostCard {...posts[1]} />
            <PostCard {...posts[2]} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PostBanner({
  title,
  owner,
  date,
  image,
  slug,
  size = 1,
}: {
  size?: 1 | 2;
} & PostType) {
  const textSize = useMemo(() => {
    switch (size) {
      case 1:
        return "text-xl";
      case 2:
        return "text-[32px]";
    }
  }, [size]);

  const padding = useMemo(() => {
    switch (size) {
      case 1:
        return "p-4";
      case 2:
        return "py-6 px-10";
    }
  }, [size]);

  const height = useMemo(() => {
    switch (size) {
      case 1:
        return "h-48";
      case 2:
        return "h-64";
    }
  }, [size]);

  return (
    <Link
      href={`/noticias/${slug}`}
      className={
        "xl-lg:h-full block xl-lg:min-w-[300px] h-64 relative rounded-[22px] overflow-hidden group " +
        padding +
        " " +
        height
      }
    >
      <div className="relative z-20 w-full h-full flex flex-col justify-end">
        <h3
          className={
            "text-white group-hover:text-white/80 mb-[10px] font-medium transition-all duration-150 " +
            textSize
          }
        >
          {title}
        </h3>
        <div className="flex items-center gap-main">
          {owner && (
            <p className="px-2.5 py-1.5 bg-primary tracking-widest text-white text-[15px]">
              {owner}
            </p>
          )}
          <p className="text-white text-[15px] font-light">{date}</p>
        </div>
      </div>
      <div className="absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-black/30 to-transparent "></div>
      <Image
        src={image}
        alt={title + " image"}
        layout="fill"
        className="unselectable undraggable object-cover z-0"
      />
    </Link>
  );
}

export function PostCard({ title, slug, text, date, image }: {} & PostType) {
  return (
    <Link
      href={`/noticias/${slug}`}
      className="flex xl-lg:flex-row flex-col w-full relative group gap-main min-h-72 "
    >
      <div className="xl-lg:min-w-[450px] min-w-full xl-lg:min-h-fit min-h-[300px] overflow-hidden relative rounded-[22px]">
        <div className="w-full h-full absolute bg-white bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-150" />
        <Image
          src={image}
          alt={title + " image"}
          layout="fill"
          className="unselectable undraggable object-cover z-10"
        />
      </div>
      <div className="flex-1">
        <Typo
          typo="agency"
          as="h3"
          className="mb-2 text-[26px] group-hover:text-dark transition-all duration-150"
        >
          {title}
        </Typo>
        <p className="mb-6 text-[15px] font-medium text-dark/30">{date}</p>
        <Typo typo="paragraph" className="text-[18px]">
          {text}
        </Typo>
      </div>
    </Link>
  );
}
