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

      <div className="px-12 pb-0 pt-14">
        <h1 className="font-sora text-5xl capitalize">Shop {category}</h1>
        {/* <div className="flex items-center gap-2">
          <Link href={'/'} className="text-sm font-semibold text-slate-600">
            HOME
          </Link>
          <ChevronRight className="h-4 w-4 stroke-[3px]" />
          <span className="text-sm font-semibold">/</span>
          <Link href={category} className="text-sm font-semibold uppercase text-slate-600">
            {category}
          </Link>
        </div> */}
      </div>
      <div className="bg-brandGrey">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 items-start gap-y-10 gap-x-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {data
              ? data.products.items.map((product, index) => (
                  <Card product={product} index={index} key={index} />
                ))
              : null}
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
  if (response === undefined || response === null || response === '') {
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
    fallback: false,
  };
};

export default index;
