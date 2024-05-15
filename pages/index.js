import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center text-center mt-20">
            <h1 className="text-lg mb-4">Welcome to the homepage! From here we navigate</h1>

            <Link href="/authorization/"
                  className="hover:border-amber-50 hover:shadow-lg hover:scale-105 transform transition-all duration-300 flex flex-row justify-center gap-2 p-2 bg-emerald-400 shadow-md rounded-2xl text-emerald-50">
                Proceed to authorization
            </Link>
        </div>
    );
}
