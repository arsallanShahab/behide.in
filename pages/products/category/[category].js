import Link from "next/link";
import { useRouter } from "next/router";
import PageHead from "../../../components/PageHead";
import { client } from "../../../lib/contentful";

const index = ({ data }) => {
  console.log(data);
  const router = useRouter();
  const { category } = router.query;
  return (
    <>
      <PageHead pageTitle={category} />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="font-poppins text-3xl sm:text-4xl font-bold pb-10 capitalize">
            {category}
          </h2>

          <div className="grid grid-cols-1 gap-y-10 gap-x-10 items-start sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {data
              ? data.products.items.map((product, index) => (
                  <Link
                    key={index}
                    href={`/products/${product.sys.id}`}
                    className="group inline-block box-shadow border rounded-md active:box-shadow-hover hover:box-shadow-hover active:-translate-y-4 hover:-translate-y-4 duration-300"
                  >
                    <div className=" w-full overflow-hidden p-3 border-b">
                      <img
                        src={product.fields.productBannerImage.fields.file.url}
                        alt={product.fields.productBannerImage.fields.title}
                        className="h-auto w-full object-center group-hover:opacity-75 rounded-lg"
                      />
                    </div>
                    <div className="font-poppins overflow-hidden">
                      <h3 className="font-poppins font-semibold text-center leading-6 my-4 py-3 px-4 text-xs text-black">
                        {product.fields.productName}
                      </h3>
                      <div className="flex justify-between items-center px-5 py-4 border-t">
                        <p className="text-sm text-black font-semibold">
                          ₹{product.fields.productPrice}
                        </p>
                        {product.fields.productInStock ? (
                          <p className="text-sm text-green-600 font-semibold">
                            In Stock
                          </p>
                        ) : (
                          <p className="text-sm text-rose-600 font-semibold">
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
