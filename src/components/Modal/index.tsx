import React from "react";
import { IoClose } from "react-icons/io5";

export default function Modal({
  children,
  open,
  onClose,
}: {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={
        "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 " +
        (open ? "" : "hidden pointer-events-none")
      }
      onClick={onClose}
    >
      <div
        className="bg-white relative p-6 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-8 text-3xl text-dark"
        >
          <IoClose />
        </button>
        {children}
      </div>
    </div>
  );
}
