"use client";

import { ReviewType } from "@/@types/Review";
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

import Image from "next/image";
import { reviewsService } from "@/services/reviews";
import Modal from "@/components/Modal";
import { useErrorStore } from "@/store/error";
import { Review } from "@/components/Reviews";

export default function Reviews() {
  const [updateReview, setUpdateReview] = useState<number | null>(null);
  const [deleteReview, setDeleteReview] = useState<number | null>(null);
  const reviews = useInfoStore((state) => state.reviews);

  const editReview = useMemo(() => {
    const findReview = reviews.find((_p, i) => i === updateReview);

    if (findReview) {
      return findReview;
    }

    return null as any;
  }, [updateReview, reviews]);

  function onCloseDrawer() {
    setUpdateReview(null);
  }

  return (
    <AdminLayout>
      <ReviewEdit
        id={updateReview}
        open={updateReview !== null}
        review={editReview}
        onClose={onCloseDrawer}
      />
      <DeleteModal
        id={deleteReview}
        open={deleteReview !== null}
        onClose={() => setDeleteReview(null)}
      />
      <div className="flex flex-gap w-full gap-main">
        <div className="flex-1 flex flex-col gap-main">
          <Block>
            <div className="w-full mb-11 flex justify-between">
              <div>
                <Typo typo="block-title" className="mb-1">
                  Últimas Avaliações
                </Typo>
                <p className="text-gray-600">
                  Os últimos avaliações registradas.
                </p>
              </div>
              <div className="flex gap-[15px] items-center">
                <Button
                  href="/admin/reviews/create"
                  className="text-lg py-[12px]"
                  target=""
                >
                  <TiPlus className="text-2xl mr-1" />
                  Novo
                </Button>
              </div>
            </div>

            <div className="flex gap-main flex-wrap flex-50% justify-between">
              {reviews.map((review, id) => (
                <div
                  key={review.name}
                  className="relative w-full xl-lg:w-[48%]"
                >
                  <div className="absolute right-1 top-1 z-10 flex gap-[15px]">
                    <OutlinedButton
                      onClick={() => setUpdateReview(id)}
                      className="min-w-max text-xs py-[9.9px]"
                    >
                      Editar
                    </OutlinedButton>
                    <OutlinedButton
                      onClick={() => setDeleteReview(id)}
                      className="min-w-max text-xs py-[9.9px]border-red-600 text-red-600 hover:bg-red-600/15"
                    >
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

function ReviewEdit({
  open,
  review,
  id: selectedId,
  onClose,
}: {
  open: boolean;
  review: ReviewType;
  id: number | null;
  onClose: () => void;
}) {
  const pushError = useErrorStore((state) => state.pushError);

  const [imageURL, setImageURL] = useState<string | null>(null);
  const name = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const location = useRef<HTMLInputElement>(null);
  const star = useRef<HTMLInputElement>(null);
  const image = useRef<HTMLInputElement>(null);

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

    const nameValue = name.current?.value;
    const descriptionValue = description.current?.value;
    const locationValue = location.current?.value;
    const starValue = star.current?.value;
    const imageValue = image.current?.files?.[0];

    const isValid = nameValue && descriptionValue && locationValue && starValue;

    if (!isValid || selectedId === null) {
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
      .update(selectedId, formData)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        pushError({
          message: err?.response?.data?.message || "Erro ao salvar review.",
          status: err.status,
        });
      });
  }

  if (!review)
    return (
      <Drawer open={open} onClose={onClose}>
        <></>
      </Drawer>
    );

  return (
    <Drawer open={open} onClose={onClose}>
      <div className="w-full px-12 py-8 bg-white">
        <h2 className="text-2xl font-bold">Editar Review:</h2>
        <div className="flex gap-main mt-6">
          <form onSubmit={onSubmit} className="flex-1 flex flex-col gap-main">
            <EditInput
              innerRef={name}
              label="Nome"
              defaultValue={review.name}
              required
            />
            <EditInput
              innerRef={description}
              label="Descrição"
              defaultValue={review.description}
              required
            />
            <EditInput
              innerRef={location}
              label="Local"
              defaultValue={review.location}
              required
            />
            <EditInput
              label="Estrelas"
              innerRef={star}
              type="number"
              defaultValue={review.star}
              step="0.1"
              required
            />
            <div className="flex flex-col gap-[2px]">
              <label
                htmlFor="upload-photo"
                className="relative w-[200px] h-[200px] bg-gray-300 rounded-xl cursor-pointer group overflow-hidden"
              >
                <div className="w-full h-full absolute z-30 top-0 left-0 bg-black/25 center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-2xl text-center text-white font-bold">
                    Adicionar Imagem
                  </p>
                </div>
                <Image
                  src={
                    imageURL || review.image || "/static/img/placeholder.png"
                  }
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:grayscale transition-all duration-300"
                  alt={review.name}
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
  innerRef,
  ...props
}: {
  label: string;
  innerRef?: any;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-[2px]">
      <label>{label}:</label>
      <Input
        innerRef={innerRef}
        {...props}
        className="w-full border border-gray-300 p-2 rounded-md"
      />
    </div>
  );
}

function DeleteModal({
  id,
  onClose,
  open,
}: {
  id: number | null;
  open: boolean;
  onClose: () => void;
}) {
  const pushError = useErrorStore((state) => state.pushError);

  function onDelete() {
    if (id !== null) {
      reviewsService
        .delete(id)
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          pushError({
            message: err?.response?.data?.message || "Erro ao deletar review.",
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
