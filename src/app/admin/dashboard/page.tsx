"use client";

import { PostBanner } from "@/app/noticias/page";
import Block from "@/components/Admin/Block";
import Summary from "@/components/Admin/Summary";
import Button from "@/components/Button";
import { Typo } from "@/components/Typo";
import AdminLayout from "@/layout/admin";
import { useInfoStore } from "@/store/info";
import React from "react";
import { IoIosPaper } from "react-icons/io";
import { TiPlus } from "react-icons/ti";
import colors from "tailwindcss/colors";
import { MdRateReview } from "react-icons/md";
import { Review } from "@/components/Reviews";

export default function Dashboard() {
  const [posts, reviews] = useInfoStore((state) => [
    state.posts,
    state.reviews,
  ]);
  return (
    <AdminLayout>
      <div className="flex flex-gap xl-lg:flex-row flex-col w-full gap-main">
        <div className="flex-1 flex flex-col gap-main">
          <Block>
            <div className="w-full mb-12 pb-8 border-b border-neutral-200 flex justify-between">
              <div>
                <Typo typo="block-title" className="mb-2">
                  Últimos Posts
                </Typo>
                <p className="text-gray-600">
                  Os últimos três posts publicados no blog.
                </p>
              </div>
              <div>
                <Button
                  href="/admin/posts/create"
                  className="text-[15px] py-[9.9px] rounded-lg"
                  target=""
                >
                  <TiPlus className="text-2xl mr-1" />
                  Novo
                </Button>
              </div>
            </div>
            <div className="flex xl-lg:h-48 xl-lg:flex-row flex-col gap-main">
              <PostBanner {...posts[0]} />
              <PostBanner {...posts[1]} />
              <PostBanner {...posts[2]} />
            </div>
          </Block>

          <Block>
            <div className="w-full mb-16 pb-8 border-b border-neutral-200 flex justify-between">
              <div>
                <Typo typo="block-title" className="mb-2">
                  Avaliações
                </Typo>
                <p className="text-gray-600">
                  As últimas avaliações registradas no site.
                </p>
              </div>
              <div>
                <Button
                  href="/admin/reviews/create"
                  className="text-[15px] py-[9.9px] rounded-lg"
                  target=""
                >
                  <TiPlus className="text-2xl mr-1" />
                  Novo
                </Button>
              </div>
            </div>
            <div className="flex gap-main xl-lg:flex-row flex-col">
              <Review {...reviews[0]} />
              <Review {...reviews[1]} />
            </div>
          </Block>
        </div>

        <div className="w-full flex flex-col gap-main">
          <Block>
            <Typo typo="block-title" className="mb-6">
              Resumos
            </Typo>
            <div className="flex flex-col gap-main">
              <Summary
                color={colors.black}
                Icon={IoIosPaper}
                number={posts.length}
                label="Posts"
              />
              <Summary
                color="#55604e"
                Icon={MdRateReview}
                number={reviews.length}
                label="Availiações"
              />
              <Summary
                color="#92CC5C"
                Icon={IoIosPaper}
                number={12}
                label="Posts"
              />
            </div>
          </Block>
          <Block>Nothing</Block>
        </div>
      </div>
    </AdminLayout>
  );
}
