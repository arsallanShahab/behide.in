import Cookies from 'js-cookie';
import { decode } from 'jsonwebtoken';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
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
    const cookies = Cookies.get();
    // const token = localStorage.getItem('token');
    const getTokenCookie = cookies?.token;
    // console.log(getTokenCookie);
    // const decodedToken = decode(getTokenCookie);
    // if (decodedToken && decodedToken.exp * 1000 < new Date().getTime()) {
    //   localStorage.removeItem('token');
    //   setUser(null);
    //   return;
    // }

    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/auth/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenCookie}`,
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
        toast.error(res.message);
      } finally {
        setLoading(false);
        setFetchedUser(true);
      }
    };
    if (getTokenCookie && !user) {
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

function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

export const useGlobalContextProvider = () => useContext(GlobalContext);
