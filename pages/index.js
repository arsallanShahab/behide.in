import CompanyMoto from '@components/CompanyMoto';
import Header from '@components/PageHead';
import { client } from '@lib/contentful';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Autoplay, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

const headerIntro = {
  hide: {
    opacity: 0,
    x: -100,
    transition: {
      duration: 0.3,
    },
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      easing: 'easeIn',
      duration: 0.75,
    },
  },
};

const productsIntro = {
  hide: {
    opacity: 0,
    y: 100,
    scale: 0.9,
    transition: {
      duration: 0.35,
      easing: 'linear',
    },
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
    },
  },
};

export default function Home({ data }) {
  const [laptopBags, setLaptopBags] = useState([]);
  const [backpacks, setBackpacks] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    const fetchLaptopBags = async () => {
      const res = await fetch('/api/products/laptop-bags');
      const data = await res.json();
      if (data.success) {
        setLaptopBags(data.body.products);
        // console.log(data.body.products);
      }
      setIsFetching(false);
    };
    fetchLaptopBags();
    const fetchBackpacks = async () => {
      const res = await fetch('/api/products/backpacks');
      const data = await res.json();
      if (data.success) {
        setBackpacks(data.body.products);
      }
      setIsFetching(false);
    };
    fetchBackpacks();
  }, []);
  const excerpt = (str, end = 50) => {
    return str.length > end ? str.substring(0, end) + '...' : str;
  };
  const { homeBanner, laptopBagsData, backpacksData } = data;
  const homeBannerItems = homeBanner.items.map((item) => item.fields);
  console.log(homeBannerItems);
  return (
    <>
      <Header />
      <div style={{ marginTop: '-104px' }} className="slideshow relative ">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop
          navigation
        >
          <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
            <svg
              className="relative left-1/2 -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-40rem)] sm:h-[42.375rem]"
              viewBox="0 0 1155 678"
            >
              <path
                fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
                fillOpacity=".2"
                d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
              />
              <defs>
                <linearGradient
                  id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                  x1="1155.49"
                  x2="-78.208"
                  y1=".177"
                  y2="474.645"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#9089FC" />
                  <stop offset={1} stopColor="#FF80B5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="absolute inset-x-0 bottom-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:bottom-[-20rem]">
            <svg
              className="relative left-1/2 -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:right-[calc(50%-40rem)] sm:h-[42.375rem]"
              viewBox="0 0 1155 678"
            >
              <path
                fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
                fillOpacity=".3"
                d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
              />
              <defs>
                <linearGradient
                  id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                  x1="1155.49"
                  x2="-78.208"
                  y1=".177"
                  y2="474.645"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#16a34a" />
                  <stop offset={1} stopColor="#FF80B5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          {homeBannerItems.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="relative mt-10 flex flex-col items-center justify-center px-6 pt-32 pb-32 sm:mt-0 sm:px-3 lg:flex-row">
                  <div className="flex basis-full flex-col items-center justify-center px-0 text-center sm:px-8 lg:basis-1/2 lg:items-end lg:justify-end">
                    <h3 className="word-spacing-trending py-3 text-right align-middle text-sm font-light uppercase text-[#afafaf]">
                      Trending Collection{' '}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="#ffc038"
                        stroke="#ffc038"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-zap -mt-1 -ml-2 inline-block"
                      >
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                      </svg>
                    </h3>
                    <h1 className="relative z-10 mb-5 max-w-xl text-center font-sora text-[40px] font-bold capitalize  leading-[.9] text-gray-900 sm:text-7xl lg:text-right">
                      {item.homeBannerText}
                    </h1>

                    {/* <p className="word-spacing text-green mt-10 max-w-md text-center font-sora text-2xl font-bold leading-relaxed sm:text-left">
                      RS. {item.homeBannerDescription}/.
                    </p> */}
                    <Link
                      href={`products/${item.homeBannerLink.sys.id}`}
                      className="inline-block translate-x-0 py-2 align-middle font-sora text-sm font-medium text-black duration-150 hover:translate-x-2 hover:text-green-600"
                    >
                      View Product <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                  <div className="flex w-full basis-full items-center justify-center lg:basis-1/2 lg:justify-start">
                    <div className="relative h-[400px] w-[400px]">
                      <img
                        className="relative z-10 h-full w-full select-none object-cover"
                        src={item.homeBannerImage.fields.file.url}
                        alt={item.homeBannerImage.fields.productName}
                      />
                      <div className="absolute inset-x-0 -bottom-3 block h-[20px] w-full scale-50 bg-black blur-xl"></div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div className="px-5 pb-20 pt-32 lg:px-10">
        <p className="block px-5 py-10 font-sora text-2xl font-semibold text-black md:py-5 md:text-3xl lg:pl-10">
          Featured Products
        </p>
        <div className="flex flex-row flex-wrap items-center justify-center gap-2 p-3 md:justify-start md:gap-3 md:p-6">
          {laptopBagsData &&
            laptopBagsData.items.map((item, index) => {
              return (
                <div className="flex flex-col items-start justify-start gap-4 p-3 lg:gap-4 lg:p-6">
                  <img
                    className="h-full w-full object-cover md:h-[200px] md:w-[200px] lg:h-[250px] lg:w-[250px]"
                    src={item.fields.productBannerImage.fields.file.url}
                    alt={item.fields.productName}
                  />
                  <h1 className="w-full font-poppins text-sm font-light text-black md:max-w-[220px] md:font-medium lg:max-w-[280px] lg:text-sm">
                    {excerpt(item.fields.productName, 100)}
                  </h1>
                  <div className="flex w-full flex-wrap items-center justify-between ">
                    <p className="text-xs text-black lg:text-sm">₹{item.fields.productPrice}/-</p>

                    <Link
                      href={`/products/${item.sys.id}`}
                      className="inline-block translate-x-0 py-2 align-middle font-sora text-xs text-black duration-150 hover:translate-x-2 hover:text-green-600"
                    >
                      View Product <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          {laptopBagsData && (
            <div className="md:flex-1 lg:p-5">
              <Link
                href="/products/category/laptop bag"
                className="inline-block rounded-xl px-3 py-2 text-sm font-semibold leading-6 text-black duration-100 hover:bg-gray-100 active:scale-95 active:bg-gray-200"
              >
                View all
                <span className="inline-block" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-8xl mx-auto py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden px-6 pt-16 sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-16 lg:pt-0">
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="font-sora text-3xl font-bold leading-loose text-black sm:text-7xl">
                Behide new in's of the year <span className="text-green-600">2023</span>
              </h2>
              <div className="mt-5 flex items-center justify-center gap-x-6 sm:mt-10 lg:justify-start">
                <Link
                  href="/products"
                  className="inline-block rounded-xl px-3 py-2 text-sm font-semibold leading-6 text-black duration-100 hover:bg-gray-100 active:scale-95 active:bg-gray-200"
                >
                  Shop now
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div className="relative mt-16 h-80 lg:mt-8">
              <img
                className="absolute bottom-0 left-12 w-[14rem] max-w-none rounded-3xl bg-white/5 ring-1 ring-white/10 sm:-top-32 sm:left-20 sm:w-[27rem]"
                src="/s-l1600.jpg"
                alt="App screenshot"
                width={1824}
                height={1080}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 pb-20 pt-32 lg:px-10">
        <p className="block px-5 py-10 font-sora text-2xl font-semibold text-black md:py-5 md:text-3xl lg:pl-10">
          shop backpacks bags
        </p>
        <div className="flex flex-row flex-wrap items-center justify-center gap-2 p-3 md:justify-start md:gap-3 md:p-6">
          {backpacksData &&
            backpacksData.items.map((item, index) => {
              return (
                <div className="flex flex-col items-start justify-start gap-4 p-3 lg:gap-4 lg:p-6">
                  <img
                    className="h-full w-full object-cover md:h-[200px] md:w-[200px] lg:h-[250px] lg:w-[250px]"
                    src={item.fields.productBannerImage.fields.file.url}
                    alt={item.fields.productName}
                  />
                  <h1 className="w-full font-poppins text-sm font-light text-black md:max-w-[220px] lg:max-w-[280px] lg:text-sm">
                    {excerpt(item.fields.productName, 100)}
                  </h1>
                  <div className="flex w-full flex-wrap items-center justify-between ">
                    <p className="text-sm font-semibold text-gray-900">
                      Rs. {item.fields.productPrice}/-
                    </p>

                    <Link
                      href={`/products/${item.sys.id}`}
                      className="inline-block translate-x-0 py-2 align-middle font-sora text-xs text-black duration-150 hover:translate-x-2 hover:text-green-600"
                    >
                      View Product <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          {backpacks && (
            <div className="p-5 md:flex-1">
              <Link
                href="/products/category/backpack"
                className="inline-block rounded-xl px-3 py-2 text-sm font-semibold leading-6 text-black duration-100 hover:bg-gray-100 active:scale-95 active:bg-gray-200"
              >
                View all{' '}
                <span className="inline-block" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
      <CompanyMoto />
    </>
  );
}

export const getStaticProps = async (ctx) => {
  const backpacksData = await client.getEntries({
    content_type: 'blog',
    'fields.productType': 'backpack',
    order: '-sys.createdAt',
    limit: 3,
  });
  const laptopBagsData = await client.getEntries({
    content_type: 'blog',
    'fields.productType': 'laptop bag',
    order: '-sys.createdAt',
    limit: 3,
  });

  const homeBanner = await client.getEntries({
    content_type: 'homeBanner',
  });
  return {
    props: {
      data: { homeBanner, laptopBagsData, backpacksData },
    },
  };
};
