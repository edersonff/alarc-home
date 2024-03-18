import Link from "next/link";
import React, { useMemo } from "react";
import { FaArrowRight } from "react-icons/fa";

export default function Header() {
  const greeting = useMemo(() => {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) return "Bom Dia";
    if (hours < 18) return "Boa Tarde";
    return "Boa Noite";
  }, []);
  return (
    <div className="w-full mb-6 flex items-center justify-between pr-8">
      <h2
        style={{
          fontSize: "1.75rem",
        }}
        className="section-title"
      >
        {greeting}!
      </h2>
      <Link
        href="/"
        className="bg-primary text-white p-2 rounded-full hover:opacity-80 focus:opacity-100 transition-all delay-100"
      >
        <FaArrowRight size={20} />
      </Link>
    </div>
  );
}
