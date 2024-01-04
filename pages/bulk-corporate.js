import PageHead from '@components/PageHead';
import ScrollTitle from '@components/ScrollTitle';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

const index = () => {
  const router = useRouter();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll(ref);
  // // how do transform a path like a shape
  // const x = useTransform(scrollYProgress, [0, 0.5, 0.75, 1], ['-20%', '25%', '0%', '40%']);
  // const height = useTransform(scrollYProgress, [0, 0.35, 1], ['50%', '75%', '100%']);
  // const width = useTransform(scrollYProgress, [0, 0.25, 0.5, 1], ['25%', '100%', '100%', '100%']);
  // const scale = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0.75, 1.25, 1.4, 1.5, 1]);

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });
  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, company, phone, message } = form;
    if (!firstName || !email || !company || !phone || !message) {
      toast.error('Please fill all the fields');
      return;
    }
    setLoading(true);
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    const { success, msg } = await res.json();
    if (success) {
      toast.success(msg);
      setLoading(false);
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        phone: '',
        message: '',
      });
    } else {
      setLoading(false);
      toast.error(msg);
    }
  };
  const path = router.pathname.replace('/', '');
  return (
    <>
      <PageHead pageTitle={path} />
      <div
        ref={ref}
        className="mx-auto overflow-hidden px-5 pb-16 pt-28 sm:px-6 md:max-w-screen-2xl lg:px-8"
      >
        <div className="max-w-fit px-2 pb-5 sm:px-0 sm:pb-0">
          <div className="flex items-center justify-start">
            <div className="relative w-full max-w-fit flex-1">
              <ScrollTitle
                className="relative whitespace-nowrap font-sora text-6xl capitalize text-black duration-100 sm:text-8xl md:text-[10em]"
                AnimateXEnd={-300}
              >
                Bulk {'&'}&nbsp;
                <div className="group relative isolate hidden h-[2rem] w-[48%] overflow-hidden rounded-[50em] border-none bg-black text-center font-sora text-7xl text-white outline-none sm:inline-block sm:h-[7.5rem]">
                  {/* <Image
                    src="/s-l500.jpg"
                    width={250}
                    height={250}
                    className="relative h-full w-full rounded-[50em] object-cover duration-200 group-hover:rotate-6 group-hover:scale-[1.3]"
                    alt="thumbnail"
                  /> */}
                </div>
              </ScrollTitle>
            </div>
          </div>

          <ScrollTitle
            className="font-sora text-6xl capitalize text-black duration-100 sm:text-8xl md:text-[10em]"
            AnimateXEnd={300}
          >
            Corporate
          </ScrollTitle>
        </div>

        <p className="text-brandBlack relative z-10 px-2 py-5 text-justify align-middle font-sora text-sm leading-[2] sm:py-24 sm:text-left sm:text-base md:pr-12 md:text-lg md:leading-[2.5]">
          We are accepting corporate orders and bulk orders. since you know this is an ideal gift
          you can give to your dignified customers / clients / companies, this is one of the most
          sought after gifts which the big MNCs are giving as a gift. Enjoy heavy discounts on bulk
          orders and benefit with our year-round offers. Place orders of any scale and enjoy the
          best of the Behide shopping experience. Please mail us your requirements to
          sales@behide.com with subject line 'Corporate Order' . we will get back you with the
          details or just fill in the form and tell us how much quantity you need or any product
          categories you have in mind for more of a selection that is not on our website. Our
          corporate orders team will help you get the right product at a Super price. So, get in
          touch with us today!
        </p>
        <div className="relative">
          <div className="isolate py-24 px-0 sm:py-32 lg:px-8">
            <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
              <svg
                className="relative left-1/2 -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-40rem)] sm:h-[42.375rem]"
                viewBox="0 0 1155 678"
              >
                <path
                  fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
                  fillOpacity=".3"
                  d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                />
                <defs>
                  <linearGradient
                    id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                    x1="1155.49"
                    x2="-78.208"
                    y1=".177"
                    y2="474.645"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#9089FC" />
                    <stop offset={1} stopColor="#FF80B5" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="mx-auto max-w-full px-8 text-center sm:max-w-2xl">
              <h2 className="font-sora text-3xl font-bold text-gray-900 sm:text-4xl">
                Contact sales
              </h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                We are accepting corporate orders and bulk orders.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-16 max-w-full px-2 sm:mt-20 sm:max-w-xl"
            >
              <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="firstName"
                      id="first-name"
                      value={form.firstName}
                      onChange={handleFormChange}
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="lastName"
                      id="last-name"
                      value={form.lastName}
                      onChange={handleFormChange}
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="company"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Company
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="company"
                      id="company"
                      value={form.company}
                      onChange={handleFormChange}
                      autoComplete="organization"
                      className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={form.email}
                      onChange={handleFormChange}
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone-number"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Phone number
                  </label>
                  <div className="relative mt-2.5">
                    <div className="absolute inset-y-0 left-0 flex items-center">
                      <label htmlFor="country" className="sr-only">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                      >
                        <option>IN</option>
                      </select>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      id="phone-number"
                      value={form.phone}
                      onChange={handleFormChange}
                      autoComplete="tel"
                      className="block w-full rounded-md border-0 py-2 px-3.5 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Message
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={handleFormChange}
                      className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <button
                  type="submit"
                  className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {loading ? 'Sending...' : 'Send'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
