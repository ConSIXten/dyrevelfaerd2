import Image from "next/image";

export default function Hero() {
    return (
        <> 
        <section className="flex flex-col h-screen">
            <Image src="/assets/header/kittens.jpg" alt="Hero Image" className="w-full h-[300px] object-cover" width={1920} height={1080} style={{ position: "absolute" }} />
        <div>
            <h1 className="text-5xl font-bold ml-40 mt-20 text-white relative">Foreningen for Dyrevelfærd</h1>
            <p className="text-2xl ml-40 text-white mt-4 relative">Vi specialiserer os i dyrevelfærd</p>
        </div>
        </section>
        </>
    );
}