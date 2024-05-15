import { Ubuntu } from 'next/font/google';
import Sidebar from "../../../components/Sidebar";

const ubuntu = Ubuntu({ weight: '400' });

export default function UserLayout({ children }) {
    return (
        <div className={ubuntu.className}>
            <div className="">
                {children}
            </div>
        </div>
    );
}