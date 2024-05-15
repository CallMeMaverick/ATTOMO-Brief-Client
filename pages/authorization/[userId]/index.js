import {useEffect, useState} from "react";
import { useRouter } from "next/router";

export async function fetchAccommodations() {
    try {
        const response = await fetch("https://attomo-brief-api-solitary-darkness-4773.fly.dev/accommodations", {
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
    const [accommodations, setAccommodations] = useState([]);
    const [error, setError] = useState('');
    const router = useRouter();
    const {userId} = router.query;

    const handleClick = (accommodationId) => {
        router.push(`/authorization/${userId}/accommodations/${accommodationId}`)
    }

    useEffect(() => {
        fetchAccommodations().then(setAccommodations).catch((err) => {
            setError(err.message);
        })
    }, []);

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <>
            <h1 className={"font-bold text-4xl mb-3"}>Accommodations</h1>
            <ul className={"flex flex-row flex-wrap gap-4"}>
                {accommodations.map((acc, index) => (
                    <li key={index} className="flex flex-col justify-center items-center">
                        <button onClick={() => handleClick(acc._id)}
                                className={`flex flex-col items-center border ${acc.bookedBy.length > 0 ? "border-red-500" : "border-emerald-500"} border-2 p-5`}>
                            <img className="object-cover" src={acc.images} alt={acc.name}
                                 style={{width: '100px', height: '100px'}}/>
                            <div className="accommodation-details text-center mt-2">
                                <h3>{acc.name}</h3>
                                <p>{acc.location}</p>
                                <p>Type: {acc.type}</p>
                                <p>Price per night: ${acc.pricePerNight}</p>
                                {acc.bookedBy.length > 0 ?
                                    <p className={"bg-red-600 text-white rounded-2xl mt-2 px-2 py-1"}>Booked</p> :
                                    <p className={"bg-emerald-500 text-white rounded-2xl mt-2 px-2 py-1"}>Available</p>}
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        </>
    )
}

