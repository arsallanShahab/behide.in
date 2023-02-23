import Image from "next/image";
import Link from "next/link";
import ArrowRightIcon from "../assets/arrow-right.svg";
import FacebookIcon from "../assets/facebook.svg";
import InstagramIcon from "../assets/instagram.svg";
import MailIcon from "../assets/mail.svg";
import MapIcon from "../assets/map-pin.svg";
import WhatsappIcon from "../assets/message-circle.svg";
import PhoneIcon from "../assets/phone.svg";
import logo from "../public/behide-logo-new.png";

const Footer = () => {
  return (
    <>
      <div className="flex w-full flex-row flex-wrap items-start justify-center gap-3 bg-black py-28 px-2 sm:px-8">
        <div className="flex-grow flex-wrap justify-center rounded-md px-4 py-6 sm:flex-1">
          <div className="mt-4 flex flex-col items-center justify-center gap-5 rounded-2xl px-4 py-3 text-center sm:items-start sm:py-4 sm:px-5 sm:text-left">
            <Image src={logo} alt="Behide Logo" width={90} />
            <h4 className="mb-1 max-w-[200px] align-middle font-sora text-base font-medium leading-[2] text-white">
              Genuine Leather Products
            </h4>
          </div>
        </div>
        <div className="flex flex-grow flex-col items-center justify-center rounded-md px-4 py-6 sm:flex-1 sm:items-start">
          <h3 className="font-sora text-sm font-semibold text-white sm:ml-3 sm:mb-6">
            ACCOUNT
          </h3>
          <div className="mt-6 sm:mt-2">
            <Link className="footer-link group" href={"/about-us"}>
              <ArrowRightIcon className="footer-link-svg" />
              About us
            </Link>
          </div>
          <div className="mt-6 sm:mt-2">
            <Link className="footer-link group" href={"/about-us#contact"}>
              <ArrowRightIcon className="footer-link-svg" />
              Contact us
            </Link>
          </div>
          <div className="mt-6 sm:mt-2">
            <Link
              className="footer-link group"
              href={"/about-us#privacy-policy"}
            >
              <ArrowRightIcon className="footer-link-svg" />
              Privacy Policy
            </Link>
          </div>
          <div className="mt-6 sm:mt-2">
            <Link
              className="footer-link group"
              href={"/about-us#terms-and-conditions"}
            >
              <ArrowRightIcon className="footer-link-svg" />
              Terms & Conditions
            </Link>
          </div>
        </div>
        <div className="flex flex-grow flex-col items-center justify-center rounded-md px-4 py-6 sm:flex-1 sm:items-start">
          <h3 className="font-sora text-sm font-semibold text-white sm:ml-3 sm:mb-6">
            PAGES
          </h3>
          <div className="mt-6 sm:mt-2">
            <Link className="footer-link group" href={"/hot-products"}>
              <ArrowRightIcon className="footer-link-svg" />
              Hot Products
            </Link>
          </div>
          <div className="mt-6 sm:mt-2">
            <Link className="footer-link group" href={"/bulk-corporate"}>
              <ArrowRightIcon className="footer-link-svg" />
              Corporate Order
            </Link>
          </div>
          <div className="mt-6 sm:mt-2">
            <Link
              className="footer-link group"
              href={"/about-us#return-policy"}
            >
              <ArrowRightIcon className="footer-link-svg" />
              Return Policy
            </Link>
          </div>
        </div>
        <div className="flex flex-grow flex-col items-center justify-center rounded-md px-4 py-6 sm:flex-1 sm:items-start">
          <h3 className="font-sora text-sm font-semibold text-white sm:ml-3 sm:mb-6">
            NEWS LETTER
          </h3>
          <div className="mt-6 text-center sm:mt-2 sm:text-left">
            <label htmlFor="email" className="footer-link group">
              SUBSCRIBE
            </label>
            <div className="relative mt-4 pb-1 sm:mt-2">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">
                  <MailIcon className="scale-75" />
                </span>
              </div>
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-xl border-none bg-brand-grey py-4 pl-10 pr-7 font-poppins focus:border-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                placeholder="abc@gmail.com"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center gap-5 py-6 px-10 sm:justify-between">
        <p className="text-center font-poppins text-sm font-medium">
          © Behide India 2022. All Rights Reserved.
        </p>
        <div className="flex flex-row gap-2 rounded-xl bg-brand-grey px-4 py-3">
          <a
            target={"_blank"}
            href="//facebook.com"
            className="inline-block px-2 py-1"
          >
            <FacebookIcon className="scale-[.85]" />
          </a>
          <a
            target={"_blank"}
            href="//instagram.com"
            className="inline-block px-2 py-1"
          >
            <InstagramIcon className="scale-[.85]" />
          </a>
          <a
            target={"_blank"}
            href="//whatsapp.com"
            className="inline-block px-2 py-1"
          >
            <WhatsappIcon className="scale-[.85]" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
