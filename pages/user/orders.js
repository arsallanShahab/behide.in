import ArrowRight from '@/assets/arrow-right';
import { useGlobalContextProvider } from '@/context/GlobalContext';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useGlobalContextProvider();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    toast.loading('Loading orders...');
    // const token = localStorage.getItem('token');
    const response = await fetch(`/api/stripe/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify({
        id: user?._id,
      }),
    });
    const { ok, orders } = await response.json();
    console.log(orders);
    if (ok) {
      toast.dismiss();
      if (orders.length === 0) {
        toast.error('You have no orders');
      }
      setOrders(() => orders);
      toast.success('Orders loaded successfully');
    } else {
      toast.dismiss();
      toast.error('Something went wrong');
    }
  };

  const cancelOrder = async (id) => {
    toast.loading('Cancelling order...');
    // const token = localStorage.getItem('token');
    const response = await fetch(`/api/stripe/orders/cancel/?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
    });
    const { ok, message } = await response.json();
    if (ok) {
      toast.dismiss();
      toast.success(message);
      fetchOrders();
    } else {
      toast.dismiss();
      toast.error(message);
    }
  };

  return (
    <div className="flex flex-col gap-7 py-20 px-10 md:px-20">
      <h1 className="mb-10 text-5xl">Orders</h1>
      {orders &&
        orders.map((order, id) => (
          <div key={id}>
            <div
              style={
                order?.delivery_status.includes('cancelled')
                  ? { backgroundColor: '#f7f7f7', opacity: 0.75, userSelect: 'none' }
                  : { backgroundColor: '#fff', opacity: 1, userSelect: 'inherit' }
              }
              className="flex flex-col rounded-none"
            >
              <div className="flex flex-wrap justify-between gap-6 rounded-t-2xl rounded-b-none border-[1px] p-3">
                <div className="flex flex-1 flex-col gap-2 md:flex-auto md:flex-row">
                  {/* <div>
                      <h3 className="text-xs  leading-6 text-gray-600">
                        ORDER PLACED
                      </h3>
                      <p className="mt-0.5 font-sora text-sm font-medium text-gray-900">
                        {new Date(order.created * 1000).toLocaleString()}
                      </p>
                    </div> */}
                  <div>
                    <h3 className="rounded-t-xl border bg-gray-100 px-3 py-1.5 text-xs font-semibold lowercase leading-6 text-black">
                      payment status
                    </h3>
                    <p className="mt-0.3 rounded-b-xl bg-gray-50 px-3 pt-3 pb-3.5 text-sm font-medium text-black">
                      {order?.payment_status}
                    </p>
                  </div>
                  <div>
                    <h3 className="rounded-t-xl border bg-gray-100 px-3 py-1.5 text-xs font-semibold lowercase leading-6 text-black">
                      TOTAL
                    </h3>
                    <p className="mt-0.3 rounded-b-xl bg-gray-50 px-3 pt-3 pb-3.5 text-sm font-medium text-black">
                      ₹{order?.total}
                    </p>
                  </div>
                  <div>
                    <h3 className="rounded-t-xl border bg-gray-100 px-3 py-1.5 text-xs font-semibold lowercase leading-6 text-black">
                      ORDER STATUS
                    </h3>
                    <p className="mt-0.3 rounded-b-xl bg-gray-50 px-3 pt-3 pb-3.5 text-sm font-medium text-black">
                      {order?.delivery_status}
                    </p>
                  </div>

                  <div className="max-w-[250px]">
                    <h3 className="rounded-t-xl border bg-gray-100 px-3 py-1.5 text-xs font-semibold lowercase leading-6 text-black">
                      SHIP TO
                    </h3>
                    <p className="mt-0.3 rounded-b-xl bg-gray-50 px-3 pt-3 pb-3.5 text-sm font-medium text-black">
                      {order?.shipping?.address?.line1}, {order?.shipping?.address?.line2},{' '}
                      {order?.shipping?.address?.city}, {order?.shipping?.address?.state},{' '}
                      {order?.shipping?.address?.postal_code}, {order?.shipping?.address?.country}
                    </p>
                  </div>
                  <div>
                    <h3 className="rounded-t-xl border bg-gray-100 px-3 py-1.5 text-xs font-semibold lowercase leading-6 text-black">
                      ORDERED ON
                    </h3>
                    <p className="mt-0.3 rounded-b-xl bg-gray-50 px-3 pt-3 pb-3.5 text-sm font-medium text-black">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex-grow sm:flex-grow-0">
                  <h3 className="rounded-t-xl border bg-gray-100 px-3 py-1.5 text-xs font-semibold lowercase leading-6 text-black">
                    ORDER ID
                  </h3>
                  <p className="mt-0.3 rounded-b-xl bg-gray-50 px-3 pt-3 pb-3.5 text-sm font-medium text-black">
                    #{order?._id}
                  </p>
                </div>
              </div>
              {order?.items.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-wrap justify-start gap-9 rounded-t-none rounded-b-2xl border border-t-0 p-3 px-8 py-6 "
                >
                  <img className="w-20 rounded-lg" src={`${item?.images}`} />
                  <div className="flex flex-col gap-9 md:flex-row">
                    <div>
                      <h3 className="text-xs leading-6 text-gray-600">PRODUCT</h3>
                      <p className="mt-0.5 max-w-md text-xs font-medium leading-[2] text-gray-900">
                        {item?.name}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs leading-6 text-gray-600">PRICE</h3>
                      <p className="mt-1 text-xs font-medium text-gray-900">₹{item?.unit_amount}</p>
                    </div>
                    <div>
                      <h3 className="text-xs leading-6 text-gray-600">QUANTITY</h3>
                      <p className="mt-0.5 text-xs font-medium  text-gray-900">{item?.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end py-5">
              <button
                style={
                  order?.delivery_status.includes('cancelled')
                    ? { display: 'none' }
                    : { display: 'block' }
                }
                onClick={() => cancelOrder(order._id)}
                className="inline-block rounded-xl px-3 py-2 text-sm font-semibold leading-6 text-black duration-100 hover:bg-gray-100 active:scale-95 active:bg-gray-200"
              >
                Cancel Order <ArrowRight className="inline-block h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default orders;
