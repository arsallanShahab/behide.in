import Card from '@/components/Card';
import Heading from '@/components/Heading';
import LogoCloud from '@/components/LogoCloud';
import ChevronRightButton from '@/components/arrow-right-btn';
import AnimateHeading from '@/components/heading-animate';
import StaggeringText from '@/components/staggering-text';
import { excerpt } from '@/lib/utils';
// import { transition } from '@/lib/utils/CONSTANTS';
import CompanyMoto from '@components/CompanyMoto';
import Header from '@components/PageHead';
import { ArrowRightIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
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

      <div className="slideshow slide-bg">
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
                <motion.div className="relative flex flex-col items-center justify-center bg-opacity-50 px-6  pt-8 pb-36 sm:px-3 lg:flex-row">
                  <div className="flex basis-full flex-col items-center justify-center px-0 text-center sm:px-8 lg:basis-3/5 lg:items-end lg:justify-end">
                    <motion.h3
                      initial={{
                        x: '10%',
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
                      className="word-spacing-trending py-0 pr-4 text-right align-middle font-sora text-sm font-semibold uppercase text-black"
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
                      className="relative z-10 mb-5 max-w-sm break-words text-center font-sora text-[40px] font-medium lowercase leading-tight text-gray-900 sm:text-[4.9rem] md:max-w-full md:leading-[.9] lg:pl-7 lg:text-right"
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
                      className=" group inline-block rounded-3xl py-2 px-3 align-middle text-sm font-semibold text-black duration-150 hover:bg-gray-50"
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

      <LogoCloud />

      <div className="overflow-hidden px-8 pb-20 pt-20 sm:pt-32 lg:px-10">
        <div className="relative mb-12 w-full px-0 sm:px-10">
          <h1 className="mb-10 text-5xl capitalize">Featured Products</h1>
        </div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={flexContainerVariants}
          className="flex flex-row flex-wrap items-center justify-center gap-0 rounded-xl p-3 px-0 sm:px-10 md:justify-start md:gap-3"
        >
          {laptopBagsData &&
            laptopBagsData.items.map((item, index) => {
              return (
                <Card
                  variants={flexItemVariants}
                  key={index}
                  style={{ originX: 0.5, originY: 1 }}
                  product={item}
                  index={index}
                  lg
                />
              );
            })}
          {laptopBagsData && (
            <motion.div
              //  variants={flexItemVariants}
              className="md:flex-1 lg:p-5"
            >
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
      <div className="relative overflow-hidden px-8 pb-32 pt-32 lg:px-10">
        <div className="relative mb-12 w-full px-0 sm:px-10">
          <h1 className="mb-10 text-5xl capitalize">Best Selling Backpacks</h1>
        </div>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={flexContainerVariants}
          className="flex flex-row flex-wrap items-center justify-center gap-0 rounded-xl p-3 px-0 sm:px-10 md:justify-start md:gap-3"
        >
          {backpacksData &&
            backpacksData.items.map((item, index) => {
              return (
                <Card
                  variants={flexItemVariants}
                  key={index}
                  style={{ originX: 0.5, originY: 1 }}
                  product={item}
                  index={index}
                  lg
                />
              );
            })}
          {backpacksData && (
            <motion.div
              //  variants={flexItemVariants}
              className="p-5 md:flex-1"
            >
              <ChevronRightButton
                label="view all"
                href={`products/category/${backpacksData?.items[0]?.fields.productType}`}
              />
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
