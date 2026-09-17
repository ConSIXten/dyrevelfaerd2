const API_URL = 'http://localhost:4000/api/v1/animals';

export const buildAnimalPayload = (form) => {
    const imageUrl = form.imageUrl.trim();
    return {
        name: form.name.trim(),
        description: form.description.trim() || 'Ingen beskrivelse endnu.',
        age: Number(form.age) || 0,
        ...(imageUrl ? { imageUrl, asset: { url: imageUrl } } : {}),
    };
};

const request = async (url, options) => {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error('Handlingen fejlede');
    return response.status === 204 ? null : response.json();
};

export const fetchAnimals = () => request(API_URL);

export const createAnimal = (payload) =>
    request(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

export const updateAnimal = (id, payload) =>
    request(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

export const deleteAnimal = (id) => request(`${API_URL}/${id}`, { method: 'DELETE' });
