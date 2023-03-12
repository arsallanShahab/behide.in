import { useGlobalContextProvider } from '@context/CartContext';
import { useRouter } from 'next/router';
import React, { use, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

const orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useGlobalContextProvider();
  const router = useRouter();

  const fetchOrders = async () => {
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
      return toast.error('No orders found');
    }
    if (success && orders.length > 0) {
      setOrders(() => orders);
      setLoading(() => false);
      localStorage.setItem('order', JSON.stringify(orders));
    }
    if (success) {
      toast.success('Orders loaded successfully');
    } else {
      toast.error(data.message);
      setLoading(() => false);
    }
  };

  useEffect(() => {
    const stoargeOrders = localStorage.getItem('order');
    const token = localStorage.getItem('token');
    if (stoargeOrders) {
      setOrders(() => JSON.parse(stoargeOrders));
      setLoading(() => false);
      return;
    }
    if (token && user?._id) {
      fetchOrders();
    }
  }, []);

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

  useEffect(() => {
    if (orders.length > 0) {
      setLoading(() => false);
    }
  }, [orders]);

  // useEffect(() => {
  //   const order = localStorage.getItem("order");
  //   if (order) {
  //     setOrders(() => JSON.parse(order));
  //   }
  // }, []);

  const excerpt = (str, start = 0, end = 70) => {
    return str?.length > end ? str.substring(start, end) + '...' : str;
  };

  return (
    <div className="flex flex-col gap-16">
      <div className="flex w-full justify-end">
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem('order');
            setOrders(() => []);
            setLoading(() => true);
            fetchOrders();
          }}
          className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>
      {orders && orders?.length > 0
        ? orders.map((order) => (
            <div key={order.id}>
              <div className="flex flex-col rounded-none">
                <div className="flex flex-wrap justify-between gap-6 rounded-t-lg rounded-b-none border bg-gray-50 px-8 py-6">
                  <div className="flex gap-9">
                    {/* <div>
                      <h3 className="text-xs  leading-6 text-gray-600">
                        ORDER PLACED
                      </h3>
                      <p className="mt-0.5 font-sora text-sm font-medium text-gray-900">
                        {new Date(order.created * 1000).toLocaleString()}
                      </p>
                    </div> */}
                    <div>
                      <h3 className="text-xs leading-6 text-gray-600">PAYMENT STATUS</h3>
                      <p className="mt-0.5 font-sora text-sm font-medium text-gray-900">
                        {order?.status?.payment_status}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs leading-6 text-gray-600">TOTAL</h3>
                      <p className="mt-0.5 font-sora text-sm font-medium text-gray-900">
                        {order?.order_summary?.total} {order?.currency?.toUpperCase()}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs leading-6 text-gray-600">ORDER STATUS</h3>
                      <p className="mt-0.5 font-sora text-sm font-medium text-gray-900">
                        {order?.status?.order_status}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs leading-6 text-gray-600">SHIPPING STATUS</h3>
                      <p className="mt-0.5 font-sora text-sm font-medium text-gray-900">
                        {order?.status?.shipping_status}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs leading-6 text-gray-600">SHIP TO</h3>
                      <p className="mt-0.5 font-sora text-sm font-medium  text-gray-900">
                        {order?.customer_details?.name}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs  leading-6 text-gray-600">ORDER #</h3>
                    <p className="mt-0.5 font-sora text-sm font-medium text-gray-900">
                      {order?._id}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                {order?.order_summary?.items?.map((item) => (
                  <div className="flex flex-wrap justify-start gap-9 rounded-t-none rounded-b-lg border bg-gray-50 p-3 px-8 py-6">
                    <img className="w-36 rounded-lg" src={`${item.thumbnail}`} />
                    {/* <div className="flex flex-col gap-2">
                      <h3 className="font-sora text-sm font-medium text-gray-900">
                        {item.name}
                      </h3>
                      <p className="font-sora text-sm font-medium text-gray-900">
                        {item.price} {order.currency.toUpperCase()}
                      </p>
                      <p className="font-sora text-sm font-medium text-gray-900">
                        Quantity: {item.quantity}
                      </p>
                    </div> */}
                    <div className="flex gap-9">
                      <div>
                        <h3 className="text-sm  leading-6 text-gray-600">PRODUCT</h3>
                        <p className="mt-0.5 max-w-md font-sora text-sm font-medium leading-[2] text-gray-900">
                          {item?.name}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm leading-6 text-gray-600">PRICE</h3>
                        <p className="mt-1 font-sora text-sm font-medium text-gray-900">
                          {item?.price} {order?.currency?.toUpperCase()}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm leading-6 text-gray-600">QUANTITY</h3>
                        <p className="mt-0.5 font-sora text-sm font-medium  text-gray-900">
                          {item?.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default orders;
