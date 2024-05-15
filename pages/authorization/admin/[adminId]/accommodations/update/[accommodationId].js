import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {fetchAccommodation} from "../../../../[userId]/accommodations/[accommodationId]";

async function updateAccommodation(accommodationId, updatedData) {
    try {
        const response = await fetch(`https://attomo-brief-api-solitary-darkness-4773.fly.dev/accommodations/update/${accommodationId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(updatedData)
        });
        console.log(response);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Could not update accommodation');
        }
    } catch (error) {
        throw error;
    }
}

export default function EditAccommodation() {
    const router = useRouter();
    const { adminId, accommodationId } = router.query;
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        location: '',
        pricePerNight: '',
        imageUrl: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (accommodationId) {
            fetchAccommodation(accommodationId)
                .then(data => setFormData({
                    name: data.name,
                    type: data.type,
                    location: data.location,
                    pricePerNight: data.pricePerNight,
                    imageUrl: data.images
                }))
                .catch(error => setError(error.message));
        }
    }, [accommodationId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateAccommodation(accommodationId, formData);
            router.push(`/authorization/admin/${adminId}/accommodations`);
        } catch (error) {
            setError(error.message);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Edit Accommodation</h2>

                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Cozy place"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="type" className="block text-gray-700 font-bold mb-2">Type:</label>
                    <input
                        type="text"
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        placeholder="Apartment"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Kyiv, Ukraine"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="pricePerNight" className="block text-gray-700 font-bold mb-2">Price per night:</label>
                    <input
                        type="number"
                        id="pricePerNight"
                        name="pricePerNight"
                        value={formData.pricePerNight}
                        onChange={handleChange}
                        placeholder="250"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="imageUrl" className="block text-gray-700 font-bold mb-2">Image URL:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                    Update accommodation
                </button>
            </form>
        </div>
    );
}
