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

export async function dismissBooking(accommodationId) {
    console.log('id ', accommodationId);
    try {
        const response = await fetch(`http://localhost:3000/accommodation/${accommodationId}/dismissBooking`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        console.log(response);
        if (response.ok) {
            const data = await response.json();
            console.log("Successfully dismissed: ", data);
            return data;
        } else {
            throw new Error("Error while dismissing");
        }
    } catch (error) {
        throw error;
    }
}

async function deleteUser(userId) {
    try {
        const response = await fetch(`http://localhost:3000/user/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })

        if (response.ok) {
            const data = await response.json();
            console.log("User successfully deleted: ", data);
            return data;
        } else {
            throw new Error("Could not delete the user");
        }
    } catch (error) {
        throw error;
    }
}

export default function UserId() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const { adminId, userId } = router.query;

    useEffect(() => {
        if (!userId) return;

        const getUserAndBookings = async () => {
            try {
                const userData = await fetchUser(userId);
                setUser(userData);
                console.log('user', user);
                const userBookings = await fetchBookedAccommodations(userData.bookings);
                setBookings(userBookings);
            } catch (err) {
                setError(err.message);
            }
        };

        getUserAndBookings();
    }, [userId]);

    const handleDismissing = async (accommodationId) => {
        try {
            await dismissBooking(accommodationId);
            setBookings(prevBookings => prevBookings.filter(booking => booking.id !== accommodationId));
            router.reload(window.location.pathname);
        } catch (error) {
            setError(error.message);
        }
    }

    const handleDeleting = async (userId) => {
        try {
            await deleteUser(userId);
            router.push(`/authorization/admin/${adminId}`);
        } catch (error) {
            setError(error.message);
        }
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1><span className={"font-bold"}>Name: </span> {user.name}</h1>
            <h1><span className={"font-bold"}>Surname: </span> {user.surname}</h1>
            <h1><span className={"font-bold"}>Email: </span> {user.email}</h1>
            <div className={"mt-5"}>
                {user.role !== "admin" && <h1><span className={"font-bold"}>Bookings:</span></h1>}
                {user.role !== "admin" && bookings.length === 0 && "None"}
                {user.role !== "admin" && bookings.length > 0 && <ol className={"list-decimal ml-10"}>
                    {bookings.map((booking, index) => (
                        <li key={index} className={"m-3"}>
                            <div className={"flex flex-row gap-3.5"}>
                                <Link className={"hover:text-emerald-400 hover:underline mr-2"}
                                      href={`authorization/admin/accommodation/${booking.id}`}>{booking.name}</Link>
                                <div className={"ml-2"}>
                                    <button onClick={() => handleDismissing(booking._id)} className={"bg-red-600 text-white rounded-lg p-0.5"}>Dismiss this bookings
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>}
            </div>

            {user.role !== "admin" &&
                <button onClick={() => handleDeleting(userId)} className={"bg-red-900 text-white p-1 rounded-xl mt-5"}>Delete user</button>
            }
            {user.role === "admin" &&
                <button onClick={() => handleDeleting(userId)} className={"bg-gray-300 text-white p-1 rounded-xl mt-5 hover:cursor-not-allowed"} disabled>Cannot delete another admin</button>
            }
        </div>
    );
}
