import { useGlobalContextProvider } from '@/context/GlobalContext';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const cashOnDelivery = () => {
  const { setShowCart, totalPrice, user, totalQuantity, cartItems } = useGlobalContextProvider();
  const [form, setForm] = useState({
    contact_information: {
      name: '',
      email: '',
      phone: '',
    },
    address_information: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      country: 'India',
      pincode: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (totalQuantity === 0) {
      router.push('/');
    }
    if (totalPrice === 0) {
      router.push('/');
    }
    if (cartItems.length === 0) {
      router.push('/');
    }
  }, [totalQuantity, totalPrice, cartItems]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(() => true);

    const { contact_information, address_information } = form;
    const data = {
      contact_information,
      address_information,
      user_id: user._id,
      order_items: cartItems,
      payment_method: 'cash-on-delivery',
      total_price: totalPrice,
      total_quantity: totalQuantity,
      shipping_charges: deliveryCharges,
    };
    fetch('/api/checkout/cash-on-delivery', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(() => false);
        const { success, message } = data;
        if (success) {
          toast.success(message);
          router.push({
            pathname: '/checkout/success',
            query: {
              name: contact_information.name,
              email: contact_information.email,
              phone: contact_information.phone,
              line1: address_information.line1,
              line2: address_information.line2,
              city: address_information.city,
              state: address_information.state,
              country: address_information.country,
              pincode: address_information.pincode,
              totalPrice,
              totalQuantity,
              order_items: JSON.stringify(cartItems),
            },
          });
        } else {
          toast.error(message);
        }
      });
  };

  useEffect(() => {
    if (user) {
      setForm((prev) => {
        return {
          ...prev,
          contact_information: {
            name: user.name,
            email: user.email,
          },
        };
      });
    }
  }, [user]);

  const deliveryCharges = 300;
  useEffect(() => {
    setShowCart(() => false);
    setTimeout(() => {
      toast.dismiss();
    }, 300);

    const token = localStorage.getItem('token');
    if (
      !token ||
      token === 'undefined' ||
      token === 'null' ||
      token === '' ||
      user === null ||
      user === undefined
    ) {
      router.push('/user/login');
      toast.error('Please login to continue');
    }
  }, []);
  return (
    <div className="h-full w-full px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col flex-wrap items-start justify-center md:flex-row">
          <div className="md:flex-0 flex flex-1 flex-col items-start px-7 pt-12 pb-24 md:w-1/2">
            <h3 className="font-medium text-gray-500">Pay</h3>
            <h1 className="mt-3 text-4xl font-medium text-black/75">₹{totalPrice}.00</h1>
            <div className="px-3 py-6">
              {cartItems.map((item, i) => {
                return (
                  <div key={i} className="mt-4 flex w-full items-center justify-between">
                    <div className="flex flex-row items-center">
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="h-12 w-12 object-cover"
                      />
                      <div className="ml-4 flex flex-col items-start justify-between">
                        <div className="flex flex-row items-start justify-between">
                          <h3 className="text-sm font-medium text-black/75">{item.name}</h3>
                          <h3 className="ml-2 text-sm font-medium text-black/75">
                            ₹{item.price * item.quantity}
                          </h3>
                        </div>
                        <div className="flex w-full flex-row items-center justify-between">
                          <h3 className="mt-2 rounded-md bg-gray-50 p-2 text-xs font-semibold text-black/75">
                            Qty {item.quantity}
                          </h3>
                          <h3 className=" py-2 text-xs  text-gray-400">Each ₹{item.price}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-full px-3 py-6">
              <div className="ml-16 flex flex-row items-center justify-between border-b py-6">
                <h3 className="text-sm font-medium text-black/75">Subtotal</h3>
                <h3 className="text-sm font-medium text-black/75">₹{totalPrice}.00</h3>
              </div>
              <div className="ml-16 flex flex-row items-center justify-between border-b py-6">
                <h3 className="text-sm font-medium text-black/75">Delivery Charges</h3>
                <h3 className="text-sm font-medium text-black/75">₹{deliveryCharges}.00</h3>
              </div>
              <div className="ml-16 flex flex-row items-center justify-between py-6">
                <h3 className="text-sm font-bold text-black/75">Total</h3>
                <h3 className="font-bold text-black/75">₹{totalPrice + deliveryCharges}.00</h3>
              </div>
            </div>
          </div>
          <div className="cs-inset md:flex-0 mx-auto h-full flex-1 px-7 pt-12 pb-24 md:w-1/2 md:pl-16 md:pr-6">
            <div className=" flex max-w-full flex-col items-start justify-start md:max-w-sm">
              <h3 className="text-2xl font-bold text-black/75">Pay with C.O.D</h3>
              <form className="mt-8 w-full" onSubmit={handleSubmit}>
                <div className="mt-6 flex w-full flex-col items-center justify-center">
                  <div className="w-full">
                    <p className="mb-3 text-sm font-semibold text-gray-500">Contact Information</p>
                    <div>
                      <div className="w-full">
                        <label className="sr-only">Name</label>
                        <input
                          id="name"
                          name="name"
                          type="name"
                          autoComplete="name"
                          required
                          value={form.contact_information.name}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              contact_information: {
                                ...form.contact_information,
                                name: e.target.value,
                              },
                            })
                          }
                          className="relative block w-full appearance-none rounded-none rounded-t-xl border border-b-0 border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                          placeholder="name"
                        />
                      </div>
                      <div>
                        <label className="sr-only">Phone Number</label>
                        <input
                          id="phone-number"
                          name="phone-number"
                          type="tel"
                          autoComplete=""
                          required
                          pattern="[+]{1}[0-9]{11,14}"
                          value={form.contact_information.phone}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              contact_information: {
                                ...form.contact_information,
                                phone: e.target.value,
                              },
                            })
                          }
                          className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                          placeholder="+91 phone number"
                        />
                      </div>
                      <div>
                        <label className="sr-only">Email address</label>
                        <input
                          id="email-address"
                          name="email-address"
                          type="email"
                          autoComplete="email"
                          required
                          value={form.contact_information.email}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              contact_information: {
                                ...form.contact_information,
                                email: e.target.value,
                              },
                            })
                          }
                          className="relative block w-full appearance-none rounded-none rounded-b-xl border border-t-0 border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                          placeholder="Email address"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-7 w-full">
                    <p className="mb-3 text-sm font-semibold text-gray-500">Billing Address</p>
                    <div>
                      <div className="w-full">
                        <label className="sr-only">India</label>
                        <input
                          id="country"
                          name="country"
                          type="text"
                          autoComplete="none"
                          required
                          disabled
                          value={form.address_information.country}
                          className="relative block w-full appearance-none rounded-none rounded-t-xl border border-b-0 border-gray-300 bg-neutral-100 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                          placeholder="Country"
                        />
                      </div>
                      <div>
                        <label className="sr-only">Address Line 1</label>
                        <input
                          id="address-line-1"
                          name="address-line-1"
                          type="text"
                          autoComplete="address"
                          required
                          value={form.address_information.line1}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              address_information: {
                                ...form.address_information,
                                line1: e.target.value,
                              },
                            })
                          }
                          className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                          placeholder="Address Line 1"
                        />
                      </div>
                      <div>
                        <label className="sr-only">Address Line 2 (optional)</label>
                        <input
                          id="address-line-2"
                          name="address-line-2"
                          type="text"
                          autoComplete="address"
                          value={form.address_information.line2}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              address_information: {
                                ...form.address_information,
                                line2: e.target.value,
                              },
                            })
                          }
                          className="relative block w-full appearance-none rounded-none border border-t-0 border-b-0 border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                          placeholder="Address Line 2 (optional)"
                        />
                      </div>
                      <div className="flex flex-row">
                        <div className="flex-1">
                          <label className="sr-only">City</label>
                          <input
                            id="city"
                            name="city"
                            type="text"
                            autoComplete="address-level2"
                            required
                            value={form.address_information.city}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                address_information: {
                                  ...form.address_information,
                                  city: e.target.value,
                                },
                              })
                            }
                            className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                            placeholder="City"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="sr-only">Pincode</label>
                          <input
                            id="pincode"
                            name="pincode"
                            type="number"
                            autoComplete="postal-code"
                            required
                            value={form.address_information.pincode}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                address_information: {
                                  ...form.address_information,
                                  pincode: e.target.value,
                                },
                              })
                            }
                            className="relative block w-full appearance-none rounded-none border border-l-0 border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                            placeholder="Pincode"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="sr-only">State</label>
                        <input
                          id="state"
                          name="state"
                          type="text"
                          autoComplete="address-level1"
                          required
                          value={form.address_information.state}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              address_information: {
                                ...form.address_information,
                                state: e.target.value,
                              },
                            })
                          }
                          className="relative block w-full appearance-none rounded-none rounded-b-xl border border-t-0 border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                          placeholder="State"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 w-full">
                    <button
                      type="submit"
                      className="block w-full rounded-lg bg-blue-500 py-3 px-6 text-center font-semibold text-blue-50"
                    >
                      {loading ? <Spinner /> : 'Place Order'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Spinner = (props) => (
  <svg
    className="-ml-1 mr-3 inline-block h-5 w-5 animate-spin stroke-white text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke-width="4"></circle>
    <path className="fill-white opacity-75">
      <animate
        attributeName="d"
        dur="1.5s"
        repeatCount="indefinite"
        values="M12 6v6m0 0v6m0-6h6m-6 0H6;M12 6v6m0 0v6m0-6h6m-6 0H6;M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </path>
  </svg>
);

export default cashOnDelivery;
