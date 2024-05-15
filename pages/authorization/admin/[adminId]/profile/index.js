import { useEffect, useState } from "react";
import { useRouter } from "next/router";

async function fetchAdmin(adminId) {
    try {
        const response = await fetch(`https://attomo-brief-api-solitary-darkness-4773.fly.dev/user/admin/${adminId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error("Could not fetch the admin");
        }
    } catch (error) {
        throw error;
    }
}

async function updateAdmin(adminId, updatedData) {
    try {
        const response = await fetch(`https://attomo-brief-api-solitary-darkness-4773.fly.dev/user/admin/update/${adminId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(updatedData)
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error("Could not update the admin");
        }
    } catch (error) {
        throw error;
    }
}

export default function AdminProfile() {
    const [admin, setAdmin] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        status: "admin"
    });
    const [error, setError] = useState('');
    const router = useRouter();
    const { adminId } = router.query;

    useEffect(() => {
        if (adminId) {
            fetchAdmin(adminId)
                .then(adminData => {
                    setAdmin(adminData);
                    setFormData({
                        name: adminData.name || '',
                        surname: adminData.surname || '',
                        email: adminData.email || '',
                        status: adminData.status || "admin"
                    });
                })
                .catch(error => {
                    setError(error.message);
                });
        }
    }, [adminId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const updatedAdmin = await updateAdmin(adminId, formData);
            setAdmin(updatedAdmin); // Update the admin state with the new data
            setEditMode(false); // Exit edit mode after saving
            router.reload(window.location.pathname); // Reload the page
        } catch (error) {
            setError(error.message);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!formData.name || !formData.surname || !formData.email || !formData.status) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="">Loading...</span>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            {editMode ? (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Edit Admin Profile</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Surname:</label>
                        <input
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <button
                        onClick={handleSave}
                        className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => setEditMode(false)}
                        className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 mt-2"
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>
                    <p className="mb-2"><span className="font-bold">Name:</span> {admin.name}</p>
                    <p className="mb-2"><span className="font-bold">Surname:</span> {admin.surname}</p>
                    <p className="mb-2"><span className="font-bold">Email:</span> {admin.email}</p>
                    <p className="mb-2"><span className="font-bold">Status:</span> <span className="italic font-bold text-cyan-500">{admin.role}</span></p>
                    <p className="mb-4"><span className="font-bold">ID:</span> {admin._id}</p>
                    <button
                        onClick={() => setEditMode(true)}
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                        Edit
                    </button>
                </div>
            )}
        </div>
    );
}

