import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

const ScrollTextSlide = ({
  className,
  AnimateXStart = '-100%',
  AnimateXEnd = '0%',
  AnimateYStart = 0,
  AnimateYEnd = 0,
  AnimateOpacityStart = 1,
  AnimateOpacityEnd = 0,
  AnimateScaleStart = 1,
  AnimateScaleEnd = 1,
  duration = 0.1,
  children = 'text',
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll(ref);
  const x = useTransform(scrollYProgress, [0, 1], [AnimateXStart, AnimateXEnd]);
  const y = useTransform(scrollYProgress, [0, 1], [AnimateYStart, AnimateYEnd]);
  const opacity = useTransform(scrollYProgress, [0, 1], [AnimateOpacityStart, AnimateOpacityEnd]);
  const scale = useTransform(scrollYProgress, [0, 1], [AnimateScaleStart, AnimateScaleEnd]);
  const text_array = children.split('');
  return (
    <motion.div ref={ref} className="relative w-full overflow-hidden align-middle">
      <div className="relative">
        <h2>
          {text_array.map((char, index) => {
            return (
              <span key={index} className="inline-block text-gray-100">
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </h2>
        <div className="absolute inset-0">
          <motion.h2
            style={{
              x: x,
            }}
          >
            {text_array.map((char, index) => {
              return (
                <motion.span key={index} className="inline-block text-red-600 duration-75">
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              );
            })}
          </motion.h2>
        </div>
      </div>
    </motion.div>
  );
};

export default ScrollTextSlide;
