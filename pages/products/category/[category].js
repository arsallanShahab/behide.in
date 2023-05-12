import { ArrowRight, ChevronRight } from '@/assets';
import Card from '@/components/Card';
import ChevronRightButton from '@/components/arrow-right-btn';
import { excerpt } from '@/lib/utils';
import PageHead from '@components/PageHead';
import { client } from '@lib/contentful';
import Link from 'next/link';
import { useRouter } from 'next/router';

const index = ({ data }) => {
  const router = useRouter();
  const { category } = router.query;
  return (
    <>
      <PageHead pageTitle={category} />

      <div className="mx-auto max-w-2xl overflow-hidden pt-12 xl:max-w-7xl">
        <div className="relative px-8 pb-7 pt-14 sm:px-12">
          <h1 className="font-sora text-5xl capitalize text-black">Shop {category}</h1>
          <div className="absolute inset-0 -left-[0em] -top-[0.425em] -z-[1] inline-block w-full whitespace-nowrap font-poppins text-[9em] capitalize text-gray-100 md:-left-[0em] md:-top-[0.5em]">
            {category}
          </div>
        </div>
        <div className="bg-brandGrey">
          <div className="px-10 pb-16 pt-5 sm:px-6 lg:px-8">
            <div className="relative flex flex-row flex-wrap justify-start gap-y-10 gap-x-10 xl:gap-x-8">
              {data && data?.products?.items?.length > 0 ? (
                data.products.items.map((product, index) => (
                  <Card product={product} index={index} key={index} />
                ))
              ) : (
                //genearte code for back to home button
                <div className="flex flex-col items-start gap-5 px-0 sm:px-5">
                  <p className="relative mt-6 block max-w-xl pr-10 font-sora text-3xl capitalize text-black duration-100 sm:text-4xl sm:leading-relaxed md:text-[2rem]">
                    we can't find what you are looking for
                  </p>
                  <ChevronRightButton
                    href={'/products'}
                    label="back to products"
                    customClass="mr-2 bg-gray-50"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async (ctx) => {
  const { category } = ctx.params;
  const response = await client.getEntries({
    content_type: 'blog',
    'fields.productType': category,
  });

  if (!response || !response.items || !response.items.length) {
    // return empty array if no products found for category
    return {
      props: {
        data: { products: [] },
      },
    };
  }

  return {
    props: {
      data: { products: response },
    },
  };
};

export const getStaticPaths = async () => {
  const response = await client.getEntries({ content_type: 'blog' });
  const entries = response.items;
  const categories = entries.map((item, index) => item.fields.productType);
  const paths = categories.map((item) => ({
    params: {
      category: item.toString(),
    },
  }));
  return {
    paths,
    fallback: true,
  };
};

export default index;
