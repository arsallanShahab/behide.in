import { cn } from '@/lib/utils';
import React from 'react';

const Heading = ({ children, className }) => {
  return (
    <h2
      className={cn(
        'mb-16 max-w-full text-left font-sora text-6xl leading-[1] text-gray-900 md:max-w-lg',
        className,
      )}
    >
      {children}
    </h2>
  );
};

export default Heading;
