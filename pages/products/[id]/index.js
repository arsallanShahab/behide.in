import Link from "next/link";
import safeJsonStringify from "safe-json-stringify";
import PageHead from "../../../components/PageHead";
import { client } from "../../../lib/contentful";

const index = ({ data }) => {
  console.log(data);
  const { id, product } = data;

  return (
    <div className="bg-white">
      <PageHead pageTitle={product.fields.productName} />
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="font-poppins mx-auto flex flex-wrap max-w-2xl items-start gap-x-2 gap-y-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li>
              <div className="flex items-center">
                <Link
                  href={`/`}
                  className="mr-2 text-sm font-semibold text-gray-900"
                >
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
                <Link
                  href={`/products/category/${product.fields.productType}`}
                  className="mr-2 text-sm font-semibold text-gray-900"
                >
                  {product.fields.productType}
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
                href={`/products/${product.sys.id}`}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.fields.productName}
              </Link>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl items-center self-center justify-center sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
            <img
              src={product.fields.productAssets[0].fields.file.url}
              alt={product.fields.productAssets[0].fields.title}
              className="h-[60vh] sm:h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
              <img
                src={product.fields.productAssets[1].fields.file.url}
                alt={product.fields.productAssets[1].fields.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
              <img
                src={product.fields.productAssets[2].fields.file.url}
                alt={product.fields.productAssets[2].fields.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={product.fields.productAssets[3].fields.file.url}
              alt={product.fields.productAssets[3].fields.title}
              className="w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="font-poppins text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.fields.productName}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-12 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <div className="flex flex-row flex-wrap items-center justify-between gap-3">
              <p className="font-poppins font-bold text-3xl tracking-tight text-gray-900">
                Rs. {product.fields.productPrice}
              </p>
              {product.fields.skuId ? (
                <p className="font-poppins font-semibold px-6 border py-3 bg-slate-100 rounded-lg text-black cursor-pointer active:bg-slate-200 duration-200 select-none">
                  SKU ID - {product.fields.skuId}
                </p>
              ) : null}
            </div>

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="font-rubik uppercase text-xs font-semibold text-gray-900">
                  Color
                </h3>
                <p className="capitalize mt-3 font-semibold p-3 bg-slate-100 text-black rounded-lg text-center cursor-pointer select-none active:bg-slate-200 duration-200">
                  {product.fields.productColor}
                </p>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <h3 className="text-xs font-rubik uppercase font-semibold text-gray-900">
                  Size
                </h3>
                <div className="font-poppins flex flex-row flex-wrap justify-center items-center p-3 mt-3 rounded-lg bg-slate-100 gap-y-0 gap-x-1">
                  <div className="p-2 rounded-md flex items-center justify-between text-sm font-medium text-slate-800 cursor-pointer active:bg-slate-200 duration-200 select-none">
                    Length:
                    <span className="font-semibold text-black">
                      {`  ${product.fields.productLength}cm`}
                    </span>
                  </div>
                  <div className="p-2 rounded-md flex items-center justify-between text-sm font-medium text-slate-600 cursor-pointer bg-slate-100 active:bg-slate-200 duration-200 select-none">
                    Breadth:{" "}
                    <span className="font-semibold text-black">
                      {`  ${product.fields.productBreadth}cm`}
                    </span>
                  </div>
                  <div className="p-2 rounded-md flex items-center justify-between text-sm font-medium text-slate-600 cursor-pointer bg-slate-100 active:bg-slate-200 duration-200 select-none">
                    Height:{" "}
                    <span className="font-semibold text-black">
                      {`  ${product.fields.productHeight}cm`}
                    </span>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-xs font-rubik uppercase font-semibold text-gray-900">
                    Stock
                  </h3>
                  {product.fields.productInStock ? (
                    <p className="capitalize text-center mt-3 font-semibold p-3 bg-slate-100 rounded-lg cursor-pointer active:bg-slate-200 duration-200 select-none">
                      {" "}
                      <span className="text-green-500">In Stock</span> and ready
                      to ship
                    </p>
                  ) : (
                    <p className="capitalize text-center mt-3 font-semibold p-3 bg-slate-100 rounded-lg text-rose-500 cursor-pointer active:bg-slate-200 duration-200 select-none">
                      Out of Stock
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Description and details */}
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                {/* <p className="text-base text-gray-900">
                  {product.productDescription}
                </p> */}
              </div>
            </div>

            <div className="mt-10">
              <h3 className="font-rubik uppercase text-sm font-semibold text-gray-900">
                Highlights
              </h3>

              <div className="mt-4">
                <ul
                  role="list"
                  className="list-disc space-y-2 pl-4 text-sm leading-loose"
                >
                  {product.fields.productHighlight
                    ? product.fields.productHighlight
                        .split("--")
                        .map((highlight, index) =>
                          highlight.length < 5 ? null : (
                            <li key={index} className="text-gray-400">
                              <span className="text-gray-600">{highlight}</span>
                            </li>
                          )
                        )
                    : null}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="font-rubik uppercase text-sm font-semibold text-gray-900">
                Details
              </h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600 leading-loose">
                  {product.fields.productDetails}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async (ctx) => {
  //   const { name, category, id } = ctx.query;
  const id = ctx.params.id;
  const response = await client.getEntry(`${id}`);
  const fields = safeJsonStringify(response);
  const data = JSON.parse(fields);
  return {
    props: {
      data: { id, product: data },
    },
  };
};

export const getStaticPaths = async () => {
  const response = await client.getEntries({ content_type: "blog" });
  const entries = response.items;
  const ids = entries.map((item, index) => item.sys.id);
  const paths = ids.map((item) => ({
    params: {
      id: item.toString(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export default index;
