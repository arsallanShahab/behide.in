import { useGlobalContextProvider } from '@/context/GlobalContext';

const Account = (props) => {
  const { user } = useGlobalContextProvider();
  return (
    <div className="px-20 py-20 ">
      <h1 className="mb-5 text-5xl">Account</h1>
      {user ? (
        <div className="flex basis-1/2 gap-5">
          {/* <h1 className="mb-5 block text-3xl font-semibold">Personal Information</h1>
                  <div className="mb-2 flex items-center justify-start gap-3">
                    <h1 className="inline-block text-lg font-light">Name: {'  '}</h1>
                    <h1 className="inline-block text-lg font-medium">{user.name}</h1>
                  </div>
                  <div className="flex items-center justify-start gap-3">
                    <h1 className="inline-block text-lg font-light">Email:{'  '} </h1>
                    <h1 className="inline-block text-lg font-medium">{user.email}</h1>
                  </div> */}
          <div className="flex-grow-0">
            <div className="mt-2 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                Name
              </span>
              <input
                type="text"
                name="company-website"
                id="company-website"
                value={user.name}
                className="block w-full flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="first name"
                disabled
              />
            </div>
          </div>
          <div className="">
            <div className="mt-2 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                Email
              </span>
              <input
                type="text"
                name="company-website"
                id="company-website"
                value={user.email}
                className="block w-full flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="email"
                disabled
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Account;
