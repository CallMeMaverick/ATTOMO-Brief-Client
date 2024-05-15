import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

async function fetchUser(userId) {
    try {
        const response = await fetch(`http://localhost:3000/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error("Could not fetch the user");
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

    console.log(accommodationsBooked);
    return accommodationsBooked;
}

export default function UserId() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const { userId } = router.query;

    useEffect(() => {
        if (!userId) return;

        const getUserAndBookings = async () => {
            try {
                const userData = await fetchUser(userId);
                setUser(userData);
                console.log(userData);
                const userBookings = await fetchBookedAccommodations(userData.bookings);
                setBookings(userBookings);
            } catch (err) {
                setError(err.message);
            }
        };

        getUserAndBookings();
    }, [userId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1><span className={"font-bold"}>Name</span> {user.name}</h1>
            <h1><span className={"font-bold"}>Surname</span> {user.surname}</h1>
            <h1><span className={"font-bold"}>Email</span> {user.email}</h1>
            <div className={"mt-5"}>
                <h1><span className={"font-bold"}>Bookings:</span></h1>
                {bookings.length === 0 && "None"}
                {bookings.length > 0 && <ol className={"list-decimal ml-10"}>
                    {bookings.map((booking, index) => (
                        <li key={index}>
                            <Link className={"hover:text-emerald-400 hover:underline"}
                                  href={`authorization/admin/accommodation/${booking.id}`}>{booking.name}</Link>
                        </li>
                    ))}
                </ol>}

            </div>
        </div>
    );
}
