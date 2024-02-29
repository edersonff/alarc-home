import Blocks from "@/components/Blocks";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="flex flex-col gap-[12vh]">
      <h1 className="hidden">Página Inicial - Alarc</h1>
      <Navbar />
      <Blocks />

      <footer className="w-full pb-5">
        <div className="content text-[#545455]">
          <p>
            © 2018 - {new Date().getFullYear()} Alarc - Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}
