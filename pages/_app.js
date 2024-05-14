// pages/_app.js
import '../styles/globals.css'; // Import global styles if necessary
import Header from '../components/Header'; // Import the Header component

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Header />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
