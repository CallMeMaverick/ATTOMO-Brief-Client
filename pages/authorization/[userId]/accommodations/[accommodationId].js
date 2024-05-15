import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export async function fetchAccommodation(accommodationId){
    try {
        const response = await fetch(`http://localhost:3000/accommodation/${accommodationId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error("Could not fetch the accommodation");
        }
    } catch (error) {
        throw error;
    }
}

export async function fetchBooker(bookerId) {
    try {
        const response = await fetch(`http://localhost:3000/booker/${bookerId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error("Could not fetch the booker")
        }
    } catch (error) {
        throw error;
    }
}

export async function book(userId, accommodationId) {
    try {
        const response = await fetch(`http://localhost:3000/accommodation/${userId}/${accommodationId}/book`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                userId: userId,
                accommodationId: accommodationId
            })
        })

        if (response.ok) {
            const data = await response.json();
            console.log('Booking successful:', data);
            return data;
        } else {
            throw new Error("Could not book")
        }
    } catch (error) {
        throw error;
    }
}

export default function Accommodation() {
    const [accommodation, setAccommodation] = useState(null);
    const [booker, setBooker] = useState(null);
    const [error, setError] = useState('');
    const router = useRouter();
    const { userId, accommodationId } = router.query;

    const handleBooking = async () => {
        try {
            const result = await book(userId, accommodationId);
            setAccommodation(prevState => ({
                ...prevState,
                bookedBy: [...prevState.bookedBy, userId] // Update to reflect that it's booked
            }));
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        if (accommodationId) {
            fetchAccommodation(accommodationId)
                .then(setAccommodation)
                .catch(error => {
                    setError(error.message);
                })
        }
    }, [accommodationId]);

    if (error) {
        return <div>{error}</div>
    }

    if (!accommodation) {
        return <div>Loading...</div>
    } else {
        if (accommodation.bookedBy.length !== 0) {
            fetchBooker(accommodation.bookedBy[0])
                .then(setBooker)
                .catch(err => {
                    setError(error.message);
                })
        }
    }

    return (
        <div className={"flex flex-col gap-3.5 m-10"}>
            <img src={accommodation.images} style={{ width: '300px', height: '300px' }} alt={accommodation.name}/>
            <h1 className={"font-bold"}>Accommodation {accommodation.name}</h1>
            <p>Location: {accommodation.location}</p>
            <p>Type: {accommodation.type}</p>
            <p>Price per night: {accommodation.pricePerNight}</p>
            {booker ? (
                <button className={"bg-red-500 text-white rounded-xl p-2 w-max"} disabled>Already booked</button>
            ) : (
                <button className={"bg-emerald-400 text-white rounded-xl p-2 w-max"} onClick={handleBooking}>Book place</button>
            )}
            {booker &&
                <h4>Booked by: {booker.name} {booker.surname}</h4>
            }

        </div>
    )
}