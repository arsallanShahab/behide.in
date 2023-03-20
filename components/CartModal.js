import ArrowRight from '@/assets/arrow-right';
import ChevronRight from '@/assets/chevron-right';
import ShoppingCart from '@/assets/shopping-cart';
import { useGlobalContextProvider } from '@/context/GlobalContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-hot-toast';

const CartModal = () => {
  const { setShowCart, cartItems } = useGlobalContextProvider();

  const excerpt = (string) => {
    if (string.length > 60) {
      return string.slice(0, 60) + ' . . . ';
    } else {
      return string;
    }
  };

  return (
    <div className="fill-both fixed right-0 top-0 z-[999] h-full w-full animate-slide-in overflow-y-auto border-l bg-white px-6 pb-16 sm:w-[27rem]">
      <div className="sticky top-0 flex items-center justify-between gap-3 bg-white pb-6 pt-10">
        <h1 className="font-sora text-base font-semibold"> YOUR CART </h1>
        <button
          onClick={() => setShowCart(false)}
          className="inline-block rounded-xl px-3 py-2 text-sm font-semibold leading-6 text-black duration-100 hover:bg-rose-100 hover:text-rose-700 active:scale-95 active:bg-rose-200"
        >
          close
          <ChevronRight className="inline-block h-4 w-4 stroke-[3px]" />
        </button>
      </div>

      {cartItems.length !== 0 ? (
        <CartItems />
      ) : (
        <div className="flex h-3/4 flex-col items-center justify-center">
          <ShoppingCart className="w-20 stroke-black" />
          <h1 className="mt-4 font-sora text-lg font-semibold">Your cart is empty</h1>

          <Link onClick={() => setShowCart(false)} href="/products">
            <p className="mt-4 inline-block rounded-xl px-3 py-2 text-sm font-semibold leading-6 text-black duration-100 hover:bg-green-100 hover:text-green-700 active:scale-95 active:bg-green-200">
              Shop Now <ArrowRight className="-mt-[2.75px] inline-block h-3.5 w-3.5 stroke-[3px]" />
            </p>
          </Link>
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

  const excerpt = (string) => {
    if (string.length > 60) {
      return string.slice(0, 60) + ' . . . ';
    } else {
      return string;
    }
  };
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
                <h1 className="max-w-[185px] font-sora text-xs font-medium">
                  {excerpt(item.name)}
                </h1>
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
