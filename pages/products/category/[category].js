import Link from "next/link";
import { useRouter } from "next/router";
import PageHead from "../../../components/PageHead";
import { client } from "../../../lib/contentful";

const index = ({ data }) => {
  // console.log(data);
  const router = useRouter();
  const { category } = router.query;
  return (
    <>
      <PageHead pageTitle={category} />
      <div className="bg-brandGrey">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="pb-10 font-sora text-3xl font-bold capitalize text-brandBlack sm:text-5xl">
            {category}
          </h2>

          <div className="grid grid-cols-1 items-start gap-y-10 gap-x-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {data
              ? data.products.items.map((product, index) => (
                  <Link
                    key={index}
                    href={`/products/${product.sys.id}`}
                    className="box-shadow active:box-shadow-hover hover:box-shadow-hover group inline-block rounded-md border duration-300 hover:-translate-y-4 hover:bg-white active:-translate-y-4 active:bg-white"
                  >
                    <div className=" w-full overflow-hidden border-b p-3">
                      <img
                        src={product.fields.productBannerImage.fields.file.url}
                        alt={product.fields.productBannerImage.fields.title}
                        className="h-auto w-full rounded-lg object-center group-hover:opacity-75"
                      />
                    </div>
                    <div className="overflow-hidden font-poppins">
                      <h3 className="my-4 py-3 px-4 text-center font-poppins text-xs font-semibold leading-6 text-black">
                        {product.fields.productName}
                      </h3>
                      <div className="flex items-center justify-between border-t px-5 py-4">
                        <p className="text-sm font-semibold text-black">
                          ₹{product.fields.productPrice}
                        </p>
                        {product.fields.productInStock ? (
                          <p className="text-sm font-semibold text-green-600">
                            In Stock
                          </p>
                        ) : (
                          <p className="text-sm font-semibold text-rose-600">
                            Out of Stock
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async (ctx) => {
  //   const { name, category, id } = ctx.query;
  const { category } = ctx.params;
  const response = await client.getEntries({
    content_type: "blog",
    "fields.productType": category,
  });
  // console.log(response);

  return {
    props: {
      data: { products: response },
    },
  };
};

export const getStaticPaths = async () => {
  const response = await client.getEntries({ content_type: "blog" });
  const entries = response.items;
  const categories = entries.map((item, index) => item.fields.productType);
  const paths = categories.map((item) => ({
    params: {
      category: item.toString(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export default index;
