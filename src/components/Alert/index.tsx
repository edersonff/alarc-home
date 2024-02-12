import { Error } from "@/store/error";
import React, { useMemo } from "react";
import { IoAlertCircle } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

export default function Alert({ message, status }: Error) {
  const alertColor = useMemo(() => {
    if (status === 401) {
      return "bg-yellow-50 border-yellow-500";
    }
    if (status === 403) {
      return "bg-red-50 border-red-500";
    }
    if (status === 404) {
      return "bg-red-50 border-red-500";
    }
    if (status === 200) {
      return "bg-green-50 border-green-500";
    }

    return "bg-red-50 border-red-500";
  }, [status]);

  const isSucess = status === 200;

  return (
    <div
      className={"border-s-4 p-4 alertUp shadow-xl rounded-xl " + alertColor}
      role="alert"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {isSucess ? (
            <FaCheckCircle className="h-6 w-6 text-green-500" />
          ) : (
            <IoAlertCircle className="h-6 w-6 text-red-500" />
          )}
        </div>
        <div className="ms-3">
          <h3 className="text-gray-800 font-semibold">
            {isSucess ? "Sucesso" : "Erro"}!
          </h3>
          <p className="text-sm text-gray-700">{message}</p>
        </div>
      </div>
    </div>
  );
}
