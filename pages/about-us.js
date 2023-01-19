import { useRouter } from "next/router";
import PageHead from "../components/PageHead";

const index = () => {
  const router = useRouter();
  const path = router.pathname.replace("/", "");
  return (
    <>
      <PageHead pageTitle={path} />
      <div className="w-full">
        <div className="relative z-10 bg-brandGrey px-6 pt-32 pb-12 sm:px-16 sm:py-24">
          <h1 className="relative z-10 max-w-3xl text-center indent-0 font-poppins text-[40px] font-bold capitalize leading-none tracking-normal text-brandBlack sm:text-left sm:-indent-8 sm:text-7xl sm:leading-[.8] sm:tracking-tight">
            <span className="text-brandYellow">"</span>Sleek and Professional:
            Elevate Your Laptop Game with Our Premium Leather Bags
          </h1>
          <p className="max-w-2xl px-6 py-6 text-center font-poppins text-base font-semibold text-gray-500 sm:px-0 sm:text-left sm:text-xl">
            we at behide handcraft every details you like about it, the small
            pockets to the handle and to the finishing of the bag
          </p>
        </div>
      </div>
    </>
  );
};

export default index;
