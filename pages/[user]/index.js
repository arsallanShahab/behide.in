import LogOut from '@/assets/log-out';
import ShoppingBag from '@/assets/shopping-bag';
import ShoppingCart from '@/assets/shopping-cart';
import User from '@/assets/user';
import { useGlobalContextProvider } from '@/context/GlobalContext';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Dashboard = (props) => {
  const { user, setUser } = useGlobalContextProvider();
  const [accountActive, setAccountActive] = useState(true);
  const [ordersActive, setOrdersActive] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/user/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!user && !token) {
      router.push('/user/login');
    }
  }, []);

  return (
    <section>
      <div className="mx-auto max-w-7xl px-10 py-20">
        <h1 className="text-4xl">Account</h1>
      </div>
    </section>
  );
};

export default Dashboard;
