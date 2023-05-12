import logo from '@public/behide-logo-new.png';
import { AnimatePresence, motion } from 'framer-motion';
import imagesloaded from 'imagesloaded';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const slide = {
  initial: {
    scale: 1,
    y: '0%',
  },
  exit: {
    y: '-100%',
    transition: {
      duration: 1.4,
      type: 'spring',
      ease: [0.6, 0.01, -0.05, 0.9],
    },
  },
};

const preloader = {
  initial: {
    opacity: 1,
    scale: 1,
    y: '0%',
  },

  exit: {
    y: '-100%',
    transition: {
      //   delay: 0.0000001,
      delayChildren: 0.05,
      staggerChildren: 0.2,
      duration: 1.4,
      ease: [0.6, 0.01, -0.05, 0.9],
    },
  },
};

const Preloader = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    imagesloaded(document.querySelector('body'), function (instance) {
      console.log('all images are loaded');
      setIsLoaded(true);
    });
  }, []);
  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial="initial"
          exit="exit"
          variants={preloader}
          className="fixed inset-0 z-[1000] flex h-screen w-screen flex-1 items-center justify-center bg-green-50"
        >
          {['#f0f3bd', '#80ed99', '#57cc99', '#02c39a'].map((el, i) => {
            return (
              <motion.div
                key={i}
                variants={slide}
                className="relative h-full flex-1 bg-green-600 p-6"
                style={{
                  backgroundColor: el,
                }}
              ></motion.div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Preloader.getInitialProps = async () => {
  return {};
};

export default Preloader;
