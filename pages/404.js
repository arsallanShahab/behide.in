import Link from "next/link";
import { Illustration } from "../components/Illustration";

export default function NothingFoundBackground() {
  return (
    <div className="bg-gradient-to-t from-white to-transparent py-[180px]">
      <div className="relative flex w-full items-center justify-center ">
        <Illustration className="absolute left-0 right-0 -z-[1] mx-auto max-w-4xl fill-gray-100 opacity-75" />
        <div className="relative z-[1]">
          <h2 className="text-center font-sora text-[45px] font-bold">
            Nothing to see here
          </h2>
          <p
            color="dimmed"
            size="lg"
            align="center"
            className="m-auto my-6 max-w-[540px] font-poppins font-medium text-gray-400"
          >
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </p>
          <div className="text-center">
            <Link
              href="/"
              className="inline-block rounded-md bg-gray-100/50 px-7 py-4 font-sora text-sm font-medium text-black backdrop-blur-md"
            >
              Take me back to home page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
