import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import logo from "../public/behide-logo-new.png";
import menu from "../public/menu.svg";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const router = useRouter();

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

  return (
    <>
      <div className="group/header header relative z-[501] flex w-full flex-row flex-wrap items-center justify-between bg-brandGrey py-3 px-3 font-poppins text-black sm:px-8">
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
                            className="block transform rounded-md px-4 py-3 text-[0.8rem] font-normal capitalize text-black duration-200  hover:bg-brandGrey hover:text-brandBlack"
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
        <div
          onClick={toggleMenu}
          className="group/menu block h-auto max-w-[50px] cursor-pointer pr-3 sm:hidden"
        >
          {/* <svg
              className="duration-200 fill-slate-600 group-hover/menu:fill-green-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width={"100%"}
            >
              <path d="M61.1 224C45 224 32 211 32 194.9c0-1.9 .2-3.7 .6-5.6C37.9 168.3 78.8 32 256 32s218.1 136.3 223.4 157.3c.5 1.9 .6 3.7 .6 5.6c0 16.1-13 29.1-29.1 29.1H61.1zM144 128c0-8.8-7.2-16-16-16s-16 7.2-16 16s7.2 16 16 16s16-7.2 16-16zm240 16c8.8 0 16-7.2 16-16s-7.2-16-16-16s-16 7.2-16 16s7.2 16 16 16zM272 96c0-8.8-7.2-16-16-16s-16 7.2-16 16s7.2 16 16 16s16-7.2 16-16zM16 304c0-26.5 21.5-48 48-48H448c26.5 0 48 21.5 48 48s-21.5 48-48 48H64c-26.5 0-48-21.5-48-48zm16 96c0-8.8 7.2-16 16-16H464c8.8 0 16 7.2 16 16v16c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V400z" />
            </svg> */}
          <Image src="/menu.svg" width={30} height={30} />
        </div>
      </div>
    </>
  );
};

export default Navbar;
