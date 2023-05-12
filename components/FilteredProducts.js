import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import Card from './Card';

const FilteredProducts = ({ data, color, price, category = '' }) => {
  // return the length of array
  const filteredData =
    data
      .filter((product) => {
        if (color == 'All') {
          return product;
        } else if (product.fields.productColor.toLowerCase().includes(color.toLowerCase())) {
          return product;
        }
      })
      .filter((product) => {
        if (price == 0) {
          return product;
        } else if (product.fields.productPrice <= price) {
          return product;
        }
      })
      .filter((product) => {
        if (category == 'All') {
          return product;
        } else if (product.fields.productType.toLowerCase().includes(category.toLowerCase())) {
          return product;
        }
      }) || [];

  if (filteredData.length == 0) {
    // scroll to top

    window.scrollTo({ top: 0, behavior: 'smooth' }) ||
      document.body.scrollTo({ top: 0, behavior: 'smooth' }) ||
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });

    return (
      <p className="relative mx-auto mt-6 max-w-xl pr-10 text-center font-sora text-3xl capitalize text-black duration-100 sm:text-4xl sm:leading-relaxed md:text-[2rem]">
        we can't find what you are looking for
      </p>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        layout
        className="relative flex flex-row flex-wrap justify-start gap-y-10 gap-x-10 xl:gap-x-8"
      >
        {filteredData.map((product) => (
          <Card product={product} key={product.sys.id} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default FilteredProducts;
