"use client";

import { PostType } from "@/@types/Post";
import { PostCard } from "@/app/noticias/page";
import Block from "@/components/Admin/Block";
import Button from "@/components/Button";
import OutlinedButton from "@/components/Button/Outlined";
import Drawer from "@/components/Drawer";
import Input from "@/components/Input";

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
import Modal from "@/components/Modal";
import { useErrorStore } from "@/store/error";

export default function Posts() {
  const [updatePost, setUpdatePost] = useState<string | null>(null);
  const [deletePost, setDeletePost] = useState<string | null>(null);
  const posts = useInfoStore((state) => state.posts);

  const editPost = useMemo(() => {
    const findPost = posts.find((p) => p.slug === updatePost);

    if (findPost) {
      return findPost;
    }

    return null as any;
  }, [updatePost, posts]);

  function onCloseDrawer() {
    setUpdatePost(null);
  }

  return (
    <AdminLayout>
      <PostEdit
        slug={updatePost}
        open={updatePost !== null}
        post={editPost}
        onClose={onCloseDrawer}
      />
      <DeleteModal
        slug={deletePost}
        open={deletePost !== null}
        onClose={() => setDeletePost(null)}
      />
      <div className="flex flex-gap w-full gap-main">
        <div className="flex-1 flex flex-col gap-main">
          <Block>
            <div className="w-full mb-11 flex justify-between">
              <div>
                <h2 className="block-title mb-1">Últimos Posts</h2>
                <p className="text-gray-600">
                  Os últimos posts publicados no blog.
                </p>
              </div>
              <div className="flex gap-[15px] items-center">
                <Button
                  href="/admin/posts/create"
                  className="text-lg py-[12px]"
                  target=""
                >
                  <TiPlus className="text-2xl mr-1" />
                  Novo
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-main">
              {posts.map((post) => (
                <div key={post.slug} className="relative w-full">
                  <div className="absolute right-1 top-1 z-30 flex gap-[15px]">
                    <OutlinedButton
                      onClick={() => setUpdatePost(post.slug)}
                      className="min-w-max text-xs py-[9.9px]"
                    >
                      Editar
                    </OutlinedButton>
                    <OutlinedButton
                      onClick={() => setDeletePost(post.slug)}
                      className="min-w-max text-xs py-[9.9px] border-red-600 text-red-600 hover:bg-red-600/15"
                    >
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
  const pushError = useErrorStore((state) => state.pushError);

  const [imageURL, setImageURL] = useState<string | null>(null);
  const title = useRef<HTMLInputElement>(null);
  const slug = useRef<HTMLInputElement>(null);
  const owner = useRef<HTMLInputElement>(null);
  const tags = useRef<HTMLInputElement>(null);
  const date = useRef<HTMLInputElement>(null);
  const text = useRef<ReactQuill>(null);
  const image = useRef<HTMLInputElement>(null);

  const ReactQuill = useMemo(
    () =>
      dynamic(
        async () => {
          const { default: RQ } = await import("react-quill");

          type Props = {
            forwardedRef: any;
          } & ReactQuill["props"];

          const quill = ({ forwardedRef, ...props }: Props) => (
            <RQ ref={forwardedRef} {...props} />
          );

          return quill;
        },
        {
          ssr: false,
        }
      ),
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
    const textValue = text.current?.getEditor().root.innerHTML;
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

    await postsService
      .update(selectedSlug, formData)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        pushError({
          message: err?.response?.data?.message || "Erro ao salvar post.",
          status: err.status,
        });
      });
  }

  if (!post)
    return (
      <Drawer open={open} onClose={onClose}>
        <></>
      </Drawer>
    );

  return (
    <Drawer open={open} onClose={onClose}>
      <div className="w-full px-12 py-8 bg-white">
        <h2 className="text-2xl font-bold">Editar Post:</h2>
        <div className="flex gap-main mt-6">
          <form onSubmit={onSubmit} className="flex-1 flex flex-col gap-main">
            <EditInput
              innerRef={title}
              label="Título"
              defaultValue={post.title}
              required
            />
            <EditInput
              innerRef={slug}
              label="Slug"
              required
              defaultValue={post.slug}
            />
            <EditInput
              innerRef={owner}
              label="Dono"
              defaultValue={post.owner}
            />
            <EditInput
              label="Categorias"
              innerRef={tags}
              defaultValue={post.tags.join(", ")}
              required
            />
            <EditInput
              innerRef={date}
              label="Data de Publicação"
              defaultValue={post.date}
              required
            />
            <ReactQuill forwardedRef={text} theme="snow" value={post.text} />;
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
                  src={imageURL || post.image || "/static/img/placeholder.png"}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:grayscale transition-all duration-300"
                  alt={post.title}
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

function DeleteModal({
  slug,
  onClose,
  open,
}: {
  slug: string | null;
  open: boolean;
  onClose: () => void;
}) {
  const pushError = useErrorStore((state) => state.pushError);

  function onDelete() {
    if (slug) {
      postsService
        .delete(slug)
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          pushError({
            message: err?.response?.data?.message || "Erro ao deletar post.",
            status: err.status,
          });
        });
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-full min-w-[500px] px-2 pt-2">
        <h2 className="text-xl font-medium mb-2">
          Tem certeza que deseja excluir?
        </h2>
        <p className="text-gray-600">Você não poderá desfazer essa ação.</p>
        <div className="flex justify-end gap-4 mt-10">
          <button
            onClick={onClose}
            className="rounded-full text-neutral-500 border-2 border-neutral-500 hover:bg-neutral-500/15 transition-all px-6 font-bold py-[12px]"
          >
            Cancelar
          </button>
          <Button
            style={{
              fontSize: "16px",
            }}
            className="bg-red-600 py-[12px]"
            onClick={onDelete}
          >
            Excluir
          </Button>
        </div>
      </div>
    </Modal>
  );
}
