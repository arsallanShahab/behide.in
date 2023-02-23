import { useRouter } from "next/router";
import PageHead from "../components/PageHead";

const index = () => {
  const router = useRouter();
  const path = router.pathname.replace("/", "");
  return (
    <>
      <PageHead pageTitle={path} />
      <div className="mx-auto max-w-2xl py-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="pb-10 font-sora text-3xl font-bold capitalize text-brandBlack sm:text-5xl">
          bulk - corporate
        </h2>
      </div>
    </>
  );
};

export default index;
