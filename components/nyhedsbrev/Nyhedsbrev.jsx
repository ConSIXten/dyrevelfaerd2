"use client";

import { useState } from "react";
import nyhedsbrev from "./nyhedsbrev.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Nyhedsbrev() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});

    function validate() {
        const newErrors = {};
        if (!name.trim()) {
            newErrors.name = "Navn er påkrævet";
        }
        if (!email.trim()) {
            newErrors.email = "Email er påkrævet";
        } else if (!EMAIL_REGEX.test(email.trim())) {
            newErrors.email = "Indtast en gyldig email";
        }
        return newErrors;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newErrors = validate();
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            setName("");
            setEmail("");
        }
    }

    return (
        <div className="nyheds-bg py-15 px-10">
            <div className="flex justify-center items-center gap-2">
                <div>
                    <h2 className="font-bold nyhedsbrev-font-color text-2xl">Tilmeld dig vores nyhedsbrev</h2>
                    <p className="">Få inspiration og nyheder om dyrevelfærd og vores arbejde, direkte i din indbakke.</p>
                </div>
                <form className="flex form-col h-full space-y-4 gap-3" onSubmit={handleSubmit} noValidate>
                    <div className="flex flex-col ">
                        <input
                            type="text"
                            placeholder="Navn"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-black rounded px-4 py-2 focus:outline-none focus:ring bg-white"
                        />
                        {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
                    </div>
                    <div className="flex flex-col">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-black rounded px-4 py-2 focus:outline-none focus:ring  bg-white"
                        />
                        {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
                    </div>
                    <button
                        type="submit"
                        className="bg-[#3D5F8F] text-white rounded px-3 hover:bg-[#2C4A6E] transition duration-300 nyheds-button"
                    >
                        Tilmeld
                    </button>
                </form>
            </div>
        </div>
    );
}