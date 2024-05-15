import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {fetchAccommodations} from "../../../[userId]";


export default function Accommodation() {
    const [accommodations, setAccommodations] = useState(null);
    const [error, setError] = useState('');
    const router = useRouter();
    const { adminId } = router.query;

    const handleClick = (accommodationId) => {
        router.push(`/authorization/admin/${adminId}/accommodations/${accommodationId}`)
    }

    useEffect(() => {
        fetchAccommodations().then(setAccommodations).catch((err) => {
            setError(err.message);
        })
    }, []);

    if (error) {
        return <div>Error: {error}</div>
    }


    if (!accommodations) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className={"font-bold text-4xl mb-3"}>Accommodations</h1>
            <ul className={"flex flex-row flex-wrap gap-4"}>
                {accommodations.map((acc, index) => (
                    <li key={index} className="flex flex-col">
                        <button onClick={() => handleClick(acc._id)}
                                className={`flex flex-col items-start border ${acc.bookedBy.length > 0 ? "border-red-500" : "border-emerald-500"} border-2 p-5`}>
                            <img src={acc.images} alt={acc.name} style={{width: '100px', height: '100px'}}/>
                            <div className="accommodation-details">
                                <h3>{acc.name}</h3>
                                <p>{acc.location}</p>
                                <p>Type: {acc.type}</p>
                                <p>Price per night: ${acc.pricePerNight}</p>
                                {acc.bookedBy.length > 0 ?
                                    <p className={"bg-red-600 text-white rounded-2xl mt-2"}>Booked</p> :
                                    <p className={"bg-emerald-500 text-white rounded-2xl mt-2"}>Available</p>}
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
