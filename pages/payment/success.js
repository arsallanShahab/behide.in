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
  const { setCartItems, setTotalQuantity, setTotalPrice } = useGlobalContextProvider();

  useEffect(() => {
    if (session_id) {
      const s = stripe.checkout.sessions.retrieve(session_id);
      console.log(s?.line_items);
      fetch(`/api/checkout/session?session_id=${session_id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.payment_status === 'paid') {
            localStorage.setItem('cart', JSON.stringify([]));
            setCartItems([]);
            setTotalPrice(0);
            setTotalQuantity(0);
          }
          setSession(() => data);
        })
        .catch((error) => console.log(error));
    }
  }, [session_id]);

  return (
    <div className="h-full py-44 px-7 text-center sm:px-10">
      {session && (
        <>
          <h1 className="mb-5 font-sora text-4xl font-bold">
            {session.payment_status === 'paid' ? 'Order successful' : 'Order not found'}
          </h1>
          {session.payment_status === 'paid' ? (
            ''
          ) : (
            <p className="mx-auto max-w-md font-poppins font-semibold leading-[3]">
              we could not find your order. please contact us at{' '}
              <span className="inline-block rounded-xl bg-red-50 py-1 px-3 text-sm text-red-600">
                +91 23442 23424
              </span>{' '}
              or email us at{' '}
              <a href="enquiries.behideindia@gmail.com">
                <span className="ml-2 inline-block rounded-xl bg-red-50 py-1 px-3 text-sm text-red-600">
                  enquiries.behideindia@gmail.com
                </span>
              </a>
            </p>
          )}
          {session?.payment_status === 'paid' ? (
            <p className="mx-auto mb-3 px-0 font-poppins font-medium leading-[3] sm:px-8">
              Your order ID is
              <span className="ml-2 inline-block break-all rounded-xl bg-red-50 py-1 px-3 text-sm text-red-600">
                {session_id}
              </span>
            </p>
          ) : null}
          <p className="mb-10 ml-1 font-poppins font-medium">
            {session?.payment_status === 'paid'
              ? 'We will send you a confirmation email with your order details.'
              : ''}
          </p>
          <div>
            {session?.payment_status === 'paid' ? (
              <p className="mb-8 font-poppins font-semibold">Thank you for shopping with us.</p>
            ) : (
              ''
            )}
            <div className="flex flex-wrap justify-center gap-3">
              {session?.payment_status === 'paid' ? (
                <Link href="/products" className="inline-block">
                  <p className="rounded-xl bg-green-50 px-8 py-2 text-sm font-semibold text-green-600">
                    Continue Shopping
                  </p>
                </Link>
              ) : (
                ''
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default success;
