import React from 'react';

const cancel = () => {
  return (
    <div className="h-full py-32 px-10 text-center">
      <h1 className="mb-5 font-sora text-4xl font-bold">Your order has been cancelled!</h1>
      <p className="ml-1 font-poppins font-medium">
        If you have any questions, please contact us at
        <a href="enquiries.behideindia@gmail.com">
          <span className="ml-2 rounded-xl bg-red-50 py-1 px-3 text-sm text-red-600">
            enquiries.behideindia@gmail.com
          </span>
        </a>
      </p>
    </div>
  );
};

export default cancel;
