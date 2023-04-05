import { decode } from 'jsonwebtoken';
import react, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState(null);

  const excerpt = (str, length = 30) => {
    if (str.length > length) {
      return str.substring(0, length) + '...';
    } else {
      return str;
    }
  };
  useEffect(() => {
    let items = localStorage.getItem('cart');
    let order = localStorage.getItem('order');
    order = JSON.parse(order);
    items = JSON.parse(items);
    if (items) {
      setCartItems(items);
      let totalPrice = 0;
      let totalQuantity = 0;
      items.forEach((item) => {
        totalPrice += item.price * item.quantity;
        totalQuantity += item.quantity;
      });
      setTotalQuantity(totalQuantity);
      setTotalPrice(totalPrice);
    }
  }, []);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = decode(token);
    if (decodedToken && decodedToken.exp * 1000 < new Date().getTime()) {
      localStorage.removeItem('token');
      setUser(null);
      return;
    }

    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/auth/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const { user, success } = await res.json();
        if (success) {
          setUser(() => {
            return {
              name: user.name,
              email: user.email,
              _id: user._id,
            };
          });
        }
      } catch (error) {
        toast.error('Something went wrong!');
      } finally {
        setLoading(false);
      }
    };
    if (token && token.length > 0 && !user) {
      fetchUser();
    }
  }, []);

  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    const handleScroll = () => {
      if (navbar) {
        if (window.scrollY > 0) {
          navbar.classList.add('navbar-active');
        } else {
          navbar.classList.remove('navbar-active');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantity,
        setTotalQuantity,
        quantity,
        setQuantity,
        excerpt,
      }}
    >
      {loading ? (
        <div className="fixed inset-0 z-[999] flex h-screen w-full items-center justify-center bg-white">
          <div className="loader"></div>
        </div>
      ) : null}
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContextProvider = () => useContext(GlobalContext);
