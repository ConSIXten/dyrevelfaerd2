import nyhedsbrev from "./nyhedsbrev.css";

export default function Nyhedsbrev() {
    return (
        <div className="nyheds-bg py-15 px-10">
            <div className="flex justify-center items-center gap-2">
                <div>
                <h2 className="font-bold nyhedsbrev-font-color text-2xl">Tilmeld dig vores nyhedsbrev</h2>
                <p className="">Få inspiration og nyheder om dyrevelfærd og vores arbejde, direkte i din indbakke.</p>
                </div>
                <form className="flex space-y-4 gap-3">
                    <input
                        type="text"
                        placeholder="Navn"
                        className="border border-black rounded px-4 py-2 focus:outline-none focus:ring bg-white"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="border border-black rounded px-4 py-2 focus:outline-none focus:ring  bg-white"
                    />
                    <button
                        type="submit"
                        className="bg-[#3D5F8F] text-white rounded px-4 hover:bg-[#2C4A6E] transition duration-300"
                    >
                        Tilmeld
                    </button>
                </form>
            </div>
        </div>
    );
}