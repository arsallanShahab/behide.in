import { ArrowRightIcon, FacebookIcon, InstagramIcon, WhatsappIcon } from '@/assets';
import logo from '@public/behide-logo-new.png';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="overflow-hidden">
      <div className="container relative mx-auto flex w-full flex-row flex-wrap items-start justify-between gap-3 py-28 px-5 sm:px-20">
        <div className="absolute inset-x-0 bottom-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:bottom-[-20rem]">
          <svg
            className="relative left-1/2 -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-40rem)] sm:h-[55.375rem]"
            viewBox="0 0 1155 678"
          >
            <path
              fill="url(#80ed99-92d5-4d68-a6a0-9b9b2abad533)"
              fillOpacity=".6"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="80ed99-92d5-4d68-a6a0-9b9b2abad533"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#57cc99" />
                <stop offset={1} stopColor="#80ed99" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="flex-wrap justify-center rounded-md px-4 py-6">
          <div className="flex flex-col items-center justify-center gap-5 rounded-2xl text-center sm:items-start sm:justify-start sm:text-left">
            <Image src={logo} alt="Behide Logo" width={90} />
            <h4 className="mb-1 max-w-xs align-middle font-sora text-xs leading-[2] text-black">
              Behide is the renowned name in the industry for manufacturing, supplying and
              distributing of Leather products.
            </h4>
          </div>
        </div>
        <div className="flex flex-1 flex-wrap items-start justify-center gap-10 sm:justify-end">
          <div className="flex flex-col items-center justify-center rounded-md px-6 py-1 sm:items-start sm:py-6 sm:px-4">
            <h3 className="font-sora text-sm font-semibold text-black">ACCOUNT</h3>
            <div className="mt-6">
              <Link className="footer-link group" href={'/about-us'}>
                About us
              </Link>
            </div>
            <div className="mt-6 sm:mt-2">
              <Link className="footer-link group" href={'/about-us#contact'}>
                Contact us
              </Link>
            </div>
            <div className="mt-6 sm:mt-2">
              <Link className="footer-link group" href={'/about-us#privacy-policy'}>
                Privacy Policy
              </Link>
            </div>
            <div className="mt-6 sm:mt-2">
              <Link className="footer-link group" href={'/about-us#terms-and-conditions'}>
                Terms & Conditions
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center rounded-md px-6 py-1 sm:items-start sm:py-6 sm:px-4">
            <h3 className="font-sora text-sm font-semibold text-black">PAGES</h3>
            <div className="mt-6">
              <Link className="footer-link group" href={'/hot-products'}>
                Hot Products
              </Link>
            </div>
            <div className="mt-6 sm:mt-2">
              <Link className="footer-link group" href={'/bulk-corporate'}>
                Corporate Order
              </Link>
            </div>
            <div className="mt-6 sm:mt-2">
              <Link className="footer-link group" href={'/about-us#return-policy'}>
                Return Policy
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center rounded-md px-6 py-1 sm:items-start sm:py-6 sm:px-4">
            <h3 className="font-sora text-sm font-semibold text-black">SOCIAL</h3>
            <div className="mt-6">
              <Link className="footer-link group" href={'https://www.instagram.com/behide_india'}>
                Instagram
              </Link>
            </div>
            <div className="mt-6 sm:mt-2">
              <Link className="footer-link group" href={'https://www.facebook.com/behide.india/'}>
                Facebook
              </Link>
            </div>
            <div className="mt-6 sm:mt-2">
              <Link className="footer-link group" href={'https://wa.me/+919073448018'}>
                Whatsapp
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center gap-5 px-6 pt-6 pb-10 sm:justify-between sm:px-10">
        <p className="-sm text-center font-medium">© Behide India 2022. All Rights Reserved.</p>
        <div className="flex flex-row flex-wrap items-center justify-center gap-1 sm:gap-2 ">
          <a
            target={'_blank'}
            href="https://www.facebook.com/behide.india/"
            className="inline-block rounded-xl px-3 py-2 text-sm font-semibold leading-6 text-black duration-100 hover:bg-gray-100 active:scale-95 active:bg-gray-200"
          >
            <FacebookIcon className="-mt-[2px] inline-block h-6 w-6 scale-[.7] text-center" />
            facebook
          </a>
          <a
            target={'_blank'}
            href="https://www.instagram.com/behide_india/"
            className="inline-block rounded-xl px-3 py-2 text-sm font-semibold leading-6 text-black duration-100 hover:bg-gray-100 active:scale-95 active:bg-gray-200"
          >
            <InstagramIcon
              className="w-6npm run dev -mt-[2px] inline-block h-6
            
            scale-[.7]"
            />
            instagram
          </a>
          <a
            target={'_blank'}
            href="https://wa.me/+919073448018"
            className="inline-block rounded-xl px-3 py-2 text-sm font-semibold leading-6 text-black duration-100 hover:bg-gray-100 active:scale-95 active:bg-gray-200"
          >
            <WhatsappIcon
              className="w-6npm run dev -mt-[2px] inline-block h-6
            
            scale-[.7]"
            />
            whatsapp
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
