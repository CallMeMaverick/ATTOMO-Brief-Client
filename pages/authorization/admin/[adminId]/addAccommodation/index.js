import { useState } from "react";
import {useRouter} from "next/router";

export default function AddAccommodation() {
    const router = useRouter();
    const { adminId } = router.query;
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        location: "",
        pricePerNight: "",
        imageUrl: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("HERE");
        try {
            const response = await fetch("http://localhost:3000/accommodations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                router.push(`/authorization/admin/${adminId}/accommodations`)

            }
        } catch (error) {
            let errorMessage;
            try {
                errorMessage = await response.json();
            } catch (error) {
                errorMessage = { message: 'Unknown error occurred' };
            }
            console.log(errorMessage);
        }

    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Add Accommodation</h2>

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
                        min={0}
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
                    className="w-full bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-600"
                >
                    Add accommodation
                </button>
            </form>
        </div>
    );
}
