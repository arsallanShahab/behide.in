import PageHead from '@components/PageHead';
import { useRouter } from 'next/router';

const index = () => {
  const router = useRouter();
  const path = router.pathname.replace('/', '');
  return (
    <>
      <PageHead pageTitle={path} />
      <div className="mx-auto w-full max-w-2xl py-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="pb-10 pt-10 font-sora text-5xl font-bold capitalize text-black sm:text-5xl">
          we at behide build trust
        </h2>
        <p className="text-brandBlack pb-10 font-sora text-xl font-medium leading-loose">
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

      <div className="mx-auto flex max-w-2xl flex-row justify-center gap-3 p-10 lg:max-w-7xl">
        <div className="w-full  py-16 ">
          <h2 className="text-brandBlack pb-10 font-sora text-3xl font-bold capitalize sm:text-5xl">
            Our <span className="text-green-500">Mission</span>
          </h2>
          <p className="text-brandBlack pb-10 font-sora text-sm font-medium leading-loose">
            Our mission is to provide our customers with the best quality products at the most
            competitive prices. We are committed to providing our customers with the best quality
            products at the most competitive prices.
          </p>
        </div>

        <div className="mx-auto w-full max-w-2xl py-16 lg:max-w-7xl lg:px-8">
          <h2 className="text-brandBlack pb-10 font-sora text-3xl font-bold capitalize sm:text-5xl">
            Our <span className="text-green-500">Vision</span>
          </h2>
          <p className="text-brandBlack pb-10 font-sora text-sm font-medium leading-loose">
            Our vision is to be the most respected and trusted name in the industry. We are
            committed to being the most respected and trusted name in the industry.
          </p>
        </div>

        <div className="mx-auto w-full max-w-2xl py-16 lg:max-w-7xl lg:px-8">
          <h2 className="text-brandBlack pb-10 font-sora text-3xl font-bold capitalize sm:text-5xl">
            Our <span className="text-green-500">Values</span>
          </h2>
          <p className="text-brandBlack pb-10 font-sora text-sm font-medium leading-loose">
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
