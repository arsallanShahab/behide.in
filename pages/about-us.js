import { useRouter } from "next/router";
import PageHead from "../components/PageHead";

const index = () => {
  const router = useRouter();
  const path = router.pathname.replace("/", "");
  return (
    <>
      <PageHead pageTitle={path} />
      <div>About</div>
    </>
  );
};

export default index;
