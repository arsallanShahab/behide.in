import { useGlobalContextProvider } from '@/context/GlobalContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Stripe from 'stripe';
const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const success = () => {
  const { query } = useRouter();
  const { session_id } = query;
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setCartItems, setTotalQuantity, setTotalPrice } = useGlobalContextProvider();

  useEffect(() => {
    if (session_id) {
      setLoading(true);
      const s = stripe.checkout.sessions.retrieve(session_id);
      fetch(`/api/checkout/session?session_id=${session_id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.payment_status === 'paid') {
            console.log(data);
            localStorage.setItem('cart', JSON.stringify([]));
            setCartItems([]);
            setTotalPrice(0);
            setTotalQuantity(0);
          }
          setSession(() => data);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, [session_id]);

  return (
    <div className="h-full py-44 px-7 text-center sm:px-10">
      {
        // If the page is still loading, display a loading message
        loading ? (
          <div className="flex items-center justify-center py-10 px-5">
            <span className="loader"></span>
          </div>
        ) : (
          // If the payment was successful, display a success message
          session?.payment_status === 'paid' && (
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-semibold">Payment Successful</h1>
              <p className="mt-2 text-sm font-semibold text-gray-500">
                Thank you for your purchase. Your order will be shipped shortly.
              </p>
              <Link
                href="/"
                className="mt-5 rounded-md bg-green-500 px-5 py-2 text-sm font-semibold text-white hover:bg-green-600"
              >
                Back to Home
              </Link>
            </div>
          )
        )
      }
    </div>
  );
};

export default success;
