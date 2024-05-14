// pages/index.js
import '../styles/globals.css'; // Import global styles if necessary
import Header from '../components/Header';
import Sidebar from "../components/Sidebar"; // Import the Header component

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Header />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
