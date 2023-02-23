import React, { useEffect, useState } from "react";

const orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const orderStoargeData = localStorage.getItem("order") || "[]";
    const parsedOrder = JSON.parse(orderStoargeData);
    console.log(parsedOrder);
    setOrders(parsedOrder);
  }, []);

  const excerpt = (str, start = 0, end = 70) => {
    return str?.length > end ? str.substring(start, end) + "..." : str;
  };

  return (
    <div>
      {orders && orders?.length > 0 ? (
        <div className="px-5 py-32 sm:px-10 ">
          <div className="row">
            <div className="col-md-12">
              <h1 className="mb-14 font-sora text-3xl font-bold capitalize text-brandBlack sm:text-5xl">
                Orders
              </h1>
              <div className="overflow-hidden rounded-xl shadow-md">
                <table className="w-full border-collapse border bg-white text-left text-xs text-gray-500 sm:text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="sm:revert hidden border px-2 py-3 font-medium text-gray-900 sm:px-6 sm:py-8">
                        Serial No.
                      </th>
                      <th className="border px-2 py-3 font-medium text-gray-900 sm:px-6 sm:py-8">
                        Product
                      </th>
                      <th className="sm:revert hidden border px-2 py-3 font-medium text-gray-900 sm:px-6 sm:py-8">
                        Order Id
                      </th>
                      <th className="sm:revert hidden border px-2 py-3 font-medium text-gray-900 sm:px-6 sm:py-8">
                        Items
                      </th>
                      <th className="border px-2 py-3 font-medium text-gray-900 sm:px-6 sm:py-8">
                        Total Quantity
                      </th>
                      <th className="border px-2 py-3 font-medium text-gray-900  sm:px-6 sm:py-8">
                        Total Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 border-t border-gray-100 text-gray-900">
                    {orders.map((order, index) => {
                      return (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="sm:revert hidden border px-6 py-4">
                            {index + 1}
                          </td>
                          <td className="border py-4 pl-6 pr-8">
                            <div className="mt-3 flex -space-x-2 overflow-hidden">
                              {order.cartItems.map((item, index) => {
                                return (
                                  <img
                                    key={index}
                                    src={`${item.thumbnail}`}
                                    className="inline-revert h-12 w-12 rounded-full shadow-md ring-2 ring-white"
                                  />
                                );
                              })}
                            </div>
                          </td>
                          <td className="sm:revert hidden max-w-xs border px-6 py-4">
                            <p className="inline-revert break-all">
                              {order.session_id}
                            </p>
                          </td>
                          <td className="sm:revert hidden border py-4 pl-8 pr-6">
                            <ul>
                              {order.cartItems.map((item, index) => {
                                return (
                                  <li className="list-disc py-2" key={index}>
                                    <p className="max-w-md break-all">
                                      {excerpt(item.name, 0, 80)}
                                    </p>
                                  </li>
                                );
                              })}
                            </ul>
                          </td>
                          <td className="border px-6 py-4">
                            {order.totalQuantity}
                          </td>
                          <td className="border px-6 py-4">
                            {order.totalPrice}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="border bg-gray-50 px-6 py-8">
                        <span className="font-poppins font-semibold text-black">
                          Total
                        </span>
                      </td>
                      <td className="sm:revert hidden border bg-gray-50 px-6 py-8"></td>
                      <td className="sm:revert hidden border bg-gray-50 px-6 py-8"></td>
                      <td className="sm:revert hidden border bg-gray-50 px-6 py-8"></td>
                      <td className="border bg-gray-50 px-6 py-8">
                        <span className="font-poppins font-semibold text-black">
                          {orders.reduce(
                            (acc, order) => acc + order.totalQuantity,
                            0
                          )}
                        </span>
                      </td>

                      <td className="border bg-gray-50 px-6 py-8">
                        <span className="font-poppins font-semibold text-black">
                          {orders.reduce(
                            (acc, order) => acc + order.totalPrice,
                            0
                          )}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container py-32 px-5 sm:px-10">
          <div className="row">
            <div className="col-md-12">
              {/* generate css for sub-heading for no orders in tailwind css  */}

              <h1 className="pb-7 font-sora text-3xl font-bold capitalize text-brandBlack sm:text-5xl">
                Orders
              </h1>
              <p className="font-poppins text-xl font-semibold">
                No orders found
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default orders;
