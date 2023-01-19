import Link from "next/link";
import { useState } from "react";
import safeJsonStringify from "safe-json-stringify";
import PageHead from "../../../components/PageHead";
import { client } from "../../../lib/contentful";

const index = ({ data }) => {
  console.log(data);
  const [index, setIndex] = useState(0);
  const { id, product } = data;
  const Images = product.fields.productAssets;
  // product.fields.productAssets[0].fields.file.url;

  const excerpt = (string) => {
    if (string.length > 70) {
      return string.slice(0, 70) + " . . . ";
    } else {
      return string;
    }
  };

  return (
    <div className="bg-brandGrey">
      <PageHead pageTitle={product.fields.productName} />
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl flex-wrap items-start gap-x-2 gap-y-4 px-4 font-poppins sm:px-6 lg:max-w-7xl lg:px-8"
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
                {excerpt(product.fields.productName)}
              </Link>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl items-stretch justify-center self-center sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-w-4 aspect-h-5 lg:aspect-w-3 lg:aspect-h-4 hidden sm:block sm:overflow-hidden sm:rounded-lg">
            <img
              src={product.fields.productAssets[0].fields.file.url}
              alt={product.fields.productAssets[0].fields.title}
              className="h-[60vh] w-full object-cover object-center sm:h-full"
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
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="flex flex-col gap-3 p-3 sm:hidden">
            <div className="w-full overflow-hidden rounded-md">
              <img
                className="h-[60vh] w-full object-cover object-center"
                src={product.fields.productAssets[index].fields.file.url}
              />
            </div>

            <div className="flex w-full flex-row gap-3 rounded-md bg-white p-3">
              {product.fields.productAssets.map((item, i) => {
                return (
                  <div
                    onClick={() => setIndex(i)}
                    className="basis-1/4 cursor-pointer overflow-hidden rounded-md duration-200 active:scale-75 active:opacity-75"
                  >
                    <img
                      className="h-32 w-full object-cover object-center"
                      src={product.fields.productAssets[i].fields.file.url}
                    />
                  </div>
                );
              })}
              {/* <div
                onClick={() => setIndex(0)}
                className="basis-1/4 rounded-md overflow-hidden cursor-pointer"
              >
                <img
                  className="w-full h-32 object-cover object-center"
                  src={product.fields.productAssets[0].fields.file.url}
                />
              </div> */}
              {/* <div
                onClick={() => setIndex(1)}
                className="basis-1/4 rounded-md overflow-hidden cursor-pointer"
              >
                <img
                  className="w-full h-32 object-cover object-center"
                  src={product.fields.productAssets[1].fields.file.url}
                />
              </div> */}
              {/* <div
                onClick={() => setIndex(2)}
                className="basis-1/4 rounded-md overflow-hidden cursor-pointer"
              >
                <img
                  className="w-full h-32 object-cover object-center"
                  src={product.fields.productAssets[2].fields.file.url}
                />
              </div> */}
              {/* <div
                onClick={() => setIndex(3)}
                className="basis-1/4 rounded-md overflow-hidden cursor-pointer"
              >
                <img
                  className="w-full h-32 object-cover object-center"
                  src={product.fields.productAssets[3].fields.file.url}
                />
              </div> */}
            </div>
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="font-poppins text-xl font-bold text-gray-900 sm:text-2xl">
              {product.fields.productName}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-12 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <div className="flex flex-row flex-wrap items-center justify-between gap-3">
              <p className="font-poppins text-3xl font-bold text-gray-900">
                Rs. {product.fields.productPrice}
              </p>
              {product.fields.skuId ? (
                <p className="cursor-pointer select-none rounded-lg border bg-white px-4 py-3 font-poppins text-sm font-semibold text-black duration-200 active:bg-slate-200">
                  SKU ID - {product.fields.skuId}
                </p>
              ) : null}
            </div>

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="font-rubik text-xs font-semibold uppercase text-gray-900">
                  Color
                </h3>
                <p className="mt-3 cursor-pointer select-none rounded-lg bg-brand-grey p-3 text-center font-semibold uppercase text-black duration-200 active:bg-slate-200">
                  {product.fields.productColor}
                </p>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <h3 className="font-rubik text-xs font-semibold uppercase text-gray-900">
                  Size
                </h3>
                <div className="mt-3 flex flex-row flex-wrap justify-center gap-y-0 gap-x-3  rounded-lg  bg-brand-grey p-3 font-poppins">
                  <div className="flex-1 cursor-pointer select-none items-center rounded-md bg-white p-2 text-center text-sm font-medium text-slate-800 duration-200 active:bg-slate-200">
                    Length:
                    <span className="font-semibold text-black">
                      {`  ${product.fields.productLength}cm`}
                    </span>
                  </div>
                  <div className="flex-1 cursor-pointer select-none items-center justify-between rounded-md bg-white p-2 text-center text-sm font-medium text-slate-600 duration-200 active:bg-slate-200">
                    Breadth:{" "}
                    <span className="font-semibold text-black">
                      {`  ${product.fields.productBreadth}cm`}
                    </span>
                  </div>
                  <div className="flex-1 cursor-pointer select-none items-center justify-between rounded-md bg-white p-2 text-center text-sm font-medium text-slate-600 duration-200 active:bg-slate-200">
                    Height:{" "}
                    <span className="font-semibold text-black">
                      {`  ${product.fields.productHeight}cm`}
                    </span>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="font-rubik text-xs font-semibold uppercase text-gray-900">
                    Stock
                  </h3>
                  {product.fields.productInStock ? (
                    <p className="mt-3 cursor-pointer select-none rounded-lg bg-brand-grey p-3 text-center font-semibold capitalize duration-200 active:bg-slate-200">
                      {" "}
                      <span className="text-green-500">In Stock</span> and ready
                      to ship
                    </p>
                  ) : (
                    <p className="mt-3 cursor-pointer select-none rounded-lg border bg-white p-3 text-center font-semibold capitalize text-rose-500 duration-200 active:bg-slate-200">
                      Out of Stock
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Description and details */}
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
            <div className="mt-10">
              <h3 className="font-rubik text-sm font-semibold uppercase text-gray-900">
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
