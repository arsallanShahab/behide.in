import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

const ScrollTitle = ({
  text = 'text',
  className,
  AnimateXStart = 0,
  AnimateXEnd = 0,
  AnimateYStart = 0,
  AnimateYEnd = 0,
  AnimateOpacityStart = 1,
  AnimateOpacityEnd = 1,
  AnimateScaleStart = 1,
  AnimateScaleEnd = 1,
  EndThresholdOpacity = 1,
  EndThresholdX = 1,
  duration = 0.1,
  children,
}) => {
  const ref = useRef(null);
  const [windowHeight, setWindowHeight] = React.useState(0);

  React.useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);
  const { scrollYProgress } = useScroll(ref);
  const x = useTransform(scrollYProgress, [0, EndThresholdX], [AnimateXStart, AnimateXEnd]);
  const y = useTransform(scrollYProgress, [0, 1], [AnimateYStart, AnimateYEnd]);
  const opacity = useTransform(
    scrollYProgress,
    [0, EndThresholdOpacity],
    [AnimateOpacityStart, AnimateOpacityEnd],
  );
  const scale = useTransform(scrollYProgress, [0, 1], [AnimateScaleStart, AnimateScaleEnd]);
  return (
    <motion.div ref={ref}>
      <motion.h2
        className={className}
        style={{
          x,
          y,
          opacity: opacity,
          scale,
        }}
      >
        {children}
      </motion.h2>
    </motion.div>
  );
};

export default ScrollTitle;
