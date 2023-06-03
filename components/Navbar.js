import { ChevronRight } from '@/assets';
import { default as Cart } from '@/assets/shopping-cart.js';
import User from '@/assets/user.js';
import { useGlobalContextProvider } from '@/context/GlobalContext.js';
import { cn } from '@/lib/utils';
import CartModal from '@components/CartModal.js';
import logo from '@public/behide-logo-new.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import StaggeringText from './staggering-text';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const router = useRouter();
  const navbar = useRef(null);
  const { totalQuantity, showCart, setShowCart, user } = useGlobalContextProvider();

  const username = user?.name?.replace(' ', '-').toLowerCase();

  useEffect(() => {
    setDropdown(false);
    setOpen(false);
    setDropdown2(false);
  }, [router.asPath]);

  useEffect(() => {
    if (router.pathname === '/') {
      navbar.current.classList.add('navbar-sticky');
      navbar.current.classList.add('slide-bg');
    } else {
      navbar.current.classList.remove('navbar-sticky');
      navbar.current.classList.remove('slide-bg');
    }
  }, [router.asPath]);

  const productCategory = [
    'Office Bag',
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
  useEffect(() => {
    setDropdown(false);
    setOpen(false);
  }, [router.asPath]);

  return (
    <>
      <div
        ref={navbar}
        className={cn(
          'group/header header relative top-0 z-[500] flex w-full flex-row flex-wrap items-center justify-between py-3 px-3 text-black duration-150 lg:px-8',
        )}
      >
        <div className="flex flex-wrap gap-8">
          <div className="z-10 max-w-[80px] rounded-lg p-4 pr-0">
            <a href="/">
              <Image src={logo} alt="behide logo" className="w-full" />
            </a>
          </div>
          <div
            style={{ top: open ? '100%' : '-600%' }}
            className="absolute left-0 top-full flex w-full items-center justify-end lg:relative lg:top-auto lg:w-auto"
          >
            <ul className="box-shadow-hover z-[500] m-0 flex w-full flex-col items-center gap-1 border bg-white py-8 font-sora text-sm font-medium lg:right-auto lg:z-auto lg:w-auto lg:flex-row lg:rounded-2xl lg:border-none lg:bg-transparent lg:px-2 lg:py-1.5 lg:shadow-none">
              <li className="w-full px-6 py-1 lg:w-auto lg:py-0 lg:px-0">
                <Link
                  className="flex w-full items-center rounded-xl px-3 py-2 duration-200 ease-in-out hover:bg-green-50 hover:text-green-700 md:w-auto"
                  href="/"
                >
                  <StaggeringText text="home" />
                </Link>
              </li>
              <li className="w-full px-6 py-1 lg:w-auto lg:py-0 lg:px-0">
                <div
                  onClick={dropdownClick}
                  className="relative flex w-full origin-top-left cursor-pointer items-center rounded-xl px-3 py-2 duration-200 hover:bg-green-50 hover:text-green-700 focus:stroke-green-700 focus:text-green-700 md:w-auto"
                >
                  <div className="flex items-center justify-start sm:justify-center">
                    <StaggeringText text="category" />
                    <ChevronRight
                      style={{
                        transform: dropdown ? 'rotate(90deg)' : 'rotate(0deg)',
                      }}
                      className="ml-1 inline-block h-4 w-4 rotate-90 stroke-[3px] transition-transform duration-100 hover:stroke-green-700"
                    />
                    <div className="relative inline-block">
                      <div
                        style={{
                          opacity: dropdown ? 1 : 0,
                          transform: dropdown
                            ? 'scale(1) translateY(0px)'
                            : 'scale(.8) translateY(-10px)',
                          visibility: dropdown ? 'visible' : 'hidden',
                        }}
                        className="absolute -left-24 top-full z-20 mt-6 w-40 origin-top-left overflow-hidden rounded-xl border bg-gray-50 p-2 py-2 font-semibold shadow-xl duration-200"
                      >
                        {productCategory.map((item, index) => {
                          return (
                            <Link
                              key={index}
                              href={`/products/category/${item.toLowerCase()}`}
                              className="hover:text-brandBlack block transform rounded-lg px-4 py-2 text-xs font-normal capitalize text-black  duration-300 hover:bg-gray-200"
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
              {[
                ['products', '/products'],
                ['bulk & corporate', '/bulk-corporate'],
                ['about us', '/about-us'],
              ].map((item, index) => {
                return (
                  <li key={index} className="w-full px-6 py-1 lg:w-auto lg:py-0 lg:px-0">
                    <Link
                      className="flex w-full items-center rounded-xl px-3 py-2 duration-200 hover:bg-green-50 hover:text-green-700 md:w-auto"
                      href={item[1]}
                    >
                      {<StaggeringText text={item[0]} />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="flex flex-row flex-wrap">
          {user ? (
            //create a dropdown
            <>
              <div className="group relative">
                <p
                  onClick={() => setDropdown2(!dropdown2)}
                  className="relative z-[99] inline-block cursor-pointer select-none rounded-xl px-4 py-3 font-medium lowercase duration-150 hover:bg-green-50 hover:text-green-700 active:scale-95 active:bg-green-200"
                >
                  <User className="-mt-1 inline-block w-5" />
                </p>

                <div
                  style={{
                    opacity: dropdown2 ? 1 : 0,
                    transform: dropdown2
                      ? 'scale(1) translateY(0px)'
                      : 'scale(.8) translateY(-10px)',
                    visibility: dropdown2 ? 'visible' : 'hidden',
                  }}
                  className="absolute top-[125%] -left-24 z-[101] flex origin-top scale-75 flex-col rounded-xl border bg-white shadow-xl duration-200 md:left-auto md:right-0"
                >
                  <div className="border-b border-b-gray-200 px-4 py-4 pr-12 text-sm">
                    <p>Signed in as</p>
                    <p className="font-semibold">{user?.email}</p>
                  </div>
                  <div className="flex flex-col border-b px-2 py-4 text-sm">
                    {[
                      ['Account', `/${username}/profile`],
                      ['Orders', `/${username}/orders/`],
                      ['Logout', `/${username}/logout/`],
                    ].map((item, index) => {
                      return (
                        <Link
                          className="inline-block rounded-lg px-3 py-2 text-left text-sm duration-100 hover:bg-gray-100"
                          href={item[1]}
                          key={index}
                        >
                          {item[0]}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Link
              href="/user/login"
              className="inline-block cursor-pointer rounded-xl bg-white px-4 py-3 font-medium text-black duration-150  hover:bg-gray-100 active:scale-90 active:bg-green-200"
            >
              <User className="inline-block w-5 stroke-black" />
            </Link>
          )}
          <a
            onClick={() => setShowCart(true)}
            className="relative inline-block cursor-pointer select-none rounded-xl px-4 py-3  text-black duration-150 hover:bg-gray-100 active:scale-90 active:bg-gray-200"
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

      <CartModal showCart={showCart} />

      {showCart && (
        <div
          onClick={() => setShowCart(false)}
          className="fixed inset-0 z-[200] bg-black opacity-50"
        ></div>
      )}
    </>
  );
};

export default Navbar;
