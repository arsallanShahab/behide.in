import Preloader from '@/components/preloader';
import { GlobalContextProvider } from '@/context/GlobalContext';
import Footer from '@components/Footer';
import Navbar from '@components/Navbar';
import '@styles/globals.css';

import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Preloader />
      <GlobalContextProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#000',
              color: '#fff',
              borderRadius: '99px',
              fontFamily: 'Poppins',
              fontWeight: '500',
            },
          }}
        />
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </GlobalContextProvider>
    </>
  );
}

export default MyApp;
