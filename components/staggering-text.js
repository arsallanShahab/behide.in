import { motion } from 'framer-motion';
import React from 'react';

const StaggeringText = ({ text, staggerInitial = 0.008, staggerHover = 0.01, isHover = true }) => {
  const container = {
    initial: {
      transition: {
        duration: 0.5,
        staggerChildren: staggerInitial,
        staggerDirection: -1,
      },
    },
    hover: {
      transition: {
        duration: 0.5,
        staggerChildren: staggerHover,
        staggerDirection: 1,
      },
    },
  };

  const letter = {
    initial: {
      y: '0%',
    },
    hover: {
      y: '100%',
      transition: {
        ease: [0.6, 0.01, -0.05, 0.9],
      },
    },
  };
  const letterHidden = {
    initial: {
      y: '-100%',
    },
    hover: {
      y: '0%',
      transition: {
        ease: [0.6, 0.01, -0.05, 0.9],
      },
    },
  };
  const textArray = text.split('');

  return (
    <motion.div
      initial="initial"
      animate="initial"
      whileHover={isHover ? 'hover' : 'initial'}
      whileTap="initial"
      onHoverEnd={(event) => {
        // event.stopPropagation();
        // controls.start('e');
        // .then(() => controls.set('animate', 'initial'));
      }}
      //   onHoverEnd={(event, info) => {
      //     // Reset to initial state when hover ends
      //     info?.offset?.x === 0 &&
      //       info?.velocity?.x === 0 &&
      //       info?.point?.x === 0 &&
      //       info?.point?.y === 0 &&
      //       info?.delta?.x === 0 &&
      //       info?.delta?.y === 0 &&
      //       setAnimationState('initial');
      //   }}
      variants={container}
      className="relative inline-block overflow-hidden p-0.5 align-top"
    >
      {textArray.map((char, index) => {
        return (
          <motion.span key={index} variants={letter} className="inline-block">
            <span className="relative">{char === ' ' ? '\u00A0' : char}</span>
          </motion.span>
        );
      })}
      <div className="absolute inset-0 flex items-center justify-center">
        {textArray.map((char, index) => {
          return (
            <motion.span key={index} variants={letterHidden} className="inline-block">
              <span className="relative">{char === ' ' ? '\u00A0' : char}</span>
            </motion.span>
          );
        })}
      </div>
    </motion.div>
  );
};

export default StaggeringText;
