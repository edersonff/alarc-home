import React from "react";

export default function Footer() {
  return (
    <div className="w-full">
      <div className="content text-[#545455]">
        <p>
          © 2018 - {new Date().getFullYear()} Alarc - Todos os direitos
          reservados.
        </p>
      </div>
    </div>
  );
}
