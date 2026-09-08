import Image from "next/image";

export default function Hero() {
  return (
    <section className="flex flex-col h-screen">
        <Image src="/assets/header/kittens.jpg" alt="Hero Image" className="w-full h-[300px] object-cover" width={1920} height={1080} />
    </section>
  );
}