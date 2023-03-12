import { CornerUpLeft, CreditCard, Headphones, Truck } from '@/assets';

const Category = () => {
  return (
    <div className="w-full bg-green-500 py-20 px-10">
      <div className="container mx-auto flex flex-row flex-wrap items-center justify-center gap-9">
        <div className="flex flex-col items-center justify-center p-5">
          <div className="rounded-full bg-white p-5">
            <Headphones className="stroke-green-500" />
          </div>
          <h3 className="mt-5 font-sora text-2xl font-semibold"> Customer Support </h3>
          <p className="mt-2 text-center text-sm font-bold text-white">We are here to help you</p>
        </div>
        <div className="flex flex-col items-center justify-center p-5">
          <div className="rounded-full bg-white p-5">
            <CreditCard className="stroke-green-500" />
          </div>
          <h3 className="mt-5 font-sora text-2xl font-semibold">Secured Payment</h3>
          <p className="mt-2 text-center text-sm font-bold text-white">We ensure secure payment</p>
        </div>
        <div className="flex flex-col items-center justify-center p-5">
          <div className="rounded-full bg-white p-5">
            <CornerUpLeft className="stroke-green-500" />
          </div>
          <h3 className="mt-5 font-sora text-2xl font-semibold">Easy Returns</h3>
          <p className="mt-2 text-center text-sm font-bold text-white">Return or exchange items</p>
        </div>
        <div className="flex flex-col items-center justify-center p-5">
          <div className="rounded-full bg-white p-5">
            <Truck className="stroke-green-500" />
          </div>
          <h3 className="mt-5 font-sora text-2xl font-semibold">Free Shipping</h3>
          <p className="mt-2 text-center text-sm font-bold text-white">on all orders over $100</p>
        </div>
      </div>
    </div>
  );
};

export default Category;
