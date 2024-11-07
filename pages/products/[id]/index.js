import Slash from '@/assets/slash';
import Accordination from '@/components/Accordination';
import { useGlobalContextProvider } from '@/context/GlobalContext';
import { excerpt } from '@/lib/utils';
import PageHead from '@components/PageHead';
import { client } from '@lib/contentful';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import Markdown from 'react-markdown';
import safeJsonStringify from 'safe-json-stringify';

const index = ({ data }) => {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);

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

  // format price in Indian format -> 2,34,345.00
  const formatPrice = (price) => {
    return price.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  console.log(product);

  return (
    <div className="relative top-0 mx-auto max-w-fit duration-500">
      <div className="relative flex flex-row flex-wrap items-start justify-center">
        <div className="basis-full p-0 sm:basis-1/2 sm:p-4">
          <div className="flex flex-col items-center justify-center gap-5 rounded-xl py-10 px-10">
            {product.fields.productAssets.map((el, i) => {
              return (
                <div className="h-auto w-full min-w-full max-w-[500px] sm:h-[500px] sm:min-w-[350px]">
                  <img
                    key={i}
                    src={el.fields.file.url.replace('//', 'https://')}
                    alt=""
                    className="h-full w-full rounded-xl object-cover object-center"
                  />
                </div>
              );
            })}
          </div>
          <div className="w-full pl-4 pr-4 sm:pr-0 sm:pl-10">
            {/* <div className="flex w-auto flex-col items-start justify-start gap-3">
              <Markdown
                components={{
                  p: ({ node, ...props }) => {
                    return (
                      <p
                        {...props}
                        className="break-all font-sora text-base text-gray-900 sm:text-lg"
                      ></p>
                    );
                  },
                  h1: ({ node, ...props }) => {
                    return (
                      <h1
                        {...props}
                        className="text-lg font-semibold text-gray-900 sm:text-2xl"
                      ></h1>
                    );
                  },
                  h2: ({ node, ...props }) => {
                    return (
                      <h2
                        {...props}
                        className="text-lg font-semibold text-gray-900 sm:text-2xl"
                      ></h2>
                    );
                  },
                  ul: ({ node, ...props }) => {
                    return (
                      <ul
                        {...props}
                        className="list-inside list-disc font-sora text-base text-gray-900"
                      ></ul>
                    );
                  },
                  li: ({ node, ...props }) => {
                    return (
                      <li
                        {...props}
                        className="list-inside list-disc font-sora text-base text-gray-900 sm:text-sm"
                      ></li>
                    );
                  },
                }}
              >
                {product.fields.productHighlight}
              </Markdown>
            </div> */}
            <Accordination
              title="highlights"
              content={product.fields.productHighlight.split('--')}
              open={true}
            />
          </div>
        </div>
        <div className="relative top-0 basis-full p-0 duration-300 sm:sticky sm:basis-1/2 sm:p-4">
          <div className="flex flex-col items-start justify-start gap-7 rounded-xl py-6 px-4 sm:pr-10">
            <div>
              <h1
                alt={product.fields.productName}
                className="mb-7 break-words font-sora text-2xl font-semibold text-gray-900 sm:text-4xl"
              >
                {product.fields.productName.length > 100
                  ? product.fields.productName.substring(0, 100) + '...'
                  : product.fields.productName}
              </h1>
              <p className="font-sora text-xl text-green-600 sm:text-3xl">
                Rs. {formatPrice(product.fields.productPrice)}
              </p>
            </div>
            <div className="flex basis-full flex-row flex-wrap items-center justify-start gap-3 rounded-xl bg-gray-50 p-2">
              <div className="grow rounded-xl bg-gray-100 p-3">
                <h1 className="mb-1 text-sm font-semibold">Availability: </h1>
                <h3 className="rounded-xl bg-white px-3 py-1.5 font-sora text-sm capitalize text-green-600 sm:px-5 sm:py-2.5 sm:text-base">
                  {product.fields.productInStock ? 'In Stock' : 'Out of Stock'}
                </h3>
              </div>
              <div className="grow rounded-xl bg-gray-100 p-3">
                <h1 className="mb-1 text-sm font-semibold">Sku ID: </h1>
                <h3 className="rounded-xl bg-white px-3 py-1.5 font-sora text-sm capitalize text-green-600 sm:px-5 sm:py-2.5 sm:text-base">
                  {product.fields.skuId}
                </h3>
              </div>
              <div className="grow rounded-xl bg-gray-100 p-3">
                <h1 className="mb-1 text-sm font-semibold">Colour: </h1>
                <h3 className="rounded-xl bg-white px-3 py-1.5 font-sora text-sm capitalize text-green-600 sm:px-5 sm:py-2.5 sm:text-base">
                  {product.fields.productColor}
                </h3>
              </div>
            </div>

            <div className="flex w-full flex-row flex-wrap items-center justify-start gap-3">
              <button
                onClick={addToCart}
                className="hover:bg-gray-900-500 inline-block w-full basis-full rounded-xl bg-black px-3.5 py-4 font-poppins text-base font-medium text-white shadow-sm ring-offset-2 duration-150 hover:bg-black/80 focus:ring-2 active:scale-95 active:ring-2 sm:basis-7/12"
              >
                Add to cart
              </button>
              <div className="flex basis-full flex-row items-center justify-between gap-3 rounded-xl p-2 sm:basis-3/12">
                <button
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 font-sora font-semibold text-black duration-150 hover:bg-gray-200 active:scale-90 active:bg-gray-300"
                >
                  -
                </button>
                <p className="font-sora text-xl font-semibold text-gray-900">{quantity}</p>
                <button
                  onClick={() => {
                    setQuantity(quantity + 1);
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 font-sora font-semibold text-black duration-150 hover:bg-gray-200 active:scale-90 active:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>
            <div className="mt-1.5">
              <h1 className="mb-3 text-sm font-semibold">Shipping And returns: </h1>
              <h3 className="font-sora text-sm leading-loose text-gray-900">
                4-5 standard delivery on all orders. For any queries, please contact Customer
                Service at{' '}
                <Link
                  href="mailto:enquiries.behideindia@gmail.com"
                  className="rounded-3xl bg-black px-2 py-1.5 text-white"
                >
                  enquiries.behideindia@gmail.com
                </Link>
                . .
              </h3>
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
