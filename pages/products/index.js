import ChevronRight from '@/assets/chevron-right';
import Card from '@/components/Card';
import ChevronRightButton from '@/components/arrow-right-btn';
import { excerpt } from '@/lib/utils';
import PageHead from '@components/PageHead';
import { client } from '@lib/contentful';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import safeJsonStringify from 'safe-json-stringify';

const container = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      ease: [0.6, 0.01, 0.05, 0.9],
    },
  },
};

function index({ data }) {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const { query } = router.query;
  const path = router.pathname.replace('/', '');
  const Data = [...data, ...data, ...data];
  useEffect(() => {
    if (Data) {
      setShow(true);
      console.log(show);
    }
  }, [show]);
  return (
    <>
      <PageHead pageTitle={path} />
      {/* <div className="px-12 pb-5 pt-14">
        <h1 className="font-sora text-5xl font-bold text-black">Products</h1>
      </div> */}

      <div>
        <div className="mx-auto max-w-2xl py-16 px-10 sm:px-6 lg:max-w-7xl lg:px-8">
          <motion.div
            initial={
              {
                // y: 100,
              }
            }
            whileInView={{
              transition: {
                staggerChildren: 0.1,
                ease: [0.6, 0.01, 0.05, 0.9],
              },
            }}
            // variants={container}
            className="relative flex flex-row flex-wrap justify-center gap-y-10 gap-x-10 xl:gap-x-8"
          >
            {/* <div className="relative grid grid-cols-1 items-start gap-y-10 gap-x-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"> */}
            {Data.map((product, index) => (
              <Card product={product} index={index} key={index} />
            ))}
          </motion.div>

          {data.length == 0 ? (
            <p className="mt-6 text-3xl text-gray-400">currently we don't have any products</p>
          ) : null}
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async (ctx) => {
  const response = await client.getEntries({ content_type: 'blog' });
  const entries = response.items;
  const fields = safeJsonStringify(entries);
  const data = JSON.parse(fields);

  return {
    props: {
      data: data,
    },
  };
};

export default index;
