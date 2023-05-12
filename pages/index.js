import ChevronRightButton from '@/components/arrow-right-btn';
import AnimateHeading from '@/components/heading-animate';
import StaggeringText from '@/components/staggering-text';
import { excerpt } from '@/lib/utils';
// import { transition } from '@/lib/utils/CONSTANTS';
import CompanyMoto from '@components/CompanyMoto';
import Header from '@components/PageHead';
import { client } from '@lib/contentful';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Autoplay, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

const transition = { duration: 0.8, ease: [0.6, 0.01, 0.05, 0.9] };
const transitionTwo = { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] };

const flexContainerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.125,
      delayChildren: 0.2,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};

const flexItemVariants = {
  initial: {
    opacity: 0,
    y: -100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: transition.ease,
    },
  },
};

export default function Home({ data }) {
  const { homeBanner, laptopBagsData, backpacksData } = data;
  const homeBannerItems = homeBanner.items.map((item) => item.fields);
  const swiperRef = useRef(null);
  const handleMouseEnter = () => {
    swiperRef.current.swiper.autoplay.stop();
  };
  const handleMouseLeave = () => {
    swiperRef.current.swiper.autoplay.start();
  };
  return (
    <>
      <Header />

      <div className="slideshow relative ">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop
          navigation
        >
          {homeBannerItems.map((item, index) => {
            const words = item.homeBannerText.split(' ');
            return (
              <SwiperSlide
                key={index}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <motion.div className="relative flex flex-col items-center justify-center bg-opacity-50 px-6 pt-16 pb-36 sm:mt-0 sm:px-3 md:pt-12 lg:flex-row">
                  <div className="flex basis-full flex-col items-center justify-center px-0 text-center sm:px-8 lg:basis-3/5 lg:items-end lg:justify-end">
                    <motion.h3
                      initial={{
                        x: '25%',
                        opacity: 0,
                      }}
                      whileInView={{
                        x: 0,
                        opacity: 1,
                        transition: {
                          duration: 0.5,
                          ease: [0.6, 0.01, 0.05, 0.9],
                        },
                      }}
                      // viewport={{ once: true }}
                      className="word-spacing-trending py-0 text-right align-middle font-sora text-sm font-semibold uppercase text-black"
                    >
                      Trending Collection
                    </motion.h3>
                    <motion.h1
                      initial={{
                        x: '15%',
                        opacity: 0,
                      }}
                      whileInView={{
                        x: 0,
                        opacity: 1,
                        transition: {
                          duration: 0.6,
                          ease: [0.6, 0.01, 0.05, 0.9],
                        },
                      }}
                      className="relative z-10 mb-5 max-w-sm text-center font-sora text-[40px] lowercase leading-tight text-gray-900 sm:text-8xl md:max-w-full md:leading-[.9] lg:text-right"
                    >
                      {words.map((word, index) => {
                        return (
                          <motion.div key={index} className="inline-block">
                            {word + '\u00A0'}
                          </motion.div>
                        );
                      })}
                    </motion.h1>
                    <motion.a
                      initial={{
                        y: '70%',
                        opacity: 0,
                      }}
                      whileInView={{
                        y: 0,
                        opacity: 1,
                        transition: {
                          duration: 0.3,
                          ease: [0.6, 0.01, 0.05, 0.9],
                        },
                      }}
                      href={`products/${item.homeBannerLink.sys.id}`}
                      className="inline-block translate-x-0 py-2 align-middle font-sora text-sm font-medium text-black duration-150 hover:translate-x-2 hover:text-green-600"
                    >
                      View Product <span aria-hidden="true">&rarr;</span>
                    </motion.a>
                  </div>
                  <div className="flex w-full basis-full items-center justify-center lg:basis-1/2 lg:justify-start">
                    <motion.div className="relative h-[300px] w-[300px] origin-top sm:h-[400px] sm:w-[400px]">
                      <motion.img
                        initial={{
                          x: '-20%',
                          opacity: 0,
                        }}
                        whileInView={{
                          x: 0,
                          opacity: 1,
                          transition: {
                            duration: 0.8,
                            ease: [0.6, 0.01, 0.05, 0.9],
                          },
                        }}
                        className="z-10 h-full w-full select-none object-cover"
                        src={item.homeBannerImage.fields.file.url}
                        alt={item.homeBannerImage.fields.productName}
                      />
                      <motion.div
                        initial={{
                          y: 50,
                          opacity: 0,
                          scale: 0.5,
                        }}
                        whileInView={{
                          y: 0,
                          opacity: 1,
                          scale: 0.75,
                          transition: {
                            duration: 0.6,
                            ease: [0.6, 0.01, 0.05, 0.9],
                          },
                        }}
                        // viewport={{ once: true }}
                        className="absolute inset-x-0 -bottom-3 block h-[20px] w-full bg-black blur-xl"
                      ></motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div className="overflow-hidden px-8 pb-20 pt-20 sm:pt-32 lg:px-10">
        <div className="relative w-full pb-5 sm:pb-0">
          <div className="relative font-sora text-5xl text-black">
            <AnimateHeading text={'Featured Products'} staggerAnimate={0.05} />
          </div>
          <div className="absolute inset-0 -left-[0.25em] -top-[0.425em] -z-[1] hidden w-full whitespace-nowrap font-poppins text-[9em] text-gray-100 sm:inline-block md:-left-[0.375em] md:-top-[0.875em]">
            <AnimateHeading text={'Featured'} staggerAnimate={0.1} />
          </div>
        </div>

        <motion.div
          initial="initial"
          whileInView="animate"
          // only plays once
          viewport={{ once: true }}
          variants={flexContainerVariants}
          className="flex flex-row flex-wrap items-center justify-center gap-0 p-3 px-0 sm:px-10 md:justify-start md:gap-3 md:p-3"
        >
          {laptopBagsData &&
            laptopBagsData.items.map((item, index) => {
              return (
                <motion.div
                  variants={flexItemVariants}
                  key={index}
                  style={{ originX: 0.5, originY: 1 }}
                  className="flex origin-center flex-col items-start justify-start gap-4 p-3 lg:gap-4 lg:p-3"
                >
                  <Image
                    className="h-full w-full object-cover md:h-[200px] md:w-[200px] lg:h-[250px] lg:w-[250px]"
                    src={item.fields.productBannerImage.fields.file.url}
                    alt={item.fields.productName}
                    width={250}
                    height={250}
                  />
                  <h1 className="w-full text-xs font-medium text-black md:max-w-[220px] lg:max-w-[280px] lg:text-sm">
                    {excerpt(item.fields.productName, 100)}
                  </h1>
                  <div className="flex w-full flex-wrap items-center justify-between ">
                    <p className="font-sora text-xs font-semibold text-black lg:text-sm">
                      ₹{item.fields.productPrice}/-
                    </p>

                    <Link
                      href={`/products/${item.sys.id}`}
                      className="inline-block translate-x-0 py-2 align-middle font-sora text-xs text-black duration-150 hover:translate-x-2 hover:text-green-600"
                    >
                      View Product <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          {laptopBagsData && (
            <motion.div variants={flexItemVariants} className="md:flex-1 lg:p-5">
              <ChevronRightButton label="view all" href="/products/category/laptop bag" />
            </motion.div>
          )}
        </motion.div>
      </div>

      <div className="">
        <div className="relative mx-auto max-w-7xl py-24 px-8 sm:px-10 sm:py-20 lg:px-16">
          <div className="relative text-left">
            <div className="absolute inset-0 -left-[0.25em] -top-[0.67em] -z-[1] inline-block w-full whitespace-nowrap font-poppins text-[4em] text-gray-100 sm:text-[9em] md:-left-[0.6em]">
              <AnimateHeading text={'Collection'} />
            </div>

            <h2 className="mb-5 font-sora text-6xl text-black sm:text-9xl">
              <StaggeringText text={'Behide'} staggerHover={0.015} staggerInitial={0.01} /> new in's
              of the year{' '}
              <span className="text-green-600">
                <StaggeringText text={'2023'} staggerHover={0.03} staggerInitial={0.01} />
              </span>
            </h2>
            <a
              href={`products/`}
              className="ml-3 inline-block translate-x-0 py-2 align-middle font-sora font-medium text-black duration-150 hover:translate-x-3 hover:text-green-600"
            >
              View Collection <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden px-8 pb-20 pt-32 lg:px-10">
        <div className="relative pb-5 sm:pb-0">
          <div className="relative block font-sora text-5xl text-black">
            <AnimateHeading text={'shop backpacks'} staggerAnimate={0.05} />
          </div>
          <div className="absolute inset-0 -left-[0.25em] -top-[0.425em] -z-[1] hidden w-full whitespace-nowrap font-poppins text-[9em] text-gray-100 sm:inline-block md:-left-[0.375em] md:-top-[0.875em]">
            <AnimateHeading text={'Backpacks'} staggerAnimate={0.1} />
          </div>
        </div>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={flexContainerVariants}
          className="flex flex-row flex-wrap items-center justify-center gap-0 px-0 sm:p-3 md:justify-start md:gap-3 md:p-6"
        >
          {backpacksData &&
            backpacksData.items.map((item, index) => {
              return (
                <motion.div
                  key={index}
                  variants={flexItemVariants}
                  className="flex flex-col items-start justify-start gap-4 p-3 lg:gap-4 lg:p-3"
                >
                  <Image
                    className="h-full w-full object-cover md:h-[200px] md:w-[200px] lg:h-[250px] lg:w-[250px]"
                    src={item.fields.productBannerImage.fields.file.url}
                    alt={item.fields.productName}
                    width={250}
                    height={250}
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
                </motion.div>
              );
            })}
          {backpacksData && (
            <motion.div variants={flexItemVariants} className="p-5 md:flex-1">
              <ChevronRightButton label="view all" href="/products/category/backpack" />
            </motion.div>
          )}
        </motion.div>
      </div>
      <CompanyMoto />
    </>
  );
}

export const getStaticProps = async (ctx) => {
  const backpacksData = await client.getEntries({
    content_type: 'blog',
    'fields.productType': 'office bag',
    order: '-sys.createdAt',
    limit: 3,
  });
  const laptopBagsData = await client.getEntries({
    content_type: 'blog',
    'fields.productType': 'office bag',
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
