import { Error } from "@/store/error";
import React, { useMemo } from "react";
import { IoAlertCircle } from "react-icons/io5";

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
    return "bg-red-50 border-red-500";
  }, [status]);
  return (
    <div
      className={"border-s-4 p-4 alertUp shadow-xl rounded-xl " + alertColor}
      role="alert"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <IoAlertCircle className="h-6 w-6 text-red-500" />
        </div>
        <div className="ms-3">
          <h3 className="text-gray-800 font-semibold">Erro!</h3>
          <p className="text-sm text-gray-700">{message}</p>
        </div>
      </div>
    </div>
  );
}
