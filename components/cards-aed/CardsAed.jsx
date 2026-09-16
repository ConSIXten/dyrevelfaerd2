'use client';

import { useEffect, useState } from "react";
import "./cardsAed.css";

const PAGE_SIZE = 6;

export default function CardsAed() {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    useEffect(() => {
        fetch("http://localhost:4000/api/v1/animals")
            .then((res) => {
                if (!res.ok) throw new Error("Fejlet fetch");
                return res.json();
            })
            .then((data) => {
                setAnimals(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loader...</p>;
    if (error) return <p>Fejl: {error}</p>;

    const visibleAnimals = animals.slice(0, visibleCount);

    return (
        <div className="dho-wrapper">
            <div className="dho-grid">
                {visibleAnimals.map((animal) => (
                    <div className="cardDho" key={animal.id}>
                        {animal.asset && (
                            <img
                                src={animal.asset.url}
                                alt={animal.name}
                                className="dho-image"
                            />
                        )}
                        <div className="dho-body">
                            <h3 className="dho-title">{animal.name}</h3>
                            <p className="dho-text">{animal.description}</p>
                            {animal.age && (
                                <p className="dho-days">Været på internat i {animal.age} dage.</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="dho-more-wrapper">
                {visibleCount < animals.length && (
                    <button
                        className="dho-more-btn"
                        onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                    >
                        Vis flere dyr
                    </button>
                )}
                {visibleCount > PAGE_SIZE && (
                    <button
                        className="dho-more-btn dho-less-btn"
                        onClick={() => setVisibleCount(PAGE_SIZE)}
                    >
                        Vis færre
                    </button>
                )}
            </div>
        </div>
    );
}