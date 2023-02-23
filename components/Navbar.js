import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Cart from "../assets/shopping-cart.js";
import { useCartProvider } from "../context/CartContext.js";
import logo from "../public/behide-logo-new.png";
import CartModal from "./CartModal.js";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const router = useRouter();
  const ref = useRef(null);
  const { totalQuantity, showCart, setShowCart } = useCartProvider();
  useEffect(() => {
    const stoargeOrderedItems = JSON.parse(
      localStorage.getItem("order") || "[]"
    );
    if (stoargeOrderedItems.length > 0) {
      setIsOrdered(true);
    } else {
      setIsOrdered(false);
    }
  }, [router.asPath]);

  const productCategory = [
    "Backpack",
    "Briefcase",
    "Laptop Bag",
    "Messenger Bag",
    "Luggage Bag",
    "Ladies Bag",
    "Belt",
    "Wallet",
    "Sling Bag",
    "Jacket",
  ];

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };
  const enterMouse = () => {
    setDropdown((prev) => !prev);
  };
  const leaveMouse = () => {
    setDropdown((prev) => !prev);
  };
  const dropdownClick = () => {
    setDropdown((prev) => !prev);
  };

  useEffect(() => {
    setDropdown(false);
    setOpen(false);
  }, [router.asPath]);

  // useEffect(() => {
  //   const scrollCallBack = window.addEventListener("scroll", () => {
  //     if (window.pageYOffset > 50) {
  //       ref.current.classList.add("scrolled");
  //     } else {
  //       ref.current.classList.remove("scrolled");
  //     }
  //   });
  //   return () => {
  //     window.removeEventListener("scroll", scrollCallBack);
  //   };
  // }, [ref.current]);

  return (
    <>
      <div
        ref={ref}
        className="group/header header sticky top-0 z-[501] flex w-full flex-row flex-wrap items-center justify-between bg-brandGrey/95 py-3 px-3 font-poppins text-black backdrop-blur-md duration-150 sm:px-8"
      >
        <div className="max-w-[100px] rounded-lg p-4">
          <Link href="/">
            <Image
              priority={true}
              src={logo}
              alt="behide logo"
              className="w-full"
            />
          </Link>
        </div>
        <div
          style={{ top: open ? "100%" : "-600%" }}
          className="absolute left-0 top-full flex w-full items-center justify-end sm:relative sm:top-auto sm:w-auto"
        >
          <ul className="box-shadow-hover z-500 m-0 flex w-full flex-col items-center gap-1 border bg-white py-8 text-xs font-[600] sm:right-auto sm:z-auto sm:w-auto sm:flex-row sm:border-none sm:bg-transparent  sm:p-0 sm:shadow-none">
            <li className="w-full px-6 py-1 sm:w-auto sm:py-0 sm:px-0">
              <Link
                className="inline-block w-full rounded-lg px-3 py-3 duration-200 ease-in-out hover:bg-green-100 hover:text-green-800 sm:w-auto"
                href="/"
              >
                HOME
              </Link>
            </li>
            <li className="w-full px-6 py-1 sm:w-auto sm:py-0 sm:px-0">
              <div
                // onMouseEnter={enterMouse}
                // onMouseLeave={leaveMouse}
                onClick={dropdownClick}
                className="relative inline-block w-full origin-top-left cursor-pointer items-center rounded-lg px-3 py-3 duration-200 hover:bg-green-100 hover:text-green-800 sm:w-auto"
              >
                {/* PRODUCTS */}

                <div className="flex justify-start sm:justify-center">
                  <div className="relative inline-block">
                    <span className="mx-1 mt-1 inline-block">CATEGORY</span>
                    <svg
                      style={{
                        transform: dropdown ? "rotate(0deg)" : "rotate(-90deg)",
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
                          ? "scale(1) translateY(0px)"
                          : "scale(.8) translateY(-10px)",
                        visibility: dropdown ? "visible" : "hidden",
                      }}
                      className="absolute top-full -left-3 z-20 mt-4 w-40 origin-top-left overflow-hidden rounded-xl border bg-white p-2 py-2 font-semibold shadow-xl duration-200"
                    >
                      {productCategory.map((item, index) => {
                        return (
                          <Link
                            key={index}
                            href={`/products/category/${item.toLowerCase()}`}
                            className="block transform rounded-md px-4 py-3 text-[0.8rem] font-normal capitalize text-black duration-200  hover:bg-gray-100 hover:text-brandBlack"
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
            <li className="w-full px-6 py-1 sm:w-auto sm:py-0 sm:px-0">
              <Link
                className="inline-block w-full rounded-lg px-3 py-3 duration-200 hover:bg-green-100 hover:text-green-800 sm:w-auto"
                href="/products"
              >
                PRODUCTS
              </Link>
            </li>
            <li className="w-full px-6 py-1 sm:w-auto sm:py-0 sm:px-0">
              <Link
                className="inline-block w-full rounded-lg px-3 py-3 duration-200 hover:bg-green-100 hover:text-green-800 sm:w-auto"
                href="/bulk-corporate"
              >
                BULK/CORPORATE
              </Link>
            </li>
            <li className="w-full px-6 py-1 sm:w-auto sm:py-0 sm:px-0">
              <Link
                className="inline-block w-full rounded-lg px-3 py-3 duration-200 hover:bg-green-100 hover:text-green-800 sm:w-auto"
                href="/hot-products"
              >
                HOT PRODUCTS
              </Link>
            </li>
            <li className="w-full px-6 py-1 sm:w-auto sm:py-0 sm:px-0">
              <Link
                className="inline-block w-full rounded-lg px-3 py-3 duration-200 hover:bg-green-100 hover:text-green-800 sm:w-auto"
                href="/about-us"
              >
                ABOUT US
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-row flex-wrap gap-3">
          {isOrdered > 0 && (
            <Link
              href="/orders"
              className="inline-block cursor-pointer rounded-xl bg-green-50 px-6 py-3 font-medium text-green-700 duration-150  hover:bg-green-100 active:scale-90 active:bg-green-200"
            >
              Orders
            </Link>
          )}
          <a
            onClick={() => setShowCart(true)}
            className="relative inline-block cursor-pointer rounded-xl bg-green-50 px-6 py-3 duration-150  hover:bg-green-100 active:scale-90 active:bg-green-200"
          >
            <Cart className="inline-block w-5 stroke-green-700" />
            <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-700 text-xs text-white">
              {totalQuantity}
            </div>
          </a>
        </div>
        <div
          onClick={toggleMenu}
          className="group/menu block h-auto max-w-[50px] cursor-pointer pr-3 sm:hidden"
        >
          <Image alt="menu-button" src="/menu.svg" width={30} height={30} />
        </div>
      </div>
      {showCart && <CartModal />}
      {showCart && (
        <div
          onClick={() => setShowCart(false)}
          className="fixed inset-0 z-[777] bg-black opacity-50"
        ></div>
      )}
    </>
  );
};

export default Navbar;
