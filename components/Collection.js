const Collection = () => {
  return (
    <div className="bg-brandGrey">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl pt-8 pb-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="font-poppins text-4xl font-bold text-gray-900 sm:text-6xl">
            Collections
          </h2>

          <div className="mt-16 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            <div className="group relative rounded-xl border bg-gray-100 p-6">
              <div className="sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1 lg:aspect-h-1 relative flex h-80 w-full items-center justify-center overflow-hidden rounded-xl bg-white group-hover:opacity-75 sm:h-64">
                <img
                  src="1.jpg"
                  alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug."
                  className="h-full object-cover object-center"
                />
              </div>
              <h3 className="mt-6 text-sm text-gray-500">
                <a href="#" className="font-rubik">
                  <span className="absolute inset-0"></span>
                  Desk and Office
                </a>
              </h3>
              <p className="font-poppins text-base font-semibold text-gray-900">
                Work from home accessories
              </p>
            </div>

            <div className="group relative rounded-xl border bg-gray-100 p-6">
              <div className="sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1 lg:aspect-h-1 relative flex h-80 w-full items-center justify-center overflow-hidden rounded-xl bg-white group-hover:opacity-75 sm:h-64">
                <img
                  src="2.jpg"
                  alt="Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant."
                  className="h-full object-cover object-center"
                />
              </div>
              <h3 className="mt-6 text-sm text-gray-500">
                <a href="#" className="font-rubik">
                  <span className="absolute inset-0"></span>
                  Regular
                </a>
              </h3>
              <p className="font-poppins text-base font-semibold text-gray-900">
                Journals and note-taking
              </p>
            </div>

            <div className="group relative rounded-xl border bg-gray-100 p-6">
              <div className="sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1 lg:aspect-h-1 relative flex h-80 w-full items-center justify-center overflow-hidden rounded-xl bg-white group-hover:opacity-75 sm:h-64">
                <img
                  src="3.jpg"
                  alt="Collection of four insulated travel bottles on wooden shelf."
                  className="h-full object-cover object-center"
                />
              </div>
              <h3 className="mt-6 text-sm text-gray-500">
                <a href="#" className="font-rubik">
                  <span className="absolute inset-0"></span>
                  Travel
                </a>
              </h3>
              <p className="font-poppins text-base font-semibold text-gray-900">
                Daily commute essentials
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
