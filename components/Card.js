import { excerpt } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import ChevronRightButton from './arrow-right-btn';

const Card = ({ product, index, lg }, props) => {
  return (
    <motion.div
      layout={'position'}
      key={index}
      className={twMerge('basis-full sm:basis-[275px]', lg && 'lg:basis-[300px]')}
      {...props}
    >
      <a
        key={index}
        href={`/products/${product.sys.id}`}
        className="box-shadow active:box-shadow-hover hover:box-shadow-hover group inline-block rounded-xl bg-gray-50 duration-300 hover:-translate-y-4 hover:bg-white active:-translate-y-4 active:bg-white"
      >
        <div className="w-full overflow-hidden p-3">
          <Image
            width={275}
            height={275}
            src={product.fields.productBannerImage.fields.file.url}
            alt={product.fields.productBannerImage.fields.title}
            className="h-auto w-full rounded-xl object-cover object-center duration-100 group-hover:opacity-75"
          />
        </div>
        <div className="overflow-hidden">
          <h3 className="mt-2 px-6 text-left text-xs font-semibold leading-5 text-black">
            {excerpt(product.fields.productName, 100)}
          </h3>
          <div className="flex items-center justify-between px-6 pb-4 pt-2">
            <p className="text-sm font-semibold text-green-600">₹{product.fields.productPrice}</p>
            <ChevronRightButton label="view product" small={true} />
          </div>
        </div>
      </a>
    </motion.div>
  );
};

export default Card;
