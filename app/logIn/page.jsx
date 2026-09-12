'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./logIn.css";

export default function LogInPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            const res = await fetch("http://localhost:4000/api/v1/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) throw new Error("Log ind mislykkedes");

            const user = await res.json();
            localStorage.setItem("user", JSON.stringify({ id: user.id, username }));
            router.push("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <h1>Log ind på din konto</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Brugernavn:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="password">Adgangskode:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={submitting}>
                    {submitting ? "Logger ind..." : "Log ind"}
                </button>
                {error && <p className="login-error">{error}</p>}
            </form>
        </div>
    );
}