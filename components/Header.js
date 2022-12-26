import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "../public/behide-logo-new.png";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

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

  return (
    <>
      <div className="relative group/header font-poppins header flex flex-row justify-between flex-wrap items-center py-3 px-8 border-b w-full z-[501]">
        <div className="p-4 max-w-[100px] rounded-lg">
          <Image src={logo} alt="behide logo" className="w-full" />
        </div>
        <div className="pl-3 flex items-center justify-end">
          <ul
            style={{ top: open ? "100%" : "-500%" }}
            className="text-xs font-[600] m-0 right-0 top-full sm:top-auto flex items-center absolute sm:relative border sm:border-none p-4 sm:p-0 w-full  sm:right-auto bg-white flex-col sm:flex-row gap-1 duration-500 z-500 sm:z-auto"
          >
            <li className="w-full sm:w-auto py-1 sm:py-0 px-6 sm:px-0">
              <Link
                className="inline-block px-3 py-3 rounded-lg w-full sm:w-auto hover:bg-green-100 hover:text-green-800 duration-200"
                href="/"
              >
                HOME
              </Link>
            </li>
            <li className="w-full sm:w-auto py-1 sm:py-0 px-6 sm:px-0">
              <div
                onMouseEnter={enterMouse}
                onMouseLeave={leaveMouse}
                className="relative inline-block cursor-pointer items-center px-3 py-3 rounded-lg w-full sm:w-auto hover:bg-green-100 hover:text-green-800 duration-200"
              >
                {/* PRODUCTS */}

                <div className="flex justify-start sm:justify-center">
                  <div className="relative inline-block">
                    <span className="inline-block mx-1">CATEGORY</span>
                    <svg
                      className="w-5 h-5 mx-1 inline-block"
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
                      className="absolute p-2 left-full sm:left-auto -right-12 z-20 w-40 py-2 mt-2  border origin-top-right overflow-hidden font-semibold bg-white rounded-xl shadow-xl duration-200"
                    >
                      {productCategory.map((item, index) => {
                        return (
                          <Link
                            key={index}
                            href={`/products/category/${item.toLowerCase()}`}
                            className="block px-4 py-3 text-[0.8rem] capitalize duration-200 transform rounded-md text-black font-normal  hover:bg-gray-100 hover:text-green-600"
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
            <li className="w-full sm:w-auto py-1 sm:py-0 px-6 sm:px-0">
              <Link
                className="inline-block px-3 py-3 rounded-lg w-full sm:w-auto hover:bg-green-100 hover:text-green-800 duration-200"
                href="/products"
              >
                PRODUCTS
              </Link>
            </li>
            <li className="w-full sm:w-auto py-1 sm:py-0 px-6 sm:px-0">
              <Link
                className="inline-block px-3 py-3 rounded-lg w-full sm:w-auto hover:bg-green-100 hover:text-green-800 duration-200"
                href="/bulk-corporate"
              >
                BULK/CORPORATE
              </Link>
            </li>
            <li className="w-full sm:w-auto py-1 sm:py-0 px-6 sm:px-0">
              <Link
                className="inline-block px-3 py-3 rounded-lg w-full sm:w-auto hover:bg-green-100 hover:text-green-800 duration-200"
                href="/hot-products"
              >
                HOT PRODUCTS
              </Link>
            </li>
            <li className="w-full sm:w-auto py-1 sm:py-0 px-6 sm:px-0">
              <Link
                className="inline-block px-3 py-3 rounded-lg w-full sm:w-auto hover:bg-green-100 hover:text-green-800 duration-200"
                href="/about-us"
              >
                ABOUT US
              </Link>
            </li>
          </ul>
          <div
            onClick={toggleMenu}
            className="max-w-[50px] p-3 group/menu cursor-pointer block sm:hidden"
          >
            <svg
              className="fill-slate-600 group-hover/menu:fill-green-600 duration-200"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width={"100%"}
            >
              <path d="M61.1 224C45 224 32 211 32 194.9c0-1.9 .2-3.7 .6-5.6C37.9 168.3 78.8 32 256 32s218.1 136.3 223.4 157.3c.5 1.9 .6 3.7 .6 5.6c0 16.1-13 29.1-29.1 29.1H61.1zM144 128c0-8.8-7.2-16-16-16s-16 7.2-16 16s7.2 16 16 16s16-7.2 16-16zm240 16c8.8 0 16-7.2 16-16s-7.2-16-16-16s-16 7.2-16 16s7.2 16 16 16zM272 96c0-8.8-7.2-16-16-16s-16 7.2-16 16s7.2 16 16 16s16-7.2 16-16zM16 304c0-26.5 21.5-48 48-48H448c26.5 0 48 21.5 48 48s-21.5 48-48 48H64c-26.5 0-48-21.5-48-48zm16 96c0-8.8 7.2-16 16-16H464c8.8 0 16 7.2 16 16v16c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V400z" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
