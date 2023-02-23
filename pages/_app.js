import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { CartProvider } from "../context/CartContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CartProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#000",
              color: "#fff",
              borderRadius: "99px",
              fontFamily: "Poppins",
              fontWeight: "500",
            },
          }}
        />
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </CartProvider>
    </>
  );
}

export default MyApp;
