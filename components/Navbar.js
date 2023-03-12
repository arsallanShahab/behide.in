import Cart from '@/assets/shopping-cart.js';
import User from '@/assets/user.js';
import CartModal from '@components/CartModal.js';
import { useGlobalContextProvider } from '@context/CartContext.js';
import logo from '@public/behide-logo-new.png';
import jwt from 'jsonwebtoken';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const router = useRouter();
  const navbar = useRef(null);
  const { totalQuantity, showCart, setShowCart, user, setUser, isScrolled } =
    useGlobalContextProvider();
  useEffect(() => {
    const stoargeOrderedItems = JSON.parse(localStorage.getItem('order') || '[]');
    if (stoargeOrderedItems.length > 0) {
      setIsOrdered(true);
    } else {
      setIsOrdered(false);
    }
  }, [router.asPath]);

  const productCategory = [
    'Backpack',
    'Briefcase',
    'Laptop Bag',
    'Messenger Bag',
    'Luggage Bag',
    'Ladies Bag',
    'Belt',
    'Wallet',
    'Sling Bag',
    'Jacket',
  ];

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };
  const dropdownClick = () => {
    setDropdown((prev) => !prev);
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/user/login');
  };

  useEffect(() => {
    setDropdown(false);
    setOpen(false);
  }, [router.asPath]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        navbar.current.classList.add('navbar-active');
      } else {
        navbar.current.classList.remove('navbar-active');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
        ref={navbar}
        className="group/header header sticky top-0 z-[100] flex w-full flex-row flex-wrap items-center justify-between py-3 px-3 text-black duration-150 lg:px-8"
      >
        <div className="max-w-[80px] rounded-lg p-4 pr-0">
          <Link href="/">
            <Image src={logo} alt="behide logo" className="w-full" />
          </Link>
        </div>
        <div
          style={{ top: open ? '100%' : '-600%' }}
          className="absolute left-0 top-full flex w-full items-center justify-end lg:relative lg:top-auto lg:w-auto"
        >
          <ul className="box-shadow-hover z-500 m-0 flex w-full flex-col items-center gap-1 border bg-white py-8 font-sora text-sm font-medium lg:right-auto lg:z-auto lg:w-auto lg:flex-row lg:border-none lg:bg-transparent  lg:p-0 lg:shadow-none">
            <li className="w-full px-6 py-1 lg:w-auto lg:py-0 lg:px-0">
              <Link
                className="inline-block w-full rounded-lg px-3 py-3 duration-200 ease-in-out hover:text-slate-500 md:w-auto"
                href="/"
              >
                home
              </Link>
            </li>
            <li className="w-full px-6 py-1 lg:w-auto lg:py-0 lg:px-0">
              <div
                onClick={dropdownClick}
                className="relative inline-block w-full origin-top-left cursor-pointer items-center rounded-lg px-3 py-3 duration-200 hover:text-slate-500 md:w-auto"
              >
                <div className="flex justify-start sm:justify-center">
                  <div className="relative inline-block">
                    <span className="mx-1 mt-1 inline-block">category</span>
                    <svg
                      style={{
                        transform: dropdown ? 'rotate(0deg)' : 'rotate(-90deg)',
                      }}
                      className="mx-1 inline-block h-5 w-5 rotate-90 transition-transform duration-200"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <div
                      style={{
                        opacity: dropdown ? 1 : 0,
                        transform: dropdown
                          ? 'scale(1) translateY(0px)'
                          : 'scale(.8) translateY(-10px)',
                        visibility: dropdown ? 'visible' : 'hidden',
                      }}
                      className="absolute top-full -left-3 z-20 mt-4 w-40 origin-top-left overflow-hidden rounded-xl border bg-white p-2 py-2 font-semibold shadow-xl duration-200"
                    >
                      {productCategory.map((item, index) => {
                        return (
                          <Link
                            key={index}
                            href={`/products/category/${item.toLowerCase()}`}
                            className="hover:text-brandBlack block transform rounded-md px-4 py-3 text-[0.8rem] font-normal capitalize text-black  duration-200 hover:bg-gray-100"
                          >
                            {item}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="w-full px-6 py-1 lg:w-auto lg:py-0 lg:px-0">
              <Link
                className="inline-block w-full rounded-lg px-3 py-3 duration-200 hover:text-slate-500 md:w-auto"
                href="/products"
              >
                products
              </Link>
            </li>
            <li className="w-full px-6 py-1 lg:w-auto lg:py-0 lg:px-0">
              <Link
                className="inline-block w-full rounded-lg px-3 py-3 duration-200 hover:text-slate-500 md:w-auto"
                href="/bulk-corporate"
              >
                bulk & corporate
              </Link>
            </li>
            <li className="w-full px-6 py-1 lg:w-auto lg:py-0 lg:px-0">
              <Link
                className="inline-block w-full rounded-lg px-3 py-3 duration-200 hover:text-slate-500 md:w-auto"
                href="/hot-products"
              >
                hot products
              </Link>
            </li>
            <li className="w-full px-6 py-1 lg:w-auto lg:py-0 lg:px-0">
              <Link
                className="inline-block w-full rounded-lg px-3 py-3 duration-200 hover:text-slate-500 md:w-auto"
                href="/about-us"
              >
                about us
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-row flex-wrap gap-3">
          {user ? (
            //create a dropdown
            <>
              <div className="group relative">
                <p className="inline-block cursor-pointer rounded-xl bg-gray-50 px-6 py-3 font-medium text-black duration-150  hover:bg-green-100 active:scale-90 active:bg-green-200">
                  {user?.name.split(' ')[0] || 'USER'}
                </p>

                <div className="invisible absolute top-3/4 right-0 z-20 w-40 origin-top-right scale-75 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-2 py-2 opacity-0 shadow-xl duration-200 group-hover:visible group-hover:scale-100 group-hover:opacity-100 ">
                  <Link
                    href="/user/profile"
                    className="block transform rounded-md px-4 py-3 text-[0.8rem] font-normal capitalize text-black transition-[background]  duration-200 hover:bg-white  hover:font-semibold hover:text-green-900"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/user/logout"
                    className="block transform rounded-md px-4 py-3 text-[0.8rem] font-normal capitalize text-black transition-[background]  duration-200 hover:bg-white hover:font-semibold hover:text-green-900"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <Link
              href="/user/login"
              className="inline-block cursor-pointer rounded-xl bg-white px-4 py-3 font-medium text-black duration-150  hover:bg-gray-100 active:scale-90 active:bg-green-200"
            >
              <User className="inline-block w-6 stroke-black" />
            </Link>
          )}
          <a
            onClick={() => setShowCart(true)}
            className="relative inline-block cursor-pointer rounded-xl bg-gray-50 px-4 py-3 duration-150  hover:bg-gray-100 active:scale-90 active:bg-green-200"
          >
            <Cart className="inline-block w-5 stroke-black" />
            <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gray-700 text-xs text-white">
              {totalQuantity}
            </div>
          </a>
        </div>
        <div
          onClick={toggleMenu}
          className="group/menu block h-auto max-w-[50px] cursor-pointer pr-3 lg:hidden"
        >
          <Image alt="menu-button" src="/menu.svg" width={30} height={30} />
        </div>
      </div>
      {showCart && <CartModal />}
      {showCart && (
        <div
          onClick={() => setShowCart(false)}
          className="fixed inset-0 z-[200] bg-black opacity-50"
        ></div>
      )}
      {/* <div
        style={{
          marginTop: navbar.current.offsetHeight + "px",
        }}
        className="block h-[1px] w-full"
      ></div> */}
    </>
  );
};

export default Navbar;
