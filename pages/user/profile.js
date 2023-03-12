import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Orders from '../../components/orders';
import { useGlobalContextProvider } from '../../context/CartContext';

const dashboard = () => {
  const { user, setUser } = useGlobalContextProvider();
  const [accountActive, setAccountActive] = useState(true);
  const [ordersActive, setOrdersActive] = useState(false);
  const router = useRouter();

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/user/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.removeItem('user');
      router.push('/user/login');
      setUser(null);
    }

    if (!user && !token) {
      router.push('/user/login');
    }
  }, []);

  return (
    <div>
      <div className="mx-auto px-4 pt-16 pb-32 sm:px-6 lg:px-12">
        {/* <div className="flex  flex-row items-center justify-between py-12">
          <h2 className=" font-sora text-3xl font-bold capitalize text-brandBlack sm:text-5xl">
            Account
          </h2>
          <button
            type="button"
            onClick={logout}
            className="inline-block items-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2"
          >
            Logout
          </button>
        </div> */}
        {user && (
          <div className="">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setAccountActive(true);
                  setOrdersActive(false);
                }}
                className={`mt-3 inline-block rounded-xl px-3.5 py-4 text-left sm:px-6 ${
                  accountActive ? 'button-active' : 'button-inactive'
                }`}
              >
                <h3 className="text-lg font-bold leading-6">User Information</h3>
                <p className="mt-1 max-w-2xl text-sm">Personal details and application.</p>
              </button>
              <button
                type="button"
                onClick={() => {
                  setAccountActive(false);
                  setOrdersActive(true);
                }}
                className={`mt-3 inline-block rounded-xl px-3.5 py-4 text-left sm:px-6 ${
                  ordersActive ? 'button-active' : 'button-inactive'
                }`}
              >
                <h3 className="text-xl font-bold leading-6 text-black">Your Orders</h3>
                <p className="mt-1 max-w-2xl text-sm text-black/50">Track or buy things again</p>
              </button>
            </div>
            <div className="mt-16">
              {accountActive && <Account />}
              {ordersActive && <Orders />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Account = () => {
  const { user } = useGlobalContextProvider();
  return (
    <div className="rounded-xl bg-gray-50 px-6 py-6">
      <dl>
        <div className="rounded-xl bg-white px-6 py-7 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-lg font-medium text-gray-500">Full name</dt>
          <dd className="mt-1 text-lg text-gray-900 sm:col-span-2 sm:mt-0">{user.name}</dd>
        </div>
        <div className="mt-5 rounded-xl bg-white px-6 py-7 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-lg font-medium text-gray-500">Email address</dt>
          <dd className="mt-1 text-lg text-gray-900 sm:col-span-2 sm:mt-0">{user.email}</dd>
        </div>
      </dl>
    </div>
  );
};

export default dashboard;
