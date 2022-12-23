import Link from "next/link";
import { useState } from "react";
import safeJsonStringify from "safe-json-stringify";
import { client } from "../lib/contentful";

function stocks({ data }) {
  console.log(data);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-4xl font-bold pt-2 pb-8">Products</h2>

          <div className="grid grid-cols-1 gap-y-10 gap-x-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {data
              ? data.map((product, index) => (
                  <Link
                    key={index}
                    href={`/product/${product.sys.id}`}
                    className="group"
                  >
                    <div className=" w-full overflow-hidden rounded-lg bg-gray-200 p-6 ">
                      <img
                        src={product.fields.productBannerImage.fields.file.url}
                        alt={product.fields.productBannerImage.fields.title}
                        className="h-full w-full object-cover object-center group-hover:opacity-75 rounded-lg"
                      />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">
                      {product.fields.productName}
                    </h3>
                    <div className="flex justify-between items-center">
                      <p className="mt-1 text-lg text-gray-900 font-semibold">
                        Rs. {product.fields.productPrice}
                      </p>
                      {product.fields.productInStock ? (
                        <p className="mt-1 text-sm text-green-600 font-semibold">
                          In Stock
                        </p>
                      ) : (
                        <p className="mt-1 text-sm text-rose-600 font-semibold">
                          Out of Stock
                        </p>
                      )}
                    </div>
                  </Link>
                ))
              : null}
          </div>
          <div>
            {data.length == 0 ? (
              <p className="mt-6 text-3xl text-gray-400">
                currently we don't have any products
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async (ctx) => {
  const response = await client.getEntries();
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

export default stocks;
