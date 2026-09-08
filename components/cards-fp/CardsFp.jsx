import "./cardsFp.css";



export default function CardsFp() {
    return (
        <section className="grid-template mx-20 my-20 gap-5">
        <div className="card">
            <h2 className="fp-font-color text-2xl font-bold">Om os</h2>
            <p>Vi kæmper for at nedbringe antallet af dyr i nød og sikre, at  alle nødstedte dyr får den rette hjælp. Vi arbejder med et landsdækkende netværk af frivillige, internater og plejestationer, der hver dag hjælper dyr.</p>
        </div>
        <div className="card">
            <h2 className="fp-font-color text-2xl font-bold">Dyr & Mennesker</h2>
            <p>Dyr er en vigtig del af vores liv og samfundet og styrker deres unikke værdi for mennesker. Dyr skaber tryghed, styrker sociale relationer og øger vores livskvalitet.</p>
            <p className="mt-6">Med dyr følger ansvar, derfor arbejder vi proaktivt med oplysning om ansvarligt ejerskab, så hverken dyr eller mennesker kommer i klemme i dagligdagen. Bag hver eneste sag står en ulykkelig menneskeskæbne, som med den rette hjælp heldigvis næsten finder varige løsninger.</p>
        </div>
        <div className="card">
            <h2 className="fp-font-color text-2xl font-bold">Mad & Forbrug</h2>
            <p>Vi kæmper for et mere naturligt fødevareforbrug og en bæredygtig produktion med fokus på kvalitet, omtanke og respekt for dyr og natur. Det er vores mål, at hele Danmarks fødevareproduktion bliver omlagt til enten frihold eller økologisk drift med forbedret dyrevelfærd.</p>
            <p className="mt-6">Dansk fødevareproduktion er drevet af et ensidigt fokus på vækst, økonomi og lave omkostninger. I dag ejes 99 % af landbruget af store virksomheder, hvor mange dyr holdes under industrilignende forhold. De lever under produktionsforhold – ikke levende væsener. Det betyder, at millioner af dyr i Danmark lever under stærkt kritisable forhold. </p>
        </div>
        </section>
    );
}