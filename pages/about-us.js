import ScrollTextSlide from '@/components/ScrollTextSlide';
import { default as ScrollTitle, default as ScrollXHeaderAnimate } from '@/components/ScrollTitle';
import StaggeringText from '@/components/staggering-text';
import PageHead from '@components/PageHead';
import { motion, useScroll, useTransform, useViewportScroll } from 'framer-motion';
import { useRouter } from 'next/router';
import { useRef } from 'react';

const index = () => {
  const router = useRouter();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll(ref);
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.75]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const path = router.pathname.replace('/', '');
  return (
    <>
      <PageHead pageTitle={path} />
      <div className="mx-auto w-full max-w-2xl overflow-hidden py-16 px-4 sm:px-10 lg:max-w-7xl lg:px-8">
        <ScrollTitle
          className="pt-20 font-sora text-5xl capitalize text-black duration-100 sm:text-[10em]"
          AnimateXEnd={-300}
        >
          we at behide
        </ScrollTitle>
        <ScrollTitle
          className="font-sora text-5xl capitalize text-black duration-100 sm:text-[10em]"
          AnimateXEnd={300}
        >
          build trust
        </ScrollTitle>
        <p className="text-brandBlack relative max-w-4xl py-24 pl-28 pb-10 align-middle font-sora text-sm leading-loose">
          Behide is the renowned name in the industry for manufacturing, supplying and distributing
          of Leather Folders, Leather Card Holders, Leather Executive Bags, Leather Wallets and many
          other products. Behide is the Sole Proprietor Ship based company that was emerged in the
          year 2007 at kolkata in West Bengal, India. We are basically a customer oriented company
          that has been satisfying its customers since the time of its incorporation. We provide
          them qualitative leather products that are manufactured by using finest quality and pure
          leather according to their demands and necessities. Our products are exclusively designed
          by our professionals according to the set industrial quality parameters. On the other
          hand, our products are extensively appreciated by our customers due to their elegant look,
          unique designer pattern, trendy design, quality material, flawless finishing, high
          reliability and many other features.
        </p>
      </div>

      <div className="mx-auto flex max-w-2xl flex-col justify-center gap-3 p-10 lg:max-w-6xl">
        <div className="w-full">
          <h2 className="text-brandBlack pb-10 font-sora text-3xl sm:text-8xl">
            our{' '}
            <div className="mt-1 block lowercase text-green-500">
              <StaggeringText text={'Mission'} />
            </div>
          </h2>
          <p className="text-brandBlack max-w-lg pb-10 font-sora text-sm leading-loose">
            Our mission is to provide our customers with the best quality products at the most
            competitive prices. We are committed to providing our customers with the best quality
            products at the most competitive prices.
          </p>
        </div>

        <div className="flex w-full flex-1 flex-col items-end text-right ">
          <h2 className="text-brandBlack pb-10 font-sora text-3xl sm:text-8xl">
            our{' '}
            <div className="mt-1 block lowercase text-green-500">
              <StaggeringText text={'Vision'} />
            </div>
          </h2>
          <p className="text-brandBlack max-w-md pb-10 text-sm leading-loose ">
            Our vision is to be the most respected and trusted name in the industry. We are
            committed to being the most respected and trusted name in the industry. We are committed
            to being the most respected and trusted name in the industry.
          </p>
        </div>

        <div className="w-full">
          <h2 className="text-brandBlack pb-10 font-sora text-3xl sm:text-8xl">
            our{' '}
            <div className="mt-1 block lowercase text-green-500">
              <StaggeringText text={'Values'} />
            </div>
          </h2>
          <p className="text-brandBlack max-w-lg pb-10 text-sm leading-loose">
            Our values are the foundation of our company. We are committed to providing our
            customers with the best quality products at the most competitive prices and to deliver
            them on time.
          </p>
        </div>
      </div>
    </>
  );
};

export default index;
