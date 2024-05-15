import '../styles/globals.css';
import { useState, useEffect } from 'react';
import UserLayout from "../components/UserLayout";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function MyApp({ Component, pageProps, router }) {
    const userPath = router.pathname.startsWith("/authorization/[userId]");

    const [layoutState, setLayoutState] = useState({
        header: null,
        sidebar: null
    });

    useEffect(() => {
        if (userPath && (!layoutState.header || !layoutState.sidebar)) {
            setLayoutState({
                header: <Header />,
                sidebar: <Sidebar />
            });
        }
    }, [userPath]);

    return (
        <>
            {userPath ? (
                <UserLayout header={layoutState.header} sidebar={layoutState.sidebar}>
                    <Component {...pageProps} />
                </UserLayout>
            ) : (
                <>
                    <Header />
                    <Component {...pageProps} />
                </>
            )}
        </>
    );
}


