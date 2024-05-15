import Link from "next/link";
import {useRouter} from "next/router";

export default function AdminSidebar() {
    const router = useRouter();
    const { adminId } = router.query;
    console.log("ID ",adminId);

    return (
        <aside className="flex flex-col items-center w-64 h-screen bg-emerald-400 fixed">
            <div className="flex flex-col justify-center items-center text-white m-5 gap-4">
                <Link className="hover:underline hover:text-green-200"
                      href={`/authorization/${adminId}/`}>Users</Link>
                <Link className="hover:underline hover:text-green-200"
                      href={`/authorization/${adminId}/bookings`}>Accommodations</Link>
            </div>
        </aside>
    )
}