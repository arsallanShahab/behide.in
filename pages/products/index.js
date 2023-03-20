import ChevronRight from '@/assets/chevron-right';
import PageHead from '@components/PageHead';
import { client } from '@lib/contentful';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import safeJsonStringify from 'safe-json-stringify';

function index({ data }) {
  const [active, setActive] = useState(false);
  const router = useRouter();
  const { query } = router.query;

  const path = router.pathname.replace('/', '');
  const excerpt = (str, end = 50) => {
    return str.length > end ? str.substring(0, end) + '...' : str;
  };

  useEffect(() => {
    // if(router.query.query){
    //   const query = router.query.query
    //   if(query === 'low-to-high'){
    //     data.sort((a,b)=>a.price-b.price)
    //   }else if(query === 'high-to-low'){
    //     data.sort((a,b)=>b.price-a.price)
    //   }
    // }
    if (query) {
      if (query === 'low-to-high') {
        data.sort((a, b) => a.fields.productPrice - b.fields.productPrice);
      } else if (query === 'high-to-low') {
        data.sort((a, b) => b.fields.productPrice - a.fields.productPrice);
      }
    }
  }, [query]);

  return (
    <>
      <PageHead pageTitle={path} />
      <div className="mb-5 px-16 pt-14">
        <h1 className="font-sora text-5xl font-bold text-black">Products</h1>
      </div>

      <div>
        <div className="mx-auto max-w-2xl py-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 items-start gap-y-10 gap-x-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {data
              ? data.map((product, index) => (
                  <Link
                    key={index}
                    href={`/products/${product.sys.id}`}
                    className="box-shadow active:box-shadow-hover hover:box-shadow-hover group inline-block rounded-md duration-300 hover:-translate-y-4 hover:bg-white active:-translate-y-4 active:bg-white"
                  >
                    <div className="w-full overflow-hidden p-3">
                      <img
                        src={product.fields.productBannerImage.fields.file.url}
                        alt={product.fields.productBannerImage.fields.title}
                        className="h-auto w-full rounded-lg object-center group-hover:opacity-75"
                      />
                    </div>
                    <div className="overflow-hidden font-poppins">
                      <h3 className="px-6 text-left font-poppins text-xs font-light leading-5 text-black">
                        {excerpt(product.fields.productName, 100)}
                      </h3>
                      <div className="flex items-center justify-between px-6 py-4">
                        <p className="text-sm font-light text-black">
                          ₹{product.fields.productPrice}
                        </p>
                        {product.fields.productInStock ? (
                          <p className="text-sm font-light text-green-600">In Stock</p>
                        ) : (
                          <p className="text-sm font-light text-rose-600">Out of Stock</p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))
              : null}
          </div>
          <div>
            {data.length == 0 ? (
              <p className="mt-6 text-3xl text-gray-400">currently we don't have any products</p>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async (ctx) => {
  const response = await client.getEntries({ content_type: 'blog' });
  const entries = response.items;
  // const fields = entries.map((item) => item.fields);
  // const fields = safeJsonStringify(entries.map((item) => item.fields));
  const fields = safeJsonStringify(entries);
  const data = JSON.parse(fields);

  return {
    props: {
      data: data,
    },
  };
};

export default index;
