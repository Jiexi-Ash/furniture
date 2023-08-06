import About from "@/components/home/About";
import Collections from "@/components/home/Collections";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import PopularProducts from "@/components/home/PopularProducts";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col px-4 lg:px-24 py-12 overflow-y-auto">
      <Hero />
      <PopularProducts />
      <Collections />
      <About />
      <Footer />
    </main>
  );
}
