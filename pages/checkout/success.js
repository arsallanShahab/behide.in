import React from "react";

const success = () => {
  return (
    <div className="flex h-2/3 flex-col items-center justify-center py-36 px-8">
      <h1 className="text-4xl font-semibold">Thank you for your order</h1>
      <p className="mt-3 block text-xl font-medium">
        Your order has been placed
      </p>
    </div>
  );
};

export default success;
