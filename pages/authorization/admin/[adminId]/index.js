import {useEffect, useState} from "react";
import { useRouter } from "next/router";

async function fetchUsers() {
    try {
        const response = await fetch("http://localhost:3000/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error("Failed to fetch")
        }
    } catch (error) {
        throw error;
    }
}

export default function Index() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const router = useRouter();
    const { adminId } = router.query;

    const handleClick = (userId) => {
        router.push(`/authorization/admin/${adminId}/user/${userId}`)
    }

    useEffect(() => {
        fetchUsers().then(setUsers).catch((err) => {
            setError(err.message)
        })
    }, []);

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <>
            <h1 className={"font-bold text-4xl mb-3"}>Users</h1>
            <ul className={"flex flex-row flex-wrap gap-4"}>
                {users.map((user, index) => (
                    <li key={index} className="flex flex-col">
                        <button onClick={() => handleClick(user._id)} className={"border-emerald-500 border-2 p-5"}>
                            <div className="flex flex-col justify-center items-start">
                                <h3><span className={"font-bold"}>Name:</span> {user.name}</h3>
                                <p><span className={"font-bold"}>Surname:</span> {user.surname}</p>
                                <p><span className={"font-bold"}>Email:</span> {user.email}</p>
                                <p><span className={"font-bold"}>Role:</span> {user.role}</p>
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        </>
    )
}