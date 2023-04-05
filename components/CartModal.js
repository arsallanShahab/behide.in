import { ShoppingCart, Trash } from '@/assets';
import { useGlobalContextProvider } from '@/context/GlobalContext';
import { excerpt } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-hot-toast';
import ChevronRightButton from './arrow-right-btn';

const CartModal = () => {
  const { setShowCart, cartItems } = useGlobalContextProvider();

  return (
    <div className="fill-both fixed right-0 top-0 z-[999] h-full w-full animate-slide-in overflow-y-auto border-l bg-white px-6 pb-16 sm:w-[27rem]">
      <div className="sticky top-0 flex items-center justify-between gap-3 bg-white pb-6 pt-10">
        <h1 className="font-sora text-base font-semibold"> YOUR CART </h1>
        <ChevronRightButton custom label="Close" handler={() => setShowCart(false)} />
      </div>

      {cartItems.length !== 0 ? (
        <CartItems />
      ) : (
        <div className="flex h-3/4 flex-col items-center justify-center">
          <ShoppingCart className="w-20 stroke-black" />
          <h1 className="mt-4 mb-2 font-sora text-lg font-semibold">Your cart is empty</h1>
          <ChevronRightButton
            label="shop now"
            handler={() => setShowCart(false)}
            href="/products"
          />
        </div>
      )}
    </div>
  );
};

const CartItems = () => {
  const {
    cartItems,
    setCartItems,
    totalQuantity,
    setTotalQuantity,
    totalPrice,
    setTotalPrice,
    user,
  } = useGlobalContextProvider();

  const router = useRouter();
  const handleCheckout = async () => {
    toast.loading('Redirecting to checkout page');
    const token = localStorage.getItem('token');
    if (!user && !token) {
      toast.dismiss();
      toast.error('Please login to continue');
      return;
    }

    const response = await fetch('/api/stripe/checkout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartItems,
        client_reference_id: user._id,
        total_quantity: totalQuantity,
        total_price: totalPrice,
      }),
    });
    if (response.statusCode === 500) return;

    const session = await response.json();
    window.location.href = session.url;
  };

  const handleCheckoutCOD = async (e) => {
    toast.loading('Redirecting to checkout page');
    const token = localStorage.getItem('token');
    if (!user && !token) {
      toast.dismiss();
      toast.error('Please login to continue');
      return;
    }
    router.push('/checkout/cash-on-delivery');
  };

  return (
    <>
      <div className="flex flex-col rounded-xl border">
        {cartItems.map((item, i) => {
          return (
            <div className="flex flex-row border-b last:border-b-0" key={i}>
              <div className="flex items-center justify-center border-r p-3">
                <Image
                  alt={item.name}
                  src={item.thumbnail}
                  width={24}
                  height={24}
                  className="h-28 w-28 object-cover sm:h-24  sm:w-24"
                />
              </div>
              <div className="flex flex-grow flex-col items-stretch justify-between py-5 pl-3 pr-5">
                <div className="flex justify-between">
                  <h1 className="max-w-[185px] font-sora text-xs font-medium">
                    {excerpt(item.name, 60)}
                  </h1>
                  <Trash
                    onClick={() => {
                      const storageCart = JSON.parse(localStorage.getItem('cart'));
                      storageCart.forEach((cartItem) => {
                        if (cartItem.id === item.id) {
                          storageCart.splice(storageCart.indexOf(cartItem), 1);
                        }
                      });
                      localStorage.setItem('cart', JSON.stringify(storageCart));
                      setTotalPrice(totalPrice - item.price * item.quantity);
                      setTotalQuantity(totalQuantity - item.quantity);
                      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
                    }}
                    className="inline-block h-9 w-9 rounded-xl bg-red-50 stroke-red-500 p-2.5 text-red-500 hover:bg-red-100"
                  />
                </div>
                <div className="mt-4 flex flex-row items-center justify-between">
                  <h1 className="font-sora text-sm font-semibold">₹{item.price}</h1>
                  <div className="font-sora text-sm font-semibold">
                    <div className="flex flex-row items-center justify-between gap-2 rounded-md border bg-white p-1">
                      <button
                        onClick={() => {
                          const storageCart = JSON.parse(localStorage.getItem('cart'));

                          storageCart.forEach((cartItem) => {
                            if (cartItem.id === item.id) {
                              if (cartItem.quantity > 1) {
                                cartItem.quantity -= 1;
                              } else {
                                storageCart.splice(storageCart.indexOf(cartItem), 1);
                              }
                            }
                          });
                          localStorage.setItem('cart', JSON.stringify(storageCart));

                          if (item.quantity > 1) {
                            setTotalPrice(totalPrice - item.price);
                            setCartItems(
                              cartItems.map((cartItem) => {
                                if (cartItem.id === item.id) {
                                  return {
                                    ...cartItem,
                                    quantity: item.quantity - 1,
                                  };
                                }
                                return cartItem;
                              }),
                            );
                            setTotalQuantity(totalQuantity - 1);
                          } else {
                            setTotalPrice(totalPrice - item.price);
                            setTotalQuantity(totalQuantity - 1);
                            setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
                          }
                        }}
                        className="flex h-6 w-6 items-center justify-center rounded-md border bg-gray-50 font-sora font-semibold text-black duration-150 hover:bg-gray-100 active:scale-90 active:bg-gray-200"
                      >
                        -
                      </button>
                      <p className="font-sora text-base font-semibold text-gray-900">
                        {item.quantity}
                      </p>
                      <button
                        onClick={() => {
                          const storageCart = JSON.parse(localStorage.getItem('cart'));
                          setTotalPrice(totalPrice + item.price);
                          storageCart.forEach((cartItem) => {
                            if (cartItem.id === item.id) {
                              cartItem.quantity += 1;
                            }
                          });
                          localStorage.setItem('cart', JSON.stringify(storageCart));
                          setCartItems(
                            cartItems.map((cartItem) => {
                              if (cartItem.id === item.id) {
                                return {
                                  ...cartItem,
                                  quantity: item.quantity + 1,
                                };
                              }
                              return cartItem;
                            }),
                          );
                          setTotalQuantity(totalQuantity + 1);
                        }}
                        className="flex h-6 w-6 items-center justify-center rounded-md border bg-gray-50 font-sora font-semibold text-black duration-150 hover:bg-gray-100 active:scale-90 active:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <div className="mt-6 flex w-full flex-col rounded-xl border ">
          <div className="flex flex-row items-center justify-between border-b py-3 px-4">
            <h1 className="font-sora text-sm font-semibold">Total Quantity</h1>
            <h1 className="font-sora text-sm font-semibold">{totalQuantity}Qty.</h1>
          </div>
          <div className="flex flex-row items-center justify-between  py-3 px-4">
            <h1 className="font-sora text-sm font-semibold">Total</h1>
            <h1 className="font-sora text-sm font-semibold">₹{totalPrice}</h1>
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-3">
          <button
            onClick={handleCheckout}
            className="mt-6 flex-1 rounded-lg bg-indigo-600 px-3 py-3 font-sora font-semibold text-indigo-50 ring-indigo-200 duration-150 hover:bg-indigo-700 active:bg-indigo-700 active:ring-4"
          >
            Pay
          </button>
          {/* <button
            onClick={handleCheckoutCOD}
            className="mt-6 flex-1 rounded-lg bg-black px-3 py-4 text-center text-sm font-semibold text-green-50 ring-black/25 duration-150 hover:bg-black/95 active:bg-black/90 active:ring-4"
          >
            Cash on delivery
          </button> */}
        </div>
      </div>
    </>
  );
};

export default CartModal;
