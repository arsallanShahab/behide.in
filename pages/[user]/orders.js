import ArrowRight from '@/assets/arrow-right';
import { useGlobalContextProvider } from '@/context/GlobalContext';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useGlobalContextProvider();
  const router = useRouter();

  const fetchOrders = async () => {
    toast.loading('Loading orders...');
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/stripe/orders/?id=${user?._id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const { success, orders } = await response.json();
    if (orders.length === 0) {
      toast.dismiss();
      return toast.error('No orders found');
    }
    if (success) {
      setOrders(() => orders);
      setLoading(() => false);
    }
    if (success && orders.length > 0) {
      toast.dismiss();
      toast.success('Orders loaded successfully');
    }
  };

  const cancelOrder = async (id) => {
    toast.loading('Cancelling order...');
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/stripe/orders/cancel/?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const { success, message } = await response.json();
    if (success) {
      toast.dismiss();
      toast.success(message);
      fetchOrders();
    }
    if (!success) {
      toast.dismiss();
      toast.error(message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && user?._id) {
      fetchOrders();
    }
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.removeItem('user');
      router.push('/user/login');
    }
    if (!user && !token) {
      router.push('/user/login');
    }
  }, []);

  const excerpt = (str, start = 0, end = 70) => {
    return str?.length > end ? str.substring(start, end) + '...' : str;
  };

  return (
    <div className="flex flex-col gap-7 p-20">
      <h1 className="mb-10 text-5xl">Orders</h1>
      {orders && orders?.length > 0
        ? orders.map((order) => (
            <div key={order.id}>
              <div
                style={
                  order?.status?.order_status.includes('cancelled')
                    ? { backgroundColor: '#f7f7f7', opacity: 0.75, userSelect: 'none' }
                    : { backgroundColor: '#fff', opacity: 1, userSelect: 'inherit' }
                }
                className="flex flex-col rounded-none"
              >
                <div className="flex flex-wrap justify-between gap-6 rounded-t-2xl rounded-b-none border-[1px] p-3">
                  <div className="flex gap-2">
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
                        {order?.status?.payment_status}
                      </p>
                    </div>
                    <div>
                      <h3 className="rounded-t-xl border bg-gray-100 px-3 py-1.5 text-xs font-semibold lowercase leading-6 text-black">
                        TOTAL
                      </h3>
                      <p className="mt-0.3 rounded-b-xl bg-gray-50 px-3 pt-3 pb-3.5 text-sm font-medium text-black">
                        ₹{order?.order_summary?.total}
                      </p>
                    </div>
                    <div>
                      <h3 className="rounded-t-xl border bg-gray-100 px-3 py-1.5 text-xs font-semibold lowercase leading-6 text-black">
                        ORDER STATUS
                      </h3>
                      <p className="mt-0.3 rounded-b-xl bg-gray-50 px-3 pt-3 pb-3.5 text-sm font-medium text-black">
                        {order?.status?.order_status}
                      </p>
                    </div>

                    <div>
                      <h3 className="rounded-t-xl border bg-gray-100 px-3 py-1.5 text-xs font-semibold lowercase leading-6 text-black">
                        SHIP TO
                      </h3>
                      <p className="mt-0.3 rounded-b-xl bg-gray-50 px-3 pt-3 pb-3.5 text-sm font-medium text-black">
                        {order?.customer_details?.name}
                      </p>
                    </div>
                    <div>
                      <h3 className="rounded-t-xl border bg-gray-100 px-3 py-1.5 text-xs font-semibold lowercase leading-6 text-black">
                        ORDERED DATE
                      </h3>
                      <p className="mt-0.3 rounded-b-xl bg-gray-50 px-3 pt-3 pb-3.5 text-sm font-medium text-black">
                        {new Date(order.created * 1000).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="rounded-t-xl border bg-gray-100 px-3 py-1.5 text-xs font-semibold lowercase leading-6 text-black">
                      ORDER ID
                    </h3>
                    <p className="mt-0.3 rounded-b-xl bg-gray-50 px-3 pt-3 pb-3.5 text-sm font-medium text-black">
                      #{order?._id}
                    </p>
                  </div>
                </div>
                {order?.order_summary?.items?.map((item) => (
                  <div className="flex flex-wrap justify-start gap-9 rounded-t-none rounded-b-2xl border border-t-0 p-3 px-8 py-6">
                    <img className="w-20 rounded-lg" src={`${item.thumbnail}`} />
                    <div className="flex gap-9">
                      <div>
                        <h3 className="text-xs leading-6 text-gray-600">PRODUCT</h3>
                        <p className="mt-0.5 max-w-md text-xs font-medium leading-[2] text-gray-900">
                          {item?.name}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xs leading-6 text-gray-600">PRICE</h3>
                        <p className="mt-1 text-xs font-medium text-gray-900">₹{item?.price}</p>
                      </div>
                      <div>
                        <h3 className="text-xs leading-6 text-gray-600">QUANTITY</h3>
                        <p className="mt-0.5 text-xs font-medium  text-gray-900">
                          {item?.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end py-5">
                <button
                  style={
                    order?.status?.order_status.includes('cancelled')
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
          ))
        : null}
    </div>
  );
};

export default orders;
