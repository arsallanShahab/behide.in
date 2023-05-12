import FilteredProducts from '@/components/FilteredProducts';
import ListboxList from '@/components/Listbox';
import PageHead from '@components/PageHead';
import { client } from '@lib/contentful';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import safeJsonStringify from 'safe-json-stringify';

const container = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      ease: [0.6, 0.01, 0.05, 0.9],
    },
  },
};

function index({ data, category }) {
  const [selected, setSelected] = useState({
    color: {
      name: 'All',
      color: '#ffffff',
    },
    price: {
      name: 'All',
      price: 0,
    },
    categories: {
      name: 'All',
      category: '',
    },
  });
  const handleSelectColor = (x) => {
    setSelected((prev) => ({ ...prev, color: { ...x } }));
    console.log(selected);
  };
  const handleSelectPrice = (x) => {
    setSelected((prev) => ({ ...prev, price: { ...x } }));
    console.log(selected);
  };

  const handleSelectCategory = (x) => {
    setSelected((prev) => ({ ...prev, categories: { ...x } }));
    console.log(selected);
  };
  return (
    <>
      {/* <div className="px-12 pb-5 pt-14">
        <h1 className="font-sora text-5xl font-bold text-black">Products</h1>
      </div> */}

      <div className="mx-auto max-w-2xl pt-12 lg:max-w-7xl">
        <div className="relative px-8 pb-5 pt-14 sm:px-12">
          <h1 className="font-sora text-5xl text-black">Shop Products</h1>
          <div className="absolute inset-0 -left-[0.25em] -top-[0.425em] -z-[1] inline-block w-full whitespace-nowrap font-poppins text-[9em] text-gray-100 md:-left-[0.2em] md:-top-[0.5em]">
            Products
          </div>
        </div>
        <div className="sticky top-0 z-50 mx-auto flex w-full flex-wrap items-center justify-center gap-3 px-8 pb-5 pt-5 sm:px-12">
          <div className="w-full items-center gap-2 rounded-xl bg-gray-100 p-3 sm:flex-1">
            <ListboxList label="sort by color" data={colors} isColor onSelect={handleSelectColor} />
          </div>
          <div className="w-full items-center gap-2 rounded-xl bg-gray-100 p-3 sm:flex-1">
            <ListboxList label="sort by price" data={prices} onSelect={handleSelectPrice} />
          </div>
          <div className="w-full items-center gap-2 rounded-xl bg-gray-100 p-3 sm:flex-1">
            <ListboxList
              label="sort by category"
              data={categories}
              onSelect={handleSelectCategory}
            />
          </div>
        </div>

        <div className="py-5 px-10 sm:px-6 lg:px-8">
          {data.length > 0 ? (
            <FilteredProducts
              data={data}
              color={selected.color.name}
              price={selected.price.price}
              category={selected.categories.name}
            />
          ) : null}

          {data.length == 0 ? (
            <p className="relative mt-6 max-w-2xl pr-10 font-sora text-3xl capitalize text-black duration-100 sm:text-4xl sm:leading-relaxed md:text-[3rem]">
              currently we don't have any products
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async (ctx) => {
  const response = await client.getEntries({ content_type: 'blog' });
  const cat = await client.getEntries({ content_type: 'blog', select: 'fields.productType' });
  const entries = response.items;
  const fields = safeJsonStringify(entries);
  const data = JSON.parse(fields);

  return {
    props: {
      data: data,
      category: cat,
    },
  };
};

const colors = [
  { name: 'All', color: '#ffffff' },
  { name: 'Black', color: '#000000' },
  { name: 'Brown', color: '#A78B00' },
  { name: 'Tan', color: '#D97706' },
  { name: 'Dark Brown', color: '#4A2000' },
  { name: 'Red', color: '#C80000' },
];
// create a list of data of price less than 1000 and greater than 1000 and less than 2000 and greater than 2000
// create a list of data of category

const prices = [
  { name: 'All', price: 0 },
  { name: 'Less than ₹1000', price: 1000 },
  { name: 'Less than ₹1500', price: 1500 },
  { name: 'Less than ₹2000', price: 2000 },
  { name: 'Less than ₹3000', price: 3000 },
  { name: 'Less than ₹4000', price: 4000 },
];

// use this data
/*    'Office Bag',
    'Backpack',
    'Briefcase',
    'Laptop Bag',
    'Messenger Bag',
    'Luggage Bag',
    'Ladies Bag',
    'Belt',
    'Wallet',
    'Sling Bag',
    'Jacket',
    */

const categories = [
  { name: 'All', category: '' },
  { name: 'Office Bag', category: 'office-bag' },
  { name: 'Backpack', category: 'backpack' },
  { name: 'Briefcase', category: 'briefcase' },
  { name: 'Laptop Bag', category: 'laptop-bag' },
  { name: 'Messenger Bag', category: 'messenger-bag' },
  { name: 'Luggage Bag', category: 'luggage-bag' },
  { name: 'Ladies Bag', category: 'ladies-bag' },
  { name: 'Belt', category: 'belt' },
  { name: 'Wallet', category: 'wallet' },
  { name: 'Sling Bag', category: 'sling-bag' },
  { name: 'Jacket', category: 'jacket' },
];

export default index;
