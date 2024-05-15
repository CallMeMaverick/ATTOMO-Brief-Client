import { Ubuntu } from "next/font/google";
import "./globals.css";
import Header from "@/app/Header";

const ubuntu = Ubuntu({ weight: "400", subsets: ["latin"] });

export const metadata = {
    title: "ATTOMO Brief",
    description: "Test Brief for ATTOMMO",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={ubuntu.className}>
                <Header />
                {children}
            </body>
        </html>
    );
}
