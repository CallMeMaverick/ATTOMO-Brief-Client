import Link from "next/link";
import {useRouter} from "next/router";

export default function AdminSidebar() {
    const router = useRouter();
    const { adminId } = router.query;

    const handleLogout = () => {
        // Clear the authentication token from local storage
        localStorage.removeItem('token');
        // Redirect to the login page
        router.push('/authorization/');
    };

    return (
        <aside className="flex flex-col items-center w-64 h-screen bg-emerald-400 fixed">
            <div className="flex flex-col justify-center items-center text-white m-5 gap-4">
                <Link className="hover:underline hover:text-green-200"
                      href={`/authorization/admin/${adminId}/`}>Users</Link>
                <Link className="hover:underline hover:text-green-200"
                      href={`/authorization/admin/${adminId}/accommodations`}>Accommodations</Link>
                <Link className="hover:underline hover:text-green-200"
                      href={`/authorization/admin/${adminId}/addAccommodation`}>Add accommodation</Link>
                <Link className="hover:underline hover:text-green-200 font-bold italic"
                      href={`/authorization/admin/${adminId}/profile`}>[ Profile ]</Link>
                <button className={"hover:text-red-400 hover:underline"} onClick={handleLogout}>Log out</button>
            </div>
        </aside>
    )
}