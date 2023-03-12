import PageHead from '@components/PageHead';
import { client } from '@lib/contentful';
import Link from 'next/link';
import { useRouter } from 'next/router';
import safeJsonStringify from 'safe-json-stringify';

function index({ data }) {
  console.log(data);
  const router = useRouter();
  const path = router.pathname.replace('/', '');
  const excerpt = (str, end = 50) => {
    return str.length > end ? str.substring(0, end) + '...' : str;
  };

  return (
    <>
      <PageHead pageTitle={path} />
      <div className="mb-5 px-16 pt-14">
        <h1 className="font-sora text-4xl font-bold">Products</h1>
      </div>
      <div className="flex flex-row items-center justify-between px-16 pb-10">
        <div className="flex items-center gap-6 text-sm">
          <p className="font-light">Filter by:</p>

          <div className="flex flex-row items-center justify-between gap-6">
            <div className="relative cursor-pointer rounded-md p-1 hover:bg-gray-100">
              <p className="inline-block font-light">Category</p>
              <svg
                className="mx-1 inline-block h-4 w-4 -rotate-90 transition-transform duration-200"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
                  fill="currentColor"
                ></path>
              </svg>
              {/* <select className="inline-block rounded-md border border-gray-300">
                <option value="all">All</option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
                <option value="category3">Category 3</option>
              </select> */}
            </div>
            <div className="relative cursor-pointer rounded-md p-1 hover:bg-gray-100">
              <p className="inline-block font-light">Price</p>
              <svg
                className="mx-1 inline-block h-4 w-4 -rotate-90 transition-transform duration-200"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
                  fill="currentColor"
                ></path>
              </svg>
              {/* <select className="inline-block rounded-md border border-gray-300">
                <option value="all">All</option>
                <option value="price1">Price 1</option>
                <option value="price2">Price 2</option>
                <option value="price3">Price 3</option>
              </select> */}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-6">
          <p className="text-sm font-light">Sort by:</p>
          <div className="flex flex-row items-center justify-between gap-6">
            <div className="relative cursor-pointer rounded-md p-1 hover:bg-gray-100">
              <p className="inline-block text-sm font-light">Featured</p>
              <svg
                className="mx-1 inline-block h-4 w-4 -rotate-90 transition-transform duration-200"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
          <p className="text-sm font-light">5 items</p>
        </div>
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
