import react, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [orderItems, setOrderItems] = useState([]);
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    let items = localStorage.getItem("cart");
    let order = localStorage.getItem("order");
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
  return (
    <CartContext.Provider
      value={{
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
      {children}
    </CartContext.Provider>
  );
};

export const useCartProvider = () => useContext(CartContext);
