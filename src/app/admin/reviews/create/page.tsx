"use client";

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
import { reviewsService } from "@/services/reviews";
import dynamic from "next/dynamic";
import { Typo } from "@/components/Typo";
import { useErrorStore } from "@/store/error";
import { useRouter } from "next/navigation";
import { Review } from "@/components/Reviews";

export default function Reviews() {
  const [preview, setPreview] = useState<boolean>(false);
  const pushError = useErrorStore((state) => state.pushError);
  const { push } = useRouter();

  const [imageURL, setImageURL] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const starRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

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

    const nameValue = nameRef.current?.value;
    const descriptionValue = descriptionRef.current?.value;
    const locationValue = locationRef.current?.value;
    const starValue = starRef.current?.value;
    const imageValue = imageRef.current?.files?.[0];

    const isValid = nameValue && descriptionValue && locationValue && starValue;

    if (!isValid) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    const formData = new FormData();

    formData.append("name", nameValue);
    formData.append("description", descriptionValue);
    formData.append("location", locationValue);
    formData.append("star", starValue);

    if (imageValue) formData.append("image", imageValue);

    await reviewsService
      .create(formData)
      .then(() => {
        push("/admin/reviews");
      })
      .catch((err) => {
        pushError({
          message: err?.response?.data?.message || "Erro ao criar review",
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
                  <Review
                    name={nameRef.current?.value || ""}
                    description={descriptionRef.current?.value || ""}
                    star={Number(starRef.current?.value) || 0}
                    location={locationRef.current?.value || ""}
                    image={imageURL || "/static/img/placeholder.png"}
                  />
                  <div className="h-96"></div>
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
              Novo Review
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
                  innerRef={nameRef}
                  label="Nome"
                  name="name"
                  required
                />
              </div>
              <div className="flex gap-main">
                <CreateInput
                  name="location"
                  label="Localização"
                  innerRef={locationRef}
                  required
                />
                <CreateInput
                  name="star"
                  innerRef={starRef}
                  label="Estrelas"
                  required
                  step="0.1"
                  type="number"
                />
              </div>
              <div>
                <label className="mb-4 block">Descrição:</label>
                <textarea
                  name="description"
                  ref={descriptionRef}
                  className="w-full border-2 border-gray-300 p-2 rounded-md resize-none h-[200px] focus:border-primary outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-[2px]">
                <label
                  htmlFor="upload-photo"
                  className="relative w-[200px] h-[200px] bg-gray-300 rounded-xl cursor-pointer group overflow-hidden"
                >
                  <div className="w-full h-full absolute z-30 top-0 left-0 bg-black/25 center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-2xl text-white font-bold text-center">
                      Adicionar Imagem
                    </p>
                  </div>
                  <Image
                    src={imageURL || "/static/img/placeholder.png"}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:grayscale transition-all duration-300"
                    alt="Imagem do review"
                  />
                </label>
                <input
                  name="image"
                  type="file"
                  id="upload-photo"
                  ref={imageRef}
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
