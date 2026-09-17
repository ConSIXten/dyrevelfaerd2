import "./cardsFp.css";

async function getAbouts() {
    const res = await fetch("http://localhost:4000/api/v1/abouts");
    if (!res.ok) {
        throw new Error("Failed to fetch abouts");
    }
    return res.json();
}

export default async function CardsFp() {
    const abouts = await getAbouts();

    return (
        <section className="grid-template mx-20 my-20 gap-5">
            {abouts.map((about) => (
                <div className="card" key={about.id}>
                    <h2 className="fp-font-color text-2xl">{about.title}</h2>
                    {about.content.split("\n\n").map((paragraph, index) => (
                        <p key={index} className={index > 0 ? "mt-6" : undefined}>
                            {paragraph}
                        </p>
                    ))}
                </div>
            ))}
        </section>
    );
}