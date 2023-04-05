import { ArrowRight, ChevronRight } from '@/assets';
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
        {/* <h1 className="font-sora text-5xl font-bold capitalize">{category}</h1> */}
        <div className="flex items-center gap-2">
          <Link href={'/'} className="text-sm font-semibold">
            HOME
          </Link>
          <ChevronRight className="h-4 w-4 stroke-[3px]" />
          <Link href={category} className="text-sm font-semibold uppercase">
            {category}
          </Link>
        </div>
      </div>
      <div className="bg-brandGrey">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 items-start gap-y-10 gap-x-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {data
              ? data.products.items.map((product, index) => (
                  <Link
                    key={index}
                    href={`/products/${product.sys.id}`}
                    className="box-shadow active:box-shadow-hover hover:box-shadow-hover group inline-block rounded-xl bg-gray-50 duration-300 hover:-translate-y-4 hover:bg-white active:-translate-y-4 active:bg-white"
                  >
                    <div className="w-full overflow-hidden p-3">
                      <img
                        src={product.fields.productBannerImage.fields.file.url}
                        alt={product.fields.productBannerImage.fields.title}
                        className="h-auto w-full rounded-xl object-center group-hover:opacity-75"
                      />
                    </div>
                    <div className="overflow-hidden font-poppins">
                      <h3 className="px-6 text-left text-xs font-light leading-6 text-black">
                        {excerpt(product.fields.productName, 100)}
                      </h3>
                      <div className="flex items-center justify-between px-6 py-4">
                        <p className="text-sm font-light text-black">
                          ₹{product.fields.productPrice}
                        </p>
                        <ChevronRightButton label="view product" small={true} />
                      </div>
                    </div>
                  </Link>
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
