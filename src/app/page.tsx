import Blocks from "@/components/Blocks";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="flex flex-col gap-[12vh]">
      <h1 className="hidden">Página Inicial - Alarc</h1>
      <Navbar />
      <Blocks />
      <Footer />
    </main>
  );
}
