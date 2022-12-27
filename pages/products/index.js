import Link from "next/link";
import { useRouter } from "next/router";
import safeJsonStringify from "safe-json-stringify";
import PageHead from "../../components/PageHead";
import { client } from "../../lib/contentful";

function index({ data }) {
  console.log(data);
  const router = useRouter();
  const path = router.pathname.replace("/", "");

  return (
    <>
      <PageHead pageTitle={path} />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="font-poppins text-4xl font-bold pb-10">Products</h2>

          <div className="grid grid-cols-1 gap-y-10 gap-x-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {data
              ? data.map((product, index) => (
                  <Link
                    key={index}
                    href={`/products/${product.sys.id}`}
                    className="group"
                  >
                    <div className=" w-full overflow-hidden border border-b-0 rounded-md rounded-b-none p-3 ">
                      <img
                        src={product.fields.productBannerImage.fields.file.url}
                        alt={product.fields.productBannerImage.fields.title}
                        className="h-auto w-full object-center group-hover:opacity-75 rounded-lg"
                      />
                    </div>
                    <div className="overflow-hidden border rounded-b-md">
                      <h3 className="font-poppins font-semibold text-center leading-relaxed my-4 py-3 px-2 text-xs text-black">
                        {product.fields.productName}
                      </h3>
                      <div className="flex justify-between items-center px-8 py-3 my-1 border-t">
                        <p className="text-sm text-gray-900 font-semibold">
                          Rs. {product.fields.productPrice}
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
}

export const getStaticProps = async (ctx) => {
  const response = await client.getEntries({ content_type: "blog" });
  const entries = response.items;
  // const fields = entries.map((item) => item.fields);
  // const fields = safeJsonStringify(entries.map((item) => item.fields));
  const fields = safeJsonStringify(entries);
  const data = JSON.parse(fields);

  return {
    props: {
      data: data,
    },
  };
};

export default index;
