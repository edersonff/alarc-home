import Blocks from "@/components/Blocks";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="flex flex-col gap-[12vh]">
      <Navbar />
      <Blocks />
      <Footer />
    </main>
  );
}
