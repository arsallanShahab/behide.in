import { ChevronRight } from '@/assets';
import Link from 'next/link';
import React from 'react';

const ChevronRightButton = ({
  href,
  label = 'button',
  customClass = '',
  handler = () => {},
  small,
  icon = true,
}) => {
  if (href && href?.length > 0) {
    return (
      <Link
        href={href}
        onClick={handler}
        className={`inline-block rounded-xl  px-3 py-2 text-sm font-semibold leading-6 text-black duration-100 hover:bg-gray-100 active:scale-95 active:bg-gray-200 ${customClass}`}
      >
        {label}
        {icon && <ChevronRight className="inline-block h-4 w-4 stroke-[3px]" />}
      </Link>
    );
  }

  if (small && small == true) {
    return (
      <p
        onClick={handler}
        className={`inline-block rounded-xl px-3 py-1.5 text-xs font-semibold leading-6 text-black duration-100 hover:bg-gray-100 active:scale-95 active:bg-gray-200`}
      >
        {label}
        <ChevronRight className="inline-block h-4 w-4 stroke-[2.5px]" />
      </p>
    );
  }

  return (
    <p
      onClick={handler}
      className={`inline-block cursor-pointer  rounded-xl px-3 py-2 text-sm font-semibold leading-6 text-black duration-100 hover:bg-gray-100 active:scale-95 active:bg-gray-200`}
    >
      {label}
      {/* → */}
      <ChevronRight className="inline-block h-4 w-4 stroke-[3px]" />
    </p>
  );
};

export default ChevronRightButton;
