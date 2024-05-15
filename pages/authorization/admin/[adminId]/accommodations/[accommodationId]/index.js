import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchAccommodation, fetchBooker} from "../../../../[userId]/accommodations/[accommodationId]";
import Link from "next/link";

export default function Accommodation() {
    const [accommodation, setAccommodation] = useState(null);
    const [booker, setBooker] = useState(null);
    const [error, setError] = useState('');
    const router = useRouter();
    const { adminId, userId, accommodationId } = router.query;

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
            <div>
                <h1><span className={"font-bold"}>Booked by: </span></h1>
                {booker ? (
                    <Link className={"ml-5"} href={`/authorization/admin/${adminId}/user/${booker._id}`}>
                        <span className={"hover:text-emerald-400 hover:underline"}>{booker.name} {booker.surname}</span>, id: ('<span className={"italic font-bold text-emerald-400"}>{booker._id}</span>')
                    </Link>
                ) : (
                    "Not booked"
                )}
            </div>
        </div>
    );
}
