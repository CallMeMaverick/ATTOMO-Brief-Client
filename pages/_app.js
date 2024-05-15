import '../styles/globals.css';
import { useState, useEffect, useMemo } from 'react';
import UserLayout from "../components/UserLayout";
import AdminLayout from "../components/AdminLayout";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AdminSidebar from "../components/AdminSidebar";

export default function MyApp({ Component, pageProps, router }) {
    const userPath = router.pathname.startsWith("/authorization/[userId]");
    const adminPath = router.pathname.startsWith("/authorization/admin/[adminId]");

    // Memoizing the Header component to ensure it does not re-render unnecessarily.
    // This helps in improving performance by avoiding re-creation of the Header component
    // on every render of the MyApp component.
    const memoizedHeader = useMemo(() => <Header />, []);

    // Memoizing the Sidebar component for the same reasons as above.
    // It ensures that the Sidebar component is stable and does not re-render
    // unless specifically needed.
    const memoizedSidebar = useMemo(() => <Sidebar />, []);

    // Memoizing the AdminSidebar component to maintain consistent performance.
    // This avoids unnecessary re-renders and re-creations of the AdminSidebar component
    // when the MyApp component re-renders.
    const memoizedAdminSidebar = useMemo(() => <AdminSidebar />, []);

    const [userLayoutState, setUserLayoutState] = useState({
        header: memoizedHeader,
        sidebar: memoizedSidebar
    });

    const [adminLayoutState, setAdminLayoutState] = useState({
        header: memoizedHeader,
        adminSidebar: memoizedAdminSidebar
    });

    useEffect(() => {
        if (adminPath) {
            // Setting the admin layout state with memoized components ensures
            // that the header and sidebar are not recreated on every state change.
            setAdminLayoutState({
                header: memoizedHeader,
                adminSidebar: memoizedAdminSidebar
            });
        } else if (userPath) {
            // Setting the user layout state with memoized components for the same reason.
            // This avoids unnecessary re-renders and keeps the layout components stable.
            setUserLayoutState({
                header: memoizedHeader,
                sidebar: memoizedSidebar
            });
        }
    }, [userPath, adminPath]);

    return (
        <>

            {adminPath ? (
                <AdminLayout header={adminLayoutState.header} sidebar={adminLayoutState.adminSidebar}>
                    <Component {...pageProps} />
                </AdminLayout>
            ) : userPath ? (
                <UserLayout header={userLayoutState.header} sidebar={userLayoutState.sidebar}>
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




