import { motion } from 'framer-motion';
import React from 'react';

const AnimateHeading = ({ text, staggerAnimate = 0.06, once = true }) => {
  const textArray = text.split('');
  const container = {
    initial: {},
    animate: {
      transition: {
        duration: 0.5,
        delayChildren: staggerAnimate * textArray.length,
        staggerChildren: staggerAnimate,
        staggerDirection: 1,
      },
    },
  };
  const letter = {
    initial: {
      opacity: 0,
      x: '-50%',
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        ease: [0.6, 0.01, 0.05, 0.9],
      },
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="initial"
      whileInView="animate"
      variants={container}
      viewport={{ once: once }}
      className="align-top"
    >
      {textArray.map((char, index) => {
        return (
          <motion.span key={index} variants={letter} className="inline-block">
            <span className="z-10">{char === ' ' ? '\u00A0' : char}</span>
          </motion.span>
        );
      })}
      {/* <div className="absolute inset-0 flex items-center justify-center">
        {textArray.map((char, index) => {
          return (
            <motion.span key={index} variants={letterHidden} className="inline-block">
              <span className="relative">
                <span className="relative z-10">{char === ' ' ? '\u00A0' : char}</span>
              </span>
            </motion.span>
          );
        })}
      </div> */}
    </motion.div>
  );
};

export default AnimateHeading;
