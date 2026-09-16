'use client';

export default function AnimalForm({ form, onChange, onSubmit, onCancel, onImageUpload }) {
    return (
        <form className="admin-form" onSubmit={onSubmit}>
            <input
                type="text"
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Navn"
            />
            <textarea
                name="description"
                value={form.description}
                onChange={onChange}
                placeholder="Beskrivelse"
                rows={3}
            />
            <input
                type="number"
                name="age"
                value={form.age}
                onChange={onChange}
                placeholder="Antal dage"
            />

            <div className="admin-image-upload-group">
                <label className="admin-upload-label" htmlFor="animal-image-upload">
                    Billede
                </label>
                <input
                    id="animal-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={(event) => onImageUpload(event.target.files?.[0])}
                />
                <input
                    type="url"
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={onChange}
                    placeholder="Eller indsæt billede-URL"
                />
                {form.imageUrl && (
                    <img src={form.imageUrl} alt="Forhåndsvisning" className="admin-preview-image" />
                )}
            </div>

            <div className="admin-form-actions">
                <button type="submit" className="admin-submit-btn">
                    Gem dyr
                </button>
                <button type="button" className="admin-cancel-btn" onClick={onCancel}>
                    Annullér
                </button>
            </div>
        </form>
    );
}
