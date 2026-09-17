'use client';

import { useEffect, useState } from "react";
import "./cardsBf.css";

export default function VolunteerCards() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/v1/volunteers")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        setVolunteers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Henter data...</p>;
  if (error) return <p>Fejl: {error}</p>;

  return (
    <>
    <h2 className="text-3xl font-bold m-4 ml-45 card-headline">Bliv frivillig</h2>
    <div className="card-grid">
      {volunteers.map((volunteer) => (
        <div className="cardBf" key={volunteer.id}>
            <div className="card-header">
            <h3 className="card-title ml-4">{volunteer.title}</h3>
            </div>
          {volunteer.asset && (
            <img 
              src={volunteer.asset.url} 
              alt={volunteer.title} 
              className="card-image"
            />
          )}
          <div className="card-body">
            <p className="card-text">{volunteer.content}</p>
            {volunteer.extra && (
              <p className="card-extra">{volunteer.extra}</p>
            )}
          </div>
        </div>
      ))}
    </div>
    </>
  );
}