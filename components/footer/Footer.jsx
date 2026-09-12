import './footer.css';

export default function Footer() {

    return (
        <footer className="bg-[#B8C9E0] text-black">
            <div>
                <h3>KONTAKT</h3>
                <ul>
                    <li>Torvesøvej 22, 1.</li>
                    <li>1131 København K</li>
                    <li> CVR: 22446187</li>
                    <li>Husk at du kan få fradrag for donationer på op til 16.600kr.</li>
                </ul>
            </div>
            <div>
                <p className="">2024 - Foreningen for Dyrevelfærd</p>
            </div>
            <div>
                <h3>PARTNERE</h3>
                <ul>
                    <li className="partners-list">Anima</li>
                    <li className="partners-list">World Animal Protection</li>
                    <li className="partners-list">Fødevarestyrelsen</li>
                    <li className="partners-list">Faktalink</li>
                </ul>
            </div>
            <div>

            </div>
        </footer>
    );
}