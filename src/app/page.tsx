import Blocks from "@/components/Blocks";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Info } from "@/components/Typo";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col gap-[12vh]">
      <Navbar />
      <Blocks />
      <Footer />
    </main>
  );
}
