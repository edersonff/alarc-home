"use client";

import { PostType } from "@/@types/Post";
import { PostCard } from "@/app/noticias/page";
import Block from "@/components/Admin/Block";
import Button from "@/components/Button";
import OutlinedButton from "@/components/Button/Outlined";
import Drawer from "@/components/Drawer";
import Input from "@/components/Input";
import { Typo } from "@/components/Typo";
import AdminLayout from "@/layout/admin";
import { useInfoStore } from "@/store/info";
import React, {
  ChangeEvent,
  FormEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import { TiPlus } from "react-icons/ti";
import ReactQuill from "react-quill";

import Image from "next/image";
import { postsService } from "@/services/posts";
import dynamic from "next/dynamic";

export default function Posts() {
  const [post, setPost] = React.useState<string | null>(null);
  const posts = useInfoStore((state) => state.posts);

  const editPost = useMemo(() => {
    const findPost = posts.find((p) => p.slug === post);

    if (findPost) {
      return findPost;
    }

    return null as any;
  }, [post, posts]);

  function onCloseDrawer() {
    setPost(null);
  }

  return (
    <AdminLayout>
      <PostEdit
        slug={post}
        open={post !== null}
        post={editPost}
        onClose={onCloseDrawer}
      />
      <div className="flex flex-gap w-full gap-main">
        <div className="flex-1 flex flex-col gap-main">
          <Block>
            <div className="w-full mb-11 flex justify-between">
              <div>
                <Typo typo="blockTitle" className="mb-1">
                  Últimos Posts
                </Typo>
                <p className="text-gray-600">
                  Os últimos posts publicados no blog.
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
            <div className="flex flex-col gap-main">
              {posts.map((post) => (
                <div key={post.slug} className="relative w-full">
                  <div className="absolute right-1 top-1 z-30 flex gap-[15px]">
                    <OutlinedButton
                      onClick={() => setPost(post.slug)}
                      className="min-w-max text-xs py-[10px]"
                    >
                      Editar
                    </OutlinedButton>
                    <OutlinedButton className="min-w-max text-xs py-[10px] border-red-600 text-red-600 hover:bg-red-600/15">
                      Excluir
                    </OutlinedButton>
                  </div>
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          </Block>
        </div>
      </div>
    </AdminLayout>
  );
}

function PostEdit({
  open,
  post,
  slug: selectedSlug,
  onClose,
}: {
  open: boolean;
  post: PostType;
  slug: string | null;
  onClose: () => void;
}) {
  const [imageURL, setImageURL] = useState<string | null>(post?.image);
  const title = useRef<HTMLInputElement>(null);
  const slug = useRef<HTMLInputElement>(null);
  const owner = useRef<HTMLInputElement>(null);
  const tags = useRef<HTMLInputElement>(null);
  const date = useRef<HTMLInputElement>(null);
  const text = useRef<ReactQuill>(null);
  const image = useRef<HTMLInputElement>(null);

  const ReactQuill: any = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  function onChangeImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImageURL(e.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const titleValue = title.current?.value;
    const slugValue = slug.current?.value;
    const ownerValue = owner.current?.value;
    const tagsValue = tags.current?.value;
    const dateValue = date.current?.value;
    const textValue = text.current?.getEditor().getText();
    const imageValue = image.current?.files?.[0];

    const isValid =
      titleValue && slugValue && tagsValue && dateValue && textValue;

    if (!isValid || !selectedSlug) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    const formData = new FormData();

    formData.append("title", titleValue);
    formData.append("slug", slugValue);
    formData.append("tags", tagsValue);
    formData.append("date", dateValue);
    formData.append("text", textValue);

    if (imageValue) formData.append("image", imageValue);
    if (ownerValue) formData.append("owner", ownerValue);

    await postsService.update(selectedSlug, formData);
  }

  return (
    <Drawer open={open} onClose={onClose}>
      <div className="w-full px-12 py-8 bg-white">
        <h2 className="text-2xl font-bold">Editar Post:</h2>
        <div className="flex gap-main mt-6">
          <form onSubmit={onSubmit} className="flex-1 flex flex-col gap-main">
            <EditInput
              innerRef={title}
              label="Título"
              defaultValue={post?.title}
              required
            />
            <EditInput innerRef={slug} label="Slug" defaultValue={post?.slug} />
            <EditInput
              innerRef={owner}
              label="Dono"
              defaultValue={post?.owner}
            />
            <EditInput
              label="Categorias"
              innerRef={tags}
              defaultValue={post?.tags.join(", ")}
              required
            />
            <EditInput
              innerRef={date}
              label="Data de Publicação"
              defaultValue={post?.date}
              required
            />
            <ReactQuill ref={text} theme="snow" value={post?.text} />;
            <div className="flex flex-col gap-[2px]">
              <label
                htmlFor="upload-photo"
                className="relative w-full h-[200px] bg-gray-300 rounded-xl cursor-pointer group overflow-hidden"
              >
                <div className="w-full h-full absolute z-30 top-0 left-0 bg-black/25 center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-2xl text-white font-bold">
                    Adicionar Imagem
                  </p>
                </div>
                <Image
                  src={imageURL || "/static/img/placeholder.png"}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:grayscale transition-all duration-300"
                  alt={post?.title}
                />
              </label>
              <input
                type="file"
                id="upload-photo"
                ref={image}
                onChange={onChangeImage}
                className="w-full border border-gray-300 p-2 rounded-md hidden"
              />
            </div>
            <Button className="w-full py-[12px]">Salvar</Button>
          </form>
        </div>
      </div>
    </Drawer>
  );
}

function EditInput({
  label,
  defaultValue,
  innerRef,
  required,
}: {
  label: string;
  defaultValue?: string;
  innerRef?: any;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-[2px]">
      <label>{label}:</label>
      <Input
        innerRef={innerRef}
        defaultValue={defaultValue}
        required={required}
        className="w-full border border-gray-300 p-2 rounded-md"
      />
    </div>
  );
}
