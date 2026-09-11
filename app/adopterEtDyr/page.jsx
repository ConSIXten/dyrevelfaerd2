import Hero3 from "../../components/hero/Hero3";
import Header from "../../components/header/Header";

import "./adopterEtDyr.css";

export default function AdopterEtDyrPage() {
    return (
        <div>
            <Header />
            <Hero3 />
            <div className="flex gap-3.5">
                <h1 className="headline pl-30">Dyr hos os</h1>
                <div className="pt-4">
                    <p>i øjeblikket 15 dyr</p>
                </div>
            </div>
        </div>
    );
}