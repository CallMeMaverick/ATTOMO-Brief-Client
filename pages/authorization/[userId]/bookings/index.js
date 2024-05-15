import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Link from "next/link";

async function fetchUserBookings(userId) {
    try {
        const response = await fetch(`http://localhost:3000/user/${userId}/bookings`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error("Could not fetch a user");
        }
    } catch (error) {
        throw error;
    }
}

async function fetchBookedAccommodations(fetchBookedAccommodationsIds) {
    const accommodationsBooked = []

    try {
        for (let i = 0; i < fetchBookedAccommodationsIds.length; i++) {
            const response = await fetch(`http://localhost:3000/accommodation/${fetchBookedAccommodationsIds[i]}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            })

            if (response.ok) {
                const data = await response.json();
                accommodationsBooked.push(data);
            } else {
                throw new Error("Could not fetch accommodation")
            }
        }
    } catch (error) {
        throw error;
    }

    return accommodationsBooked;
}

export default function Bookings() {
    const router = useRouter();
    const { userId } = router.query;
    console.log(userId);
    const [accommodations, setAccommodations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        if (!userId) return;

        async function fetchBookings() {
            try {
                const userBookings = await fetchUserBookings(userId);
                const accommodationNames = await fetchBookedAccommodations(userBookings);
                setAccommodations(accommodationNames);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchBookings();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="mb-3">
            <div className="inline-block">
                <h1 className="font-bold text-4xl">Bookings:</h1>
            </div>
            <ol className="list-decimal m-10">
                {accommodations.map((acc, index) => (
                    <li key={index}>
                        <Link className={"hover:bg-emerald-400 hover:underline hover:text-white"} href={`/authorization/${userId}/accommodations/${acc._id}`}>
                            {acc.name}
                        </Link>
                    </li>
                ))}
            </ol>
        </div>
    )
}