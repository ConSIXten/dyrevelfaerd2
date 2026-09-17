'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AnimalForm from '../../components/admin/AnimalForm';
import AnimalRow from '../../components/admin/AnimalRow';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { buildAnimalPayload, fetchAnimals, createAnimal, updateAnimal, deleteAnimal } from '../../lib/animalsApi';
import './admin.css';

const EMPTY_FORM = { name: '', description: '', age: '', imageUrl: '' };

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
        const username = savedUser ? JSON.parse(savedUser)?.username : null;

        if (!username) {
            sessionStorage.removeItem('user');
            router.replace('/logInd');
        } else {
            setIsAuthorized(true);
        }
        setIsCheckingAuth(false);
    }, [router]);

    useEffect(() => {
        fetchAnimals()
            .then(setAnimals)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setForm((prev) => ({ ...prev, imageUrl: String(reader.result) }));
        reader.readAsDataURL(file);
    };

    const handleAddAnimal = async (event) => {
        event.preventDefault();
        const payload = buildAnimalPayload(form);
        if (!payload.name) return alert('Skriv navnet på dyret');

        try {
            const createdAnimal = await createAnimal(payload);
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

        const nextImageUrl = window.prompt('Indsæt ny billed-URL (ingen ændring):', animal.asset?.url ?? '');
        if (nextImageUrl === null) return;

        const imageUrl = nextImageUrl.trim();
        const payload = {
            ...animal,
            name: nextName.trim() || animal.name,
            description: nextDescription.trim() || animal.description || 'Ingen beskrivelse endnu.',
            age: Number(animal.age) || 0,
            ...(imageUrl ? { imageUrl, asset: { url: imageUrl } } : {}),
        };

        try {
            const savedAnimal = await updateAnimal(animal.id, payload);
            setAnimals((prev) => prev.map((item) => (item.id === animal.id ? savedAnimal : item)));
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDeleteAnimal = async (animalId) => {
        if (!window.confirm('Er du sikker på at du vil slette dette dyr?')) return;

        try {
            await deleteAnimal(animalId);
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
