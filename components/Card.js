import { excerpt } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import ChevronRightButton from './arrow-right-btn';

const item = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, 0.01, 0.05, 0.9],
    },
  },
};

const Card = ({ product, index }) => {
  return (
    <motion.div key={index} variants={item} className="basis-full sm:basis-[275px]">
      <Link
        key={index}
        href={`/products/${product.sys.id}`}
        className="box-shadow active:box-shadow-hover hover:box-shadow-hover group inline-block rounded-xl bg-gray-50 duration-300 hover:-translate-y-4 hover:bg-white active:-translate-y-4 active:bg-white"
      >
        <div className="w-full overflow-hidden p-3">
          <img
            src={product.fields.productBannerImage.fields.file.url}
            alt={product.fields.productBannerImage.fields.title}
            className="h-auto w-full rounded-xl object-center group-hover:opacity-75"
          />
        </div>
        <div className="overflow-hidden">
          <h3 className="mt-2 px-6 text-left text-xs font-semibold leading-5 text-black">
            {excerpt(product.fields.productName, 100)}
          </h3>
          <div className="flex items-center justify-between px-6 py-4">
            <p className="text-sm font-semibold text-green-600">₹{product.fields.productPrice}</p>
            <ChevronRightButton label="view product" small={true} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;
