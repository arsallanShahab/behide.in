import { useGlobalContextProvider } from '@/context/GlobalContext';
import logo from '@public/behide-logo-new.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const signup = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    remember: false,
  });
  const { user } = useGlobalContextProvider();

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading('Signing up...');
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        password: form.password,
        remember: form.remember,
      }),
    });
    const { success, error, message } = await res.json();
    if (error) {
      toast.dismiss();
      toast.error(message);
    }
    if (success) {
      toast.dismiss();
      toast.success(message);
      router.push('/user/login');
    }
  };

  useEffect(() => {
    if (user) {
      toast.success('You are already logged in');
      router.push('/user/profile');
    }
  }, [user]);

  return (
    <>
      <div className="flex min-h-full items-center justify-center px-4 pt-16 pb-32 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Image priority={true} src={logo} alt="behide logo" className="mx-auto h-20 w-auto" />
            <h2 className="mt-6 text-center font-sora text-3xl font-semibold text-gray-900">
              Create an account
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="flex flex-col -space-y-px rounded-md shadow-sm">
              <div className="flex flex-row items-center justify-center">
                <div className="flex-1">
                  <label className="sr-only">First Name</label>
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-tl-xl border border-gray-300 px-3 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                    placeholder="Frist Name"
                    value={form.firstName}
                    onChange={(e) => {
                      setForm({ ...form, firstName: e.target.value });
                    }}
                  />
                </div>
                <div className="flex-1">
                  <label className="sr-only">Last Name</label>
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-tr-xl border border-gray-300 px-3 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={(e) => {
                      setForm({ ...form, lastName: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="sr-only">email address</label>
                <input
                  id="email-address"
                  name="email-address"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                  }}
                />
              </div>
              <div>
                <label className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-xl border border-gray-300 px-3 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  onClick={() => {
                    setForm({ ...form, remember: !form.remember });
                  }}
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-xl border border-transparent bg-green-600 py-4 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Sign up
              </button>
            </div>
          </form>
          <div>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link href="/user/login" className="font-medium text-green-600 hover:text-green-500">
                sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default signup;
