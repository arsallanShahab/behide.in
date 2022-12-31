import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import logo from "../public/behide-logo-new.png";
import menu from "../public/menu.svg";

const Header = () => {
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
      <div className="relative bg-brandGrey text-black group/header font-poppins header flex flex-row justify-between flex-wrap items-center py-3 px-3 sm:px-8 w-full z-[501]">
        <div className="p-4 max-w-[100px] rounded-lg">
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
          className="absolute left-0 flex items-center justify-end w-full sm:relative sm:w-auto top-full sm:top-auto"
        >
          <ul className="text-xs font-[600] bg-white sm:bg-transparent box-shadow-hover sm:shadow-none m-0 flex items-center border w-full sm:w-auto sm:border-none py-8 sm:p-0 sm:right-auto flex-col sm:flex-row gap-1  z-500 sm:z-auto">
            <li className="w-full px-6 py-1 sm:w-auto sm:py-0 sm:px-0">
              <Link
                className="inline-block w-full px-3 py-3 duration-200 rounded-lg sm:w-auto hover:bg-green-100 hover:text-green-800 ease-in-out"
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
                className="relative items-center inline-block origin-top-left w-full px-3 py-3 duration-200 rounded-lg cursor-pointer sm:w-auto hover:bg-green-100 hover:text-green-800"
              >
                {/* PRODUCTS */}

                <div className="flex justify-start sm:justify-center">
                  <div className="relative inline-block">
                    <span className="inline-block mx-1 mt-1">CATEGORY</span>
                    <svg
                      style={{
                        transform: dropdown ? "rotate(0deg)" : "rotate(-90deg)",
                      }}
                      className="inline-block w-5 h-5 mx-1 transition-transform duration-200 rotate-90"
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
                      className="absolute z-20 w-40 p-2 py-2 top-full mt-4 overflow-hidden font-semibold duration-200 origin-top-left bg-white border shadow-xl -left-3 rounded-xl"
                    >
                      {productCategory.map((item, index) => {
                        return (
                          <Link
                            key={index}
                            href={`/products/category/${item.toLowerCase()}`}
                            className="block px-4 py-3 text-[0.8rem] capitalize duration-200 transform rounded-md text-black font-normal  hover:bg-brandGrey hover:text-brandBlack"
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
                className="inline-block w-full px-3 py-3 duration-200 rounded-lg sm:w-auto hover:bg-green-100 hover:text-green-800"
                href="/products"
              >
                PRODUCTS
              </Link>
            </li>
            <li className="w-full px-6 py-1 sm:w-auto sm:py-0 sm:px-0">
              <Link
                className="inline-block w-full px-3 py-3 duration-200 rounded-lg sm:w-auto hover:bg-green-100 hover:text-green-800"
                href="/bulk-corporate"
              >
                BULK/CORPORATE
              </Link>
            </li>
            <li className="w-full px-6 py-1 sm:w-auto sm:py-0 sm:px-0">
              <Link
                className="inline-block w-full px-3 py-3 duration-200 rounded-lg sm:w-auto hover:bg-green-100 hover:text-green-800"
                href="/hot-products"
              >
                HOT PRODUCTS
              </Link>
            </li>
            <li className="w-full px-6 py-1 sm:w-auto sm:py-0 sm:px-0">
              <Link
                className="inline-block w-full px-3 py-3 duration-200 rounded-lg sm:w-auto hover:bg-green-100 hover:text-green-800"
                href="/about-us"
              >
                ABOUT US
              </Link>
            </li>
          </ul>
        </div>
        <div
          onClick={toggleMenu}
          className="max-w-[50px] h-auto pr-3 group/menu cursor-pointer block sm:hidden"
        >
          {/* <svg
              className="duration-200 fill-slate-600 group-hover/menu:fill-green-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width={"100%"}
            >
              <path d="M61.1 224C45 224 32 211 32 194.9c0-1.9 .2-3.7 .6-5.6C37.9 168.3 78.8 32 256 32s218.1 136.3 223.4 157.3c.5 1.9 .6 3.7 .6 5.6c0 16.1-13 29.1-29.1 29.1H61.1zM144 128c0-8.8-7.2-16-16-16s-16 7.2-16 16s7.2 16 16 16s16-7.2 16-16zm240 16c8.8 0 16-7.2 16-16s-7.2-16-16-16s-16 7.2-16 16s7.2 16 16 16zM272 96c0-8.8-7.2-16-16-16s-16 7.2-16 16s7.2 16 16 16s16-7.2 16-16zM16 304c0-26.5 21.5-48 48-48H448c26.5 0 48 21.5 48 48s-21.5 48-48 48H64c-26.5 0-48-21.5-48-48zm16 96c0-8.8 7.2-16 16-16H464c8.8 0 16 7.2 16 16v16c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V400z" />
            </svg> */}
          <Image src={menu} width={30} />
        </div>
      </div>
    </>
  );
};

export default Header;
