import React from 'react';

const Heading = ({ children }) => {
  return (
    <h2 className="mb-16 max-w-full text-left font-sora text-6xl leading-[1] text-gray-900 md:max-w-lg">
      {children}
    </h2>
  );
};

export default Heading;
