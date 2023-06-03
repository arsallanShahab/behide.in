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
      <div className="relative mx-auto w-full overflow-hidden py-16 px-7 sm:px-10 md:max-w-2xl lg:max-w-7xl lg:px-8">
        <ScrollTitle
          className="relative pt-10 font-sora text-5xl capitalize text-black duration-100 sm:pt-20 sm:text-8xl  md:text-[10em]"
          AnimateXEnd={-300}
        >
          we at behide
        </ScrollTitle>
        <ScrollTitle
          className="relative font-sora text-5xl capitalize text-black duration-100 sm:text-8xl md:text-[10em]"
          AnimateXEnd={300}
        >
          build trust
        </ScrollTitle>
        <p className="text-brandBlack relative z-10 px-2 py-5 text-justify align-middle font-sora text-sm leading-[2] sm:py-24 sm:text-left sm:text-base md:pr-12 md:text-lg md:leading-[2.5]">
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

      <div className="mx-auto flex w-full flex-col justify-center gap-20 p-5 sm:p-10">
        <div className="w-full text-center sm:text-left">
          <h2 className="text-brandBlack pb-5 font-sora text-5xl sm:text-8xl">
            Our <StaggeringText text={'Mission'} />
          </h2>
          <p className="mt-5 align-middle font-sora text-xs leading-[2] sm:text-sm md:text-lg md:leading-[2.5]">
            Our mission is to empower our customers by offering them superior quality products at
            highly competitive prices. We are dedicated to delivering the utmost value and
            satisfaction to our customers through a relentless pursuit of excellence and unwavering
            commitment to their needs. With an unwavering focus on quality and affordability, we
            strive to be the preferred choice for customers seeking top-notch products without
            compromising on cost-effectiveness. Our goal is to consistently exceed customer
            expectations, foster long-term partnerships, and establish ourselves as a trusted
            provider of high-quality products in the market.
          </p>
        </div>

        <div className="flex w-full flex-1 flex-col items-end text-center sm:text-right">
          <h2 className="text-brandBlack pb-5 font-sora text-5xl sm:text-8xl">
            Our <StaggeringText text={'Vision'} />
          </h2>
          <p className="mt-5 align-middle font-sora text-xs leading-[2] sm:text-sm md:text-lg md:leading-[2.5]">
            Our vision is to become the epitome of respect and trust in the industry, setting the
            standard for excellence and reliability. We aspire to be recognized as the most
            respected and trusted name in our field, known for our unwavering commitment to quality,
            integrity, and customer satisfaction. Through continuous innovation, exceptional
            service, and a steadfast dedication to our core values, we strive to earn the trust and
            respect of our customers, partners, and stakeholders. Our unwavering pursuit of
            excellence and our relentless focus on building lasting relationships will propel us to
            be the industry leader, shaping the future of our field with our unwavering commitment
            to excellence.
          </p>
        </div>

        <div className="w-full text-center sm:text-left">
          <h2 className="text-brandBlack pb-5 font-sora text-5xl sm:text-8xl">
            Our <StaggeringText text={'Values'} />
          </h2>
          <p className="mt-5 align-middle font-sora text-xs leading-[2] sm:text-sm md:text-lg md:leading-[2.5]">
            At our core, we value delivering superior quality products at competitive prices and
            ensuring timely delivery to our customers. These values drive our commitment to
            excellence, guiding every aspect of our operations and interactions. We take pride in
            upholding these principles, as they form the foundation of our company and enable us to
            exceed customer expectations.We believe in building lasting relationships with our
            customers, based on trust, transparency, and exceptional service. Our values inspire us
            to continuously innovate, improve, and adapt to meet the evolving needs of our
            customers, ensuring their satisfaction and loyalty.
          </p>
        </div>
      </div>
    </>
  );
};

export default index;
