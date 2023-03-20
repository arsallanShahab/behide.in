import { useGlobalContextProvider } from '@/context/GlobalContext';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const logout = () => {
  const { setUser } = useGlobalContextProvider();
  const router = useRouter();
  useEffect(() => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/user/login');
  }, []);
  return;
};

export default logout;
