import { useGlobalContextProvider } from '@/context/GlobalContext';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const logout = () => {
  const { setUser } = useGlobalContextProvider();
  const router = useRouter();
  useEffect(() => {
    setUser(null);
    // generate code to delete the token from cookie
    // and redirect to login page use native cookie api like document.cookie
    Cookies.remove('token');

    if (Cookies.get('token')) {
      Cookies.remove('token');
    }
    // const cookies = document.cookie.split(';');
    // for (let i = 0; i < cookies.length; i++) {
    //   const cookie = cookies[i];
    //   const eqPos = cookie.indexOf('=');
    //   const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    //   document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    // }
    router.push('/user/login');
  }, []);
  return;
};

export default logout;
