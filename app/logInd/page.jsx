'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./logInd.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

export default function LogIndPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFieldErrors({});

        if (!username.trim() || !password) {
            setFieldErrors({ username: "Indtast brugernavn og password" });
            return;
        }

        setSubmitting(true);

        try {
            const res = await fetch("http://localhost:4000/auth/token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const responseData = await res.json().catch(() => ({}));
            if (!res.ok) {
                throw new Error(responseData.message || "Log ind mislykkedes");
            }

            const token = responseData.token || responseData.access_token;
            if (!token) throw new Error("API'et returnerede ikke en token");

            sessionStorage.setItem("token", token);
            sessionStorage.setItem("user", JSON.stringify({ username }));
            router.push("/admin");
        } catch (err) {
            setFieldErrors({ password: err.message });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Header />
            <div className="logind-container">
                <div className="logind-card">
                    <h1 className="logind-title">Log ind på din konto</h1>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="logind-field">
                            <label htmlFor="username">Email</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Brugernavn"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            {fieldErrors.username && (
                                <p className="field-error">{fieldErrors.username}</p>
                            )}
                        </div>
                        <div className="logind-field">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="logind-btn" disabled={submitting}>
                            {submitting ? "Logger ind..." : "Log ind"}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}