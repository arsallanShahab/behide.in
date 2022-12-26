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
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-4xl font-bold pb-10 capitalize">{category}</h2>

          <div className="grid grid-cols-1 gap-y-10 gap-x-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {data
              ? data.products.items.map((product, index) => (
                  <Link
                    key={index}
                    href={`/products/${product.sys.id}`}
                    className="group"
                  >
                    <div className=" w-full overflow-hidden rounded-lg bg-gray-200 p-6 ">
                      <img
                        src={product.fields.productBannerImage.fields.file.url}
                        alt={product.fields.productBannerImage.fields.title}
                        className="h-full w-full object-cover object-center group-hover:opacity-75 rounded-lg"
                      />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">
                      {product.fields.productName}
                    </h3>
                    <div className="flex justify-between items-center">
                      <p className="mt-1 text-lg text-gray-900 font-semibold">
                        Rs. {product.fields.productPrice}
                      </p>
                      {product.fields.productInStock ? (
                        <p className="mt-1 text-sm text-green-600 font-semibold">
                          In Stock
                        </p>
                      ) : (
                        <p className="mt-1 text-sm text-rose-600 font-semibold">
                          Out of Stock
                        </p>
                      )}
                    </div>
                  </Link>
                ))
              : null}
          </div>
          <div>
            {data.length == 0 ? (
              <p className="mt-6 text-3xl text-gray-400">
                currently we don't have any products
              </p>
            ) : null}
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
  console.log(response);

  return {
    props: {
      data: { products: !!response ? response : [""] },
    },
  };
};

export const getStaticPaths = async () => {
  const response = await client.getEntries();
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
