import PageHead from '@components/PageHead';
import { client } from '@lib/contentful';
import Link from 'next/link';
import { useRouter } from 'next/router';

const index = ({ data }) => {
  const router = useRouter();
  const { category } = router.query;
  const excerpt = (str, start, end) => {
    return str.length > end ? str.substring(start, end) + '...' : str;
  };
  return (
    <>
      <PageHead pageTitle={category} />
      <nav aria-label="Breadcrumb" className="mt-14">
        <ol
          role="list"
          className="mx-auto flex max-w-2xl flex-wrap items-start gap-x-2 gap-y-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <li>
            <div className="flex items-center">
              <Link href={`/`} className="mr-2 text-sm font-light text-black">
                Homepage
              </Link>
              <svg
                width={16}
                height={20}
                viewBox="0 0 16 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-5 w-4 text-gray-300"
              >
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <Link href={`/products`} className="mr-2 text-sm font-light text-black">
                products
              </Link>
              <svg
                width={16}
                height={20}
                viewBox="0 0 16 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-5 w-4 text-gray-300"
              >
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
          </li>
          <li className="text-sm">
            <Link
              href={`/products/category/${category}`}
              aria-current="page"
              className="font-light text-gray-500 hover:text-gray-600"
            >
              {category}
            </Link>
          </li>
        </ol>
      </nav>
      <div className="bg-brandGrey">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 items-start gap-y-10 gap-x-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {data
              ? data.products.items.map((product, index) => (
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
                      <h3 className="px-6 text-left text-xs font-light leading-6 text-black">
                        {excerpt(product.fields.productName, 0, 100)}
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
