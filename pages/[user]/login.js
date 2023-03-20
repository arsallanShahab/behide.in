import logo from '@public/behide-logo-new.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useGlobalContextProvider } from '../../context/GlobalContext';

export default function Example() {
  const { setUser, user } = useGlobalContextProvider();
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading('Signing in...');
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    const { success, error, user, message, token } = await res.json();
    console.log(success, error, token);
    if (error) {
      toast.dismiss();
      toast.error(message);
    }
    if (success && token && user) {
      const username = user?.name?.replace(' ', '-').toLowerCase();
      toast.dismiss();
      toast.success(message);
      localStorage.setItem('token', token);
      setUser(() => {
        return {
          name: user.name,
          email: user.email,
          _id: user._id,
        };
      });
      router.push(`/${username}/profile`);
    }
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center px-4 pt-16 pb-32 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Image priority={true} src={logo} alt="behide logo" className="mx-auto h-20 w-auto" />
            <h2 className="mt-6 text-center font-sora text-3xl font-semibold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-xl border border-gray-300 px-3 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                  }}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
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

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <a href="#" className="font-medium text-green-600 hover:text-green-500">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-xl border border-transparent bg-green-600 py-4 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Sign in
              </button>
            </div>
          </form>
          <div>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link href="/user/signup" className="font-medium text-green-600 hover:text-green-500">
                sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
