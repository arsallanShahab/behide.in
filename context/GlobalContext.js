import Cookies from 'js-cookie';
import { decode } from 'jsonwebtoken';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState(null);
  const [fetchedUser, setFetchedUser] = useState(null);
  const [cookie, setCookie] = useState(null);
  useEffect(() => {
    let items = localStorage.getItem('cart');
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
    // const token = localStorage.getItem('token');
    // const getTokenCookie = cookies?.token;
    // console.log(getTokenCookie);
    // const decodedToken = decode(getTokenCookie);
    // if (decodedToken && decodedToken.exp * 1000 < new Date().getTime()) {
    //   localStorage.removeItem('token');
    //   setUser(null);
    //   return;
    // }
    // const tokenCookie = Cookies.get('token');

    // const token = Cookies.get('token');
    const token = getCookie('token');
    const tokenValue = token?.split('=')[1];

    if (tokenValue) {
      const decodedToken = decode(tokenValue);
      setUser(() => {
        return {
          name: decodedToken.name,
          email: decodedToken.email,
          _id: decodedToken._id,
        };
      });
    }

    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenValue}`,
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
        toast.error(JSON.stringify(error));
      } finally {
        setLoading(false);
        setFetchedUser(true);
      }
    };
    if (token && !user) {
      setLoading(true);
      fetchUser();
    }
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
        fetchedUser,
        setFetchedUser,
      }}
    >
      {loading ? (
        <div
          style={{ background: '#fff' }}
          className="fixed inset-0 z-[999] flex h-full w-full items-center justify-center bg-white"
        >
          <div className="loader"></div>
        </div>
      ) : null}
      {children}
    </GlobalContext.Provider>
  );
};

const ScrollToTopButton = () => {
  return (
    <div className="fixed bottom-0 right-0 z-[999] flex h-32 w-32 items-center justify-center bg-white">
      <div></div>
    </div>
  );
};

const getCookie = (name) => {
  const cookies = document.cookie;
  const cookie = cookies?.split(';').find((cookie) => cookie.includes(name));
  return cookie;
};

export const useGlobalContextProvider = () => useContext(GlobalContext);
