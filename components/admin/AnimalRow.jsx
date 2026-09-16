'use client';

export default function AnimalRow({ animal, onEdit, onDelete }) {
    return (
        <div className="admin-row" key={animal.id}>
            <div className="admin-image-wrap">
                {animal.asset?.url ? (
                    <img src={animal.asset.url} alt={animal.name} className="admin-image" />
                ) : (
                    <div className="admin-image-placeholder" />
                )}
            </div>

            <div className="admin-name">{animal.name}</div>

            <div className="admin-actions">
                <button type="button" className="admin-btn edit" onClick={() => onEdit(animal)}>
                    Redigér
                </button>
                <button type="button" className="admin-btn delete" onClick={() => onDelete(animal.id)}>
                    Slet
                </button>
            </div>
        </div>
    );
}
