import Navbar from "@/components/Navbar";
import React from "react";

export default function _404() {
  return (
    <div>
      <Navbar />
      <div className="fixed w-full h-full  left-0 top-0 center pointer-events-none	">
        <div className="pointer-events-auto text-center">
          <h1 className="font-light text-6xl mb-3">
            <b className="text-primary font-bold font-['Adam'] uppercase">
              Alarc
            </b>{" "}
            <span>404</span>
          </h1>
          <p className="text-xl text-dark/75">Página não encontrada</p>
        </div>
      </div>
      <div />
    </div>
  );
}
