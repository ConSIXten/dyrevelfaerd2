'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AnimalForm from '../../components/admin/AnimalForm';
import AnimalRow from '../../components/admin/AnimalRow';
import './admin.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const API_URL = 'http://localhost:4000/api/v1/animals';
const EMPTY_FORM = { name: '', description: '', age: '', imageUrl: '' };

const buildAnimalPayload = (form) => {
    const imageUrl = form.imageUrl.trim();

    return {
        name: form.name.trim(),
        description: form.description.trim() || 'Ingen beskrivelse endnu.',
        age: Number(form.age) || 0,
        ...(imageUrl ? { imageUrl, asset: { url: imageUrl } } : {}),
    };
};

export default function AdminPage() {
    const router = useRouter();
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [form, setForm] = useState(EMPTY_FORM);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        const savedUser = sessionStorage.getItem('user');

        if (!savedUser) {
            router.replace('/logInd');
            setIsCheckingAuth(false);
            return;
        }

        try {
            const parsedUser = JSON.parse(savedUser);
            if (!parsedUser?.username) {
                sessionStorage.removeItem('user');
                router.replace('/logInd');
                setIsCheckingAuth(false);
                return;
            }

            setIsAuthorized(true);
        } catch {
            sessionStorage.removeItem('user');
            router.replace('/logInd');
        } finally {
            setIsCheckingAuth(false);
        }
    }, [router]);

    const loadAnimals = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Kunne ikke hente dyr');
            const data = await response.json();
            setAnimals(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAnimals();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (file) => {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setForm((prev) => ({ ...prev, imageUrl: String(reader.result) }));
        };
        reader.readAsDataURL(file);
    };

    const handleAddAnimal = async (event) => {
        event.preventDefault();

        const payload = buildAnimalPayload(form);

        if (!payload.name) {
            alert('Skriv navnet på dyret');
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error('Kunne ikke tilføje dyr');

            const createdAnimal = await response.json();
            setAnimals((prev) => [createdAnimal, ...prev]);
            setForm(EMPTY_FORM);
            setIsFormOpen(false);
        } catch (err) {
            alert(err.message);
        }
    };

    const handleEditAnimal = async (animal) => {
        const nextName = window.prompt('Skriv nyt navn:', animal.name ?? '');
        if (nextName === null) return;

        const nextDescription = window.prompt('Skriv ny beskrivelse:', animal.description ?? '');
        if (nextDescription === null) return;

        const nextImageUrl = window.prompt(
            'Indsæt ny billed-URL (ingen ændring):',
            animal.asset?.url ?? ''
        );
        if (nextImageUrl === null) return;

        const imageUrl = nextImageUrl.trim();
        const updatedAnimal = {
            ...animal,
            name: nextName.trim() || animal.name,
            description: nextDescription.trim() || animal.description || 'Ingen beskrivelse endnu.',
            age: Number(animal.age) || 0,
            ...(imageUrl ? { imageUrl, asset: { url: imageUrl } } : {}),
        };

        try {
            const response = await fetch(`${API_URL}/${animal.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedAnimal),
            });

            if (!response.ok) throw new Error('Kunne ikke redigere dyr');

            const savedAnimal = await response.json();
            setAnimals((prev) =>
                prev.map((item) => (item.id === animal.id ? savedAnimal : item))
            );
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDeleteAnimal = async (animalId) => {
        const isConfirmed = window.confirm('Er du sikker på at du vil slette dette dyr?');
        if (!isConfirmed) return;

        try {
            const response = await fetch(`${API_URL}/${animalId}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Kunne ikke slette dyr');
            setAnimals((prev) => prev.filter((animal) => animal.id !== animalId));
        } catch (err) {
            alert(err.message);
        }
    };

    if (isCheckingAuth || !isAuthorized) return null;
    if (loading) return <p className="admin-status">Loader...</p>;
    if (error) return <p className="admin-status error">Fejl: {error}</p>;

    return (
        <>
            <Header />
            <div className="admin-page">
                <div className="admin-header">
                    <h1 className="admin-title">Admin</h1>
                </div>

                <div className="admin-list">
                    {animals.map((animal) => (
                        <AnimalRow
                            key={animal.id}
                            animal={animal}
                            onEdit={handleEditAnimal}
                            onDelete={handleDeleteAnimal}
                        />
                    ))}
                </div>

                {isFormOpen && (
                    <AnimalForm
                        form={form}
                        onChange={handleChange}
                        onSubmit={handleAddAnimal}
                        onCancel={() => setIsFormOpen(false)}
                        onImageUpload={handleImageUpload}
                    />
                )}

                <div className="admin-add-wrapper">
                    <button
                        type="button"
                        className="admin-add-btn"
                        onClick={() => setIsFormOpen((prev) => !prev)}
                    >
                        Tilføj dyr
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}
