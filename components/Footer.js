import Link from "next/link";
import ArrowRightIcon from "../assets/arrow-right.svg";
import FacebookIcon from "../assets/facebook.svg";
import InstagramIcon from "../assets/instagram.svg";
import MailIcon from "../assets/mail.svg";
import MapIcon from "../assets/map-pin.svg";
import WhatsappIcon from "../assets/message-circle.svg";
import PhoneIcon from "../assets/phone.svg";

const Footer = () => {
  return (
    <>
      <div className="flex w-full flex-row flex-wrap gap-3 bg-gray-50 py-16 px-2 sm:px-8">
        <div className="flex-1 flex-wrap rounded-md px-4 py-6">
          <h3 className="ml-2 font-sora text-sm font-semibold">CONTACT INFO</h3>
          <div className="gsaSX">
            <div className="rounded-2xl bg-black p-2 sm:p-3">
              <MapIcon className="stroke-white" />
            </div>
            <div>
              <h4 className="mb-1 align-middle font-sora text-xs font-medium text-gray-500">
                ADDRESS
              </h4>
              <p className="font-poppins text-xs font-medium text-black sm:text-sm">
                21/A,ALIMUDDIN STREET
              </p>
              <p className="font-poppins text-xs font-medium text-black sm:text-sm">
                KOL-16, WEST BENGAL, INDIA
              </p>
            </div>
          </div>
          <div className="gsaSX">
            <div className="rounded-2xl bg-black p-2 sm:p-3">
              <PhoneIcon className="stroke-white" />
            </div>
            <div>
              <h4 className="mb-1 align-middle font-sora text-xs font-medium text-gray-500">
                PHONE
              </h4>
              <p className="font-poppins text-xs font-medium text-black sm:text-sm">
                +91 62898 39240
              </p>
              <p className="font-poppins text-xs font-medium text-black sm:text-sm">
                +91 90734 48018
              </p>
            </div>
          </div>
          <div className="gsaSX">
            <div className="rounded-2xl bg-black p-2 sm:p-3">
              <MailIcon className="stroke-white" />
            </div>
            <div>
              <h4 className="mb-1 align-middle font-sora text-xs font-medium text-gray-500">
                EMAIL
              </h4>
              <p className="break-words font-poppins text-xs font-medium text-black sm:text-sm">
                <a
                  className="break-words"
                  href="mailto:enquiries.behideindia@gmail.com"
                >
                  enquiries.behideindia@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 rounded-md px-4 py-6">
          <h3 className="ml-2 font-sora text-sm font-semibold">ACCOUNT</h3>
          <div className="footer-link-wrapper">
            <Link className="footer-link group" href={"/about-us"}>
              <ArrowRightIcon className="footer-link-svg" />
              About us
            </Link>
          </div>
          <div className="footer-link-wrapper">
            <Link className="footer-link group" href={"/about-us#contact"}>
              <ArrowRightIcon className="footer-link-svg" />
              Contact us
            </Link>
          </div>
          <div className="footer-link-wrapper">
            <Link
              className="footer-link group"
              href={"/about-us#privacy-policy"}
            >
              <ArrowRightIcon className="footer-link-svg" />
              Privacy Policy
            </Link>
          </div>
          <div className="footer-link-wrapper">
            <Link
              className="footer-link group"
              href={"/about-us#terms-and-conditions"}
            >
              <ArrowRightIcon className="footer-link-svg" />
              Terms & Conditions
            </Link>
          </div>
        </div>
        <div className="flex-1 rounded-md px-4 py-6">
          <h3 className="ml-2 font-sora text-sm font-semibold">PAGES</h3>
          <div className="footer-link-wrapper">
            <Link className="footer-link group" href={"/hot-products"}>
              <ArrowRightIcon className="footer-link-svg" />
              Hot Products
            </Link>
          </div>
          <div className="footer-link-wrapper">
            <Link className="footer-link group" href={"/bulk-corporate"}>
              <ArrowRightIcon className="footer-link-svg" />
              Corporate Order
            </Link>
          </div>
          <div className="footer-link-wrapper">
            <Link
              className="footer-link group"
              href={"/about-us#return-policy"}
            >
              <ArrowRightIcon className="footer-link-svg" />
              Return Policy
            </Link>
          </div>
        </div>
        <div className="flex-1 rounded-md px-4 py-6">
          <h3 className="ml-2 font-sora text-sm font-semibold">NEWS LETTER</h3>
          <div className="footer-link-wrapper">
            <label htmlFor="email" className="footer-link group">
              SUBSCRIBE
            </label>
            <div className="relative mt-2 pb-1">
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
      <div className="flex flex-row flex-wrap items-center justify-center gap-5 py-10 px-10 sm:justify-between">
        <p className="text-center font-poppins text-base font-medium">
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
