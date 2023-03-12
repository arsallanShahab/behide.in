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
  const [orderItems, setOrderItems] = useState([]);
  const [ordered, setOrdered] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let items = localStorage.getItem('cart');
    let order = localStorage.getItem('order');
    order = JSON.parse(order);
    if (order) {
      setOrderItems(order);
    }
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
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (token && token.length > 0 && !user) {
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
        orderItems,
        setOrderItems,
        ordered,
        setOrdered,
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
