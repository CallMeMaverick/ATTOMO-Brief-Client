import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchAccommodation, fetchBooker} from "../../../../[userId]/accommodations/[accommodationId]";
import  {dismissBooking, } from "../../user/[userId]";
import Link from "next/link";

async function deleteAccommodation(accommodationId) {
    try {
        const response = await fetch(`https://attomo-brief-api-solitary-darkness-4773.fly.dev/accommodation/${accommodationId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        console.log(response);

        if (response.ok) {
            console.log("Accommodation successfully deleted");
            return await response.json();
        } else {
            throw new Error("Could not delete accommodation");
        }
    } catch(error) {
        throw error;
    }
}

export default function Accommodation() {
    const [accommodation, setAccommodation] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [booker, setBooker] = useState(null);
    const [error, setError] = useState('');
    const router = useRouter();
    const { adminId, userId, accommodationId } = router.query;

    const handleDismissing = async (accommodationId) => {
        try {
            await dismissBooking(accommodationId);
            setBookings(prevBookings => prevBookings.filter(booking => booking.id !== accommodationId));
            router.reload(window.location.pathname);
        } catch (error) {
            setError(error.message);
        }
    }

    const handleDeletion = async (accommodationId) => {
        try {
            await deleteAccommodation(accommodationId);
            router.push(`/authorization/admin/${adminId}/accommodations`);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEdit = (accommodationId) => {
        router.push(`/authorization/admin/${adminId}/accommodations/update/${accommodationId}`);
    };

    useEffect(() => {
        if (accommodationId) {
            fetchAccommodation(accommodationId)
                .then(setAccommodation)
                .catch(error => {
                    setError(error.message);
                });
        }
    }, [accommodationId]);

    useEffect(() => {
        if (accommodation && accommodation.bookedBy.length !== 0) {
            fetchBooker(accommodation.bookedBy[0])
                .then(setBooker)
                .catch(error => {
                    setError(error.message);
                });
        }
    }, [accommodation]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!accommodation) {
        return <div>Loading...</div>;
    }

    return (
        <div className={"flex flex-col gap-3.5 m-10"}>
            <img src={accommodation.images} alt={accommodation.name} />
            <h1 className={"font-bold"}>Accommodation {accommodation.name}</h1>
            <p><span className={"font-bold"}>Location</span>: {accommodation.location}</p>
            <p><span className={"font-bold"}>Type</span>: {accommodation.type}</p>
            <p><span className={"font-bold"}>Price per night</span>: {accommodation.pricePerNight}</p>
            <div >
                <h1><span className={"font-bold"}>Booked by: </span></h1>
                {booker ? (
                    <>
                        <div>
                            <Link className={"ml-5"} href={`/authorization/admin/${adminId}/user/${booker._id}`}>
                                <span
                                    className={"hover:text-emerald-400 hover:underline"}>{booker.name} {booker.surname}</span>,
                                id: ('<span className={"italic font-bold text-emerald-400"}>{booker._id}</span>')
                            </Link>
                            <button className={"bg-red-600 text-white p-1 rounded-xl ml-5"}
                                    onClick={() => handleDismissing(accommodationId)}>Dismiss this booking
                            </button>
                        </div>
                    </>
                ) : (
                    "Not booked"
                )}
                <br />
                <div className={"flex flex-row gap-3.5"}>
                    <button className={"bg-red-600 text-white p-1 rounded-xl mt-5"} onClick={() => handleDeletion(accommodationId)}>Delete accommodation</button>
                    <button className={"bg-emerald-600 text-white p-1 rounded-xl mt-5"} onClick={() => handleEdit(accommodationId)}>Update</button>
                </div>

            </div>
        </div>
    );
}
