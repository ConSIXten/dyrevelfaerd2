import "./cardsFp.css";



export default function CardsFp() {
    return (
        <section className="grid-template mx-20 my-20 gap-5">
        <div className="card">
            <h2>Om os</h2>
            <p>Vi kæmper for at nedbringe antallet af dyr i nød og sikre, at  alle nødstedte dyr får den rette hjælp. Vi arbejder med et landsdækkende netværk af frivillige, internater og plejestationer, der hver dag hjælper dyr.</p>
        </div>
        <div className="card">
            <h2>Dyr & Mennesker</h2>
            <p>Få indsigt i dyrevelfærdssituationen i Danmark og de love, der beskytter dyr.</p>
        </div>
        <div className="card">
            <h2>Mad & Forbrug</h2>
            <p>Opdag hvordan dyrevelfærd håndteres rundt om i verden og hvilke udfordringer der findes.</p>
        </div>
        </section>
    );
}