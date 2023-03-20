import { useGlobalContextProvider } from '@/context/GlobalContext';
import PageHead from '@components/PageHead';
import { client } from '@lib/contentful';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import safeJsonStringify from 'safe-json-stringify';

const index = ({ data }) => {
  console.log(data);
  const [index, setIndex] = useState(0);
  const {
    quantity,
    setQuantity,
    cartItems,
    setCartItems,
    setTotalQuantity,
    totalQuantity,
    totalPrice,
    setTotalPrice,
  } = useGlobalContextProvider();
  const { id, product } = data;

  const excerpt = (string, length = 70) => {
    if (string.length > length) {
      return string.slice(0, length) + ' . . . ';
    } else {
      return string;
    }
  };
  const addToCart = () => {
    const checkProductInCart = cartItems.find((item) => item.id === id);
    const stoargeCart = JSON.parse(localStorage.getItem('cart') || '[]');

    setTotalPrice(totalPrice + product.fields.productPrice * quantity);
    setTotalQuantity(totalQuantity + quantity);

    if (stoargeCart && stoargeCart.length > 0 && checkProductInCart) {
      const checkProductInStorage = stoargeCart.find((item) => item.id === id);
      if (checkProductInStorage) {
        const updatedCartItems = cartItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + quantity };
          }
          return item;
        });
        setCartItems(updatedCartItems);
        const updatedStorageCart = stoargeCart.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + quantity };
          }
          return item;
        });
        localStorage.setItem('cart', JSON.stringify(updatedStorageCart));
      }
    } else {
      setCartItems([
        ...cartItems,
        {
          quantity,
          id,
          thumbnail: product.fields.productBannerImage.fields.file.url.replace('//', 'https://'),
          price: product.fields.productPrice,
          name: product.fields.productName,
          sku_id: product.fields.skuId,
        },
      ]);
      localStorage.setItem(
        'cart',
        JSON.stringify(
          stoargeCart.concat({
            quantity,
            id,
            thumbnail: product.fields.productBannerImage.fields.file.url.replace('//', 'https://'),

            price: product.fields.productPrice,
            name: product.fields.productName,
            sku_id: product.fields.skuId,
          }),
        ),
      );
    }
    setQuantity(1);
    toast.success(`${quantity} item added to cart`);
  };

  return (
    <div className="bg-brandGrey">
      <PageHead pageTitle={product.fields.productName} />
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
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
                <Link
                  href={`/products/category/${product.fields.productType}`}
                  className="mr-2 text-sm font-light text-black"
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
                className="font-light text-gray-500 hover:text-gray-600"
              >
                {excerpt(product.fields.productName, 45)}
              </Link>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl items-stretch justify-center self-center sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-w-4 aspect-h-5 lg:aspect-w-3 lg:aspect-h-4 hidden sm:flex sm:items-center sm:overflow-hidden ">
            <img
              src={product.fields.productAssets[0].fields.file.url}
              alt={product.fields.productAssets[0].fields.title}
              className="h-full w-full object-center sm:h-auto sm:rounded-lg"
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
          <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:flex lg:items-center lg:justify-center">
            <img
              src={product.fields.productAssets[3].fields.file.url}
              alt={product.fields.productAssets[3].fields.title}
              className="h-full w-full object-center sm:h-auto sm:rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-3 p-3 sm:hidden">
            <div className="w-full overflow-hidden rounded-md">
              <img
                className="h-[60vh] w-full object-contain object-center"
                src={product.fields.productAssets[index].fields.file.url}
              />
            </div>

            <div className="flex w-full flex-row gap-3 rounded-3xl bg-white">
              {product.fields.productAssets.map((item, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => setIndex(i)}
                    className="basis-1/4 cursor-pointer overflow-hidden rounded-xl border px-3 py-3 duration-200 active:scale-90 active:opacity-75"
                  >
                    <img
                      className="w-full object-contain object-center"
                      src={product.fields.productAssets[i].fields.file.url}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-24 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="break-words text-4xl text-gray-900">{product.fields.productName}</h1>
          </div>

          {/* Options */}
          <div className="mt-12 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <div className="mb-10 flex flex-row flex-wrap items-center justify-between gap-3">
              <p className="font-sora text-3xl font-semibold text-gray-900">
                Rs. {product.fields.productPrice}
              </p>
            </div>

            {/* //generate code for incraesing and decreasing quantity */}

            <div className="flex flex-row flex-wrap items-stretch gap-3">
              <div className="flex-1">
                <button
                  onClick={addToCart}
                  className="inline-block h-full w-full rounded-xl bg-green-600 px-3.5 text-base font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Add to cart
                </button>
              </div>
              <div className="flex flex-row items-center justify-between gap-3 rounded-xl border bg-white px-2 py-2">
                <button
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl font-sora font-semibold text-black duration-150 hover:bg-gray-100 active:scale-90 active:bg-gray-200"
                >
                  -
                </button>
                <p className="font-sora text-xl font-semibold text-gray-900">{quantity}</p>
                <button
                  onClick={() => {
                    setQuantity(quantity + 1);
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl font-sora font-semibold text-black duration-150 hover:bg-gray-100 active:scale-90 active:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="font-sora text-xs font-semibold uppercase text-gray-900">SKU ID</h3>
                <p className="mt-3 cursor-pointer select-none rounded-xl border bg-gray-50 px-3 py-4 text-center font-poppins font-semibold uppercase text-gray-900 duration-200 active:bg-slate-100">
                  {product.fields.skuId}
                </p>
              </div>
              <div className="mt-10">
                <h3 className="font-sora text-xs font-semibold uppercase text-gray-900">Color</h3>
                <p className="mt-3 cursor-pointer select-none rounded-xl border bg-gray-50 px-3 py-4 text-center font-poppins font-semibold uppercase text-gray-900 duration-200 active:bg-slate-100">
                  {product.fields.productColor}
                </p>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <h3 className="font-sora text-xs font-semibold uppercase text-gray-900">Size</h3>
                <div className="mt-3 flex flex-row flex-wrap justify-center gap-y-0 gap-x-3 rounded-xl border  bg-gray-50 p-3 font-poppins">
                  <div className="flex-1 cursor-pointer select-none rounded-xl border bg-white px-3 py-4 text-center font-poppins uppercase text-gray-900 duration-200 active:bg-slate-100">
                    <span className="text-xs">Length:</span>
                    <span className="block font-semibold text-black">
                      {`  ${product.fields.productLength}cm`}
                    </span>
                  </div>
                  <div className="flex-1 cursor-pointer select-none rounded-xl border bg-white px-3 py-4 text-center font-poppins uppercase text-gray-900 duration-200 active:bg-slate-100">
                    <span className="text-xs">Breadth:</span>
                    <span className="block font-semibold text-black">
                      {`  ${product.fields.productBreadth}cm`}
                    </span>
                  </div>
                  <div className="flex-1 cursor-pointer select-none rounded-xl border bg-white px-3 py-4 text-center font-poppins uppercase text-gray-900 duration-200 active:bg-slate-100">
                    <span className="text-xs">Height:</span>
                    <span className="block font-semibold text-black">
                      {`  ${product.fields.productHeight}cm`}
                    </span>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="font-sora text-xs font-semibold uppercase text-gray-900">Stock</h3>
                  {product.fields.productInStock ? (
                    <p className="mt-3 cursor-pointer select-none rounded-xl border bg-gray-50 px-3 py-4 text-center font-poppins font-semibold uppercase text-gray-900 duration-200 active:bg-slate-100">
                      {' '}
                      <span className="text-green-500">In Stock</span> and ready to ship
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
            <div className="mt-5">
              <h3 className="font-sora text-sm font-semibold uppercase text-gray-900">
                Highlights
              </h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 ">
                  {product.fields.productHighlight
                    ? product.fields.productHighlight.split('--').map((highlight, index) =>
                        highlight.length < 5 ? null : (
                          <li key={index}>
                            <span className="text-base leading-loose text-gray-700">
                              {highlight}
                            </span>
                          </li>
                        ),
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
  const response = await client.getEntries({ content_type: 'blog' });
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
