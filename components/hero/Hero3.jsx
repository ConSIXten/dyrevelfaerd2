import Image from "next/image";

export default function Hero3() {
    return (
        <>
            <section className="flex flex-col items-center justify-center relative h-[300px]">
                <Image src="/assets/adopt/adopt.jpg" alt="Hero Image" className="w-full h-[300px] object-cover" width={1920} height={1080} style={{ position: "absolute" }} />
                <div>
                    <h1 className="text-5xl font-bold mt-20 text-white relative right-120 bottom-20">Adoptér et dyr</h1>
                    <p className="text-2xl text-white mt-4 relative right-120 bottom-20">Overvejer du et nyt medlem af familien? Måske er det det perfekte match til et <br /> af vores mange søde internatdyr, som venter på nye kærlige hjem.</p>
                </div>
            </section>
        </>
    );
}