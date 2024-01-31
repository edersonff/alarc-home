import { Typo } from "@/components/Typo";
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
      <Typo
        style={{
          fontSize: "1.75rem",
        }}
        typo="sectionTitle"
        as="h2"
      >
        {greeting}!
      </Typo>
      <Link href="/" className="bg-primary text-white p-2 rounded-full">
        <FaArrowRight size={20} />
      </Link>
    </div>
  );
}
