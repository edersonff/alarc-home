"use client";

import { PostBanner, PostCard } from "@/app/noticias/page";
import Block from "@/components/Admin/Block";
import Button from "@/components/Button";
import Input from "@/components/Input";
import AdminLayout from "@/layout/admin";
import React, {
  ChangeEvent,
  FormEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactQuill from "react-quill";
import colors from "tailwindcss/colors";
import Image from "next/image";
import { postsService } from "@/services/posts";
import dynamic from "next/dynamic";
import { Typo } from "@/components/Typo";
import { useErrorStore } from "@/store/error";
import { useRouter } from "next/navigation";

export default function Posts() {
  const [preview, setPreview] = useState<boolean>(false);
  const pushError = useErrorStore((state) => state.pushError);
  const { push } = useRouter();

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

  function onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const slugValue = value
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    if (slug.current) {
      slug.current.value = slugValue;
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

    if (!isValid) {
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
      .create(formData)
      .then(() => {
        push("/admin/posts");
      })
      .catch((err) => {
        pushError({
          message: err?.response?.data?.message || "Erro ao criar post",
          status: err.status,
        });
      });
  }
  return (
    <AdminLayout>
      <div className="flex flex-gap w-full gap-main">
        <div className="flex-1 flex flex-col gap-main">
          <Block>
            {preview && (
              <>
                <div className="w-full flex justify-between items-center">
                  <Typo typo="block-title" as="h2" className="mb-8">
                    Preview
                  </Typo>
                  <Button
                    type="button"
                    style={{
                      backgroundColor: colors.neutral[400],
                    }}
                    className="py-[12px]"
                    onClick={() => setPreview(false)}
                  >
                    Editar
                  </Button>
                </div>
                <div className="flex flex-col gap-main">
                  <PostCard
                    title={title.current?.value || ""}
                    slug={slug.current?.value || ""}
                    date={date.current?.value || ""}
                    owner={owner.current?.value || ""}
                    tags={tags.current?.value?.split(",") || []}
                    text={text.current?.getEditor().root.innerHTML || ""}
                    image={imageURL || "/static/img/placeholder.png"}
                  />
                  <div className="h-96">
                    <PostBanner
                      title={title.current?.value || ""}
                      slug={slug.current?.value || ""}
                      date={date.current?.value || ""}
                      owner={owner.current?.value || ""}
                      tags={tags.current?.value?.split(",") || []}
                      text={text.current?.getEditor().root.innerHTML || ""}
                      image={imageURL || "/static/img/placeholder.png"}
                    />
                  </div>
                </div>
              </>
            )}
            <Typo
              style={{
                display: preview ? "none" : "block",
              }}
              typo="block-title"
              as="h2"
              className="mb-8"
            >
              Novo Post
            </Typo>
            <form
              style={{
                display: preview ? "none" : "flex",
              }}
              onSubmit={onSubmit}
              className="flex-1 flex flex-col gap-main"
            >
              <div className="flex gap-main">
                <CreateInput
                  innerRef={title}
                  label="Título"
                  name="title"
                  required
                  onChange={onChangeTitle}
                />
                <CreateInput
                  name="slug"
                  innerRef={slug}
                  label="Slug"
                  required
                />
              </div>
              <div className="flex gap-main">
                <CreateInput
                  name="tags"
                  label="Categorias"
                  innerRef={tags}
                  required
                />
                <CreateInput
                  name="date"
                  innerRef={date}
                  label="Data de Publicação"
                  required
                />
              </div>

              <CreateInput name="owner" innerRef={owner} label="Dono" />

              <ReactQuill
                forwardedRef={text}
                theme="snow"
                style={{
                  height: "400px",
                  borderRadius: "5px",
                  marginBottom: "60px",
                }}
              />

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
                    alt="Imagem do post"
                  />
                </label>
                <input
                  name="image"
                  type="file"
                  id="upload-photo"
                  ref={image}
                  onChange={onChangeImage}
                  className="w-full border border-gray-300 p-2 rounded-md hidden"
                />
              </div>
              <div className="flex gap-5">
                <Button type="submit" className="py-[12px]">
                  Salvar
                </Button>
                <Button
                  type="button"
                  style={{
                    backgroundColor: colors.neutral[400],
                  }}
                  className="py-[12px]"
                  onClick={() => setPreview(true)}
                >
                  Preview
                </Button>
              </div>
            </form>
          </Block>
        </div>
      </div>
    </AdminLayout>
  );
}

function CreateInput({
  label,
  innerRef,
  ...props
}: {
  label: string;
  innerRef?: any;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col flex-1 gap-[2px]">
      <label>{label}:</label>
      <Input
        innerRef={innerRef}
        {...props}
        className="w-full border border-gray-300 p-2 rounded-md"
      />
    </div>
  );
}
