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
    const token = Cookies.get();
    const tokenCookie = token?.token;

    let name = null;
    let email = null;
    let _id = null;

    if (tokenCookie) {
      const { name: userName, email: userEmail, _id: userId } = decode(tokenCookie);
      if (userName && userEmail && userId) {
        name = userName;
        email = userEmail;
        _id = userId;
      }
    }

    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/auth/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenCookie}`,
          },
        });
        const { user, ok } = await res.json();
        if (ok) {
          setUser(() => {
            return {
              name: user.name,
              email: user.email,
              _id: user._id,
            };
          });
        } else {
          toast.error(message);
        }
      } catch (error) {
        toast.error(JSON.stringify(error));
      } finally {
        setLoading(false);
        setFetchedUser(true);
      }
    };

    if (tokenCookie) {
      if (name && email && _id) {
        setUser(() => {
          return {
            name,
            email,
            _id,
          };
        });
      } else {
        fetchUser();
      }
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
// change to async await
// const getCookie = (name) => {
//   const cookies = document.cookie;
//   const cookie = cookies?.split(';').find((cookie) => cookie.includes(name));
//   return cookie;
// };

const getCookie = (name) => {
  return Cookies.get(name);
};

export const useGlobalContextProvider = () => useContext(GlobalContext);
