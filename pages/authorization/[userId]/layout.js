import { Ubuntu } from 'next/font/google';

const ubuntu = Ubuntu({ weight: '400', subsets: ["greek"] });

export default function UserLayout({ children }) {
    return (
        <div className={ubuntu.className}>
            <div className="">
                {children}
            </div>
        </div>
    );
}