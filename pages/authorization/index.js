import Link from "next/link";

export default function Index() {
    return (
        <div className="flex flex-row items-center justify-center mt-20 space-x-4 w-full px-4">
            <div className="relative bg-emerald-400 text-emerald-50 p-4 pt-12 w-full max-w-xs rounded-lg">
                <div className="absolute top-0 left-0 right-0 bg-emerald-300 text-white rounded-t-lg p-2 text-3xl">
                    <h3 className="text-center font-bold">Sign up</h3>
                </div>
                <div className="flex flex-col items-center mt-4 space-y-2 text-2xl">
                    <Link href="/authorization/signup/" className="text-emerald-50 hover:text-green-200 transition-colors">
                        User
                    </Link>
                    <hr className="w-full h-0.5 bg-emerald-50"/>
                    <Link href="/authorization/signup/admin" className="text-emerald-50 hover:text-green-200 transition-colors">
                        Admin
                    </Link>
                </div>
            </div>
            <div className="relative bg-emerald-400 text-emerald-50 p-4 pt-12 w-full max-w-xs rounded-lg">
                <div className="absolute top-0 left-0 right-0 bg-emerald-300 text-white rounded-t-lg p-2 text-3xl">
                    <h3 className="text-center font-bold">Login</h3>
                </div>
                <div className="flex flex-col items-center mt-4 space-y-2 text-2xl">
                    <Link href="/authorization/login/" className="text-emerald-50 hover:text-green-200 transition-colors">
                        User
                    </Link>
                    <hr className="w-full h-0.5 bg-emerald-50"/>
                    <Link href="/authorization/login/admin" className="text-emerald-50 hover:text-green-200 transition-colors">
                        Admin
                    </Link>
                </div>
            </div>
        </div>
    );
}



