import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCartProvider } from "../../context/CartContext";

const success = () => {
  const { query } = useRouter();
  const { session_id, ordered_items } = query;
  const [session, setSession] = useState(null);
  const {
    cartItems,
    setCartItems,
    setTotalQuantity,
    setTotalPrice,
    totalPrice,
    totalQuantity,
  } = useCartProvider();

  useEffect(() => {
    if (session_id && ordered_items) {
      fetch(`/api/checkout/session?session_id=${session_id}`)
        .then((response) => response.json())
        .then((data) => {
          const ord = JSON.parse(ordered_items);
          let tQty = 0;
          let tPr = 0;
          const ordItms = ord.map((item) => {
            const { id, name, price, quantity, thumbnail } = item;
            tQty += quantity;
            tPr += price * quantity;
            return {
              id,
              name,
              price,
              quantity,
              thumbnail,
            };
          });
          console.log({ ordItms, tQty, tPr });

          if (data.payment_status === "paid") {
            const storedOrder = JSON.parse(localStorage.getItem("order")) || [];
            const newOrder = [
              ...storedOrder,
              {
                cartItems: ordItms,
                totalPrice: tPr,
                totalQuantity: tQty,
                session_id,
              },
            ];
            const existingOrder = storedOrder.find(
              (order) => order.session_id === session_id
            );
            if (cartItems.length === 0) {
              console.log("cart is empty");
            }

            if (existingOrder) {
              console.log("order already exists");
            }
            if (ord.length > 0 && !existingOrder) {
              localStorage.setItem("order", JSON.stringify(newOrder));
              console.log("order added");
              localStorage.setItem("cart", JSON.stringify([]));
              setCartItems([]);
              setTotalPrice(0);
              setTotalQuantity(0);
            }
          }
          setSession(data);
        })
        .catch((error) => console.log(error));
    }
  }, [session_id, ordered_items]);

  return (
    <div className="h-full py-44 px-7 text-center sm:px-10">
      {session && (
        <>
          <h1 className="mb-5 font-sora text-4xl font-bold">
            {session.payment_status === "paid"
              ? "Order successful"
              : "Order not found"}
          </h1>
          {session.payment_status === "paid" ? (
            ""
          ) : (
            <p className="mx-auto max-w-md font-poppins font-semibold leading-[3]">
              we could not find your order. please contact us at{" "}
              <span className="inline-block rounded-xl bg-red-50 py-1 px-3 text-sm text-red-600">
                +91 23442 23424
              </span>{" "}
              or email us at{" "}
              <a href="mailto:mdarsallan @gmail.com">
                <span className="ml-2 inline-block rounded-xl bg-red-50 py-1 px-3 text-sm text-red-600">
                  mdarsallan @gmail.com
                </span>
              </a>
            </p>
          )}
          {session?.payment_status === "paid" ? (
            <p className="mx-auto mb-3 px-0 font-poppins font-medium leading-[3] sm:px-8">
              Your order ID is
              <span className="ml-2 inline-block break-all rounded-xl bg-red-50 py-1 px-3 text-sm text-red-600">
                {session_id}
              </span>
            </p>
          ) : null}
          <p className="mb-10 ml-1 font-poppins font-medium">
            {session?.payment_status === "paid"
              ? "We will send you a confirmation email with your order details."
              : ""}
          </p>
          <div>
            {session?.payment_status === "paid" ? (
              <p className="mb-8 font-poppins font-semibold">
                Thank you for shopping with us.
              </p>
            ) : (
              ""
            )}
            <div className="flex flex-wrap justify-center gap-3">
              {session?.payment_status === "paid" ? (
                <Link href="/orders" className="inline-block">
                  <p className="rounded-xl bg-blue-50 px-8 py-2 text-sm font-semibold text-blue-600">
                    View Order
                  </p>
                </Link>
              ) : (
                ""
              )}
              {session?.payment_status === "paid" ? (
                <Link href="/" className="inline-block">
                  <p className="rounded-xl bg-green-50 px-8 py-2 text-sm font-semibold text-green-600">
                    Continue Shopping
                  </p>
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default success;
