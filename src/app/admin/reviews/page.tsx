"use client";

import { PostType } from "@/@types/Post";
import { PostCard } from "@/app/noticias/page";
import Block from "@/components/Admin/Block";
import Button from "@/components/Button";
import OutlinedButton from "@/components/Button/Outlined";
import { Review } from "@/components/Reviews";
import { Typo } from "@/components/Typo";
import AdminLayout from "@/layout/admin";
import { useInfoStore } from "@/store/info";
import React from "react";
import { TiPlus } from "react-icons/ti";

export default function Reviews() {
  const reviews = useInfoStore((state) => state.reviews);
  return (
    <AdminLayout>
      <div className="flex flex-gap w-full gap-main">
        <div className="flex-1 flex flex-col gap-main">
          <Block>
            <div className="w-full mb-11 flex flex-wrap gap-5 justify-between">
              <div>
                <Typo typo="blockTitle" className="mb-1">
                  Últimos Avaliações
                </Typo>
                <p className="text-gray-600">
                  As últimas avaliações publicadas no blog.
                </p>
              </div>
              <div className="flex gap-[15px] items-center">
                <Button
                  href="/admin/blog/create"
                  className="text-lg py-[12px]"
                  target=""
                >
                  <TiPlus className="text-2xl" />
                  Novo
                </Button>
              </div>
            </div>
            <div className="flex gap-main flex-wrap flex-50% justify-between">
              {reviews.map((review) => (
                <div
                  key={review.name}
                  className="relative w-full xl-lg:w-[48%]"
                >
                  <div className="absolute right-1 top-1 z-50 flex gap-[15px]">
                    <OutlinedButton className="min-w-max text-xs py-[10px]">
                      Editar
                    </OutlinedButton>
                    <OutlinedButton className="min-w-max text-xs py-[10px] border-red-600 text-red-600 hover:bg-red-600/15">
                      Excluir
                    </OutlinedButton>
                  </div>
                  <Review {...review} />
                </div>
              ))}
            </div>
          </Block>
        </div>
      </div>
    </AdminLayout>
  );
}
