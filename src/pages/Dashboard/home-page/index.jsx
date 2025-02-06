import Image from "next/image";
import Link from "next/link";

const DashboardScreen = () => {
  return (
    <div className="h-full w-full max-w-[100vw] flex justify-center dark:bg-bodyColor bg-white">
      <div className="h-full w-full max-w-[1500px] p-2 lg:p-5">
        <div className="flex flex-col gap-6">
          <div className="w-full rounded-lg border dark:border-gray-600 p-6 md:p-8">
            <h1 className="self-start font-bold text-lg text-bodyColor dark:text-white">Your Nodes</h1>
            <div className="text-gray-500   text-md dark:text-white">
              Nodes can be managed here or via the desginated page.
            </div>
            <div className="h-full w-full flex flex-col justify-center items-center text-center border-2 border-dashed py-28 rounded-lg mt-6">
              <h1 className="font-semibold text-gray-500 text-lg dark:text-white">
                No Active Nodes Found
              </h1>
              <div className="flex gap-x-4 my-4">
                <Link href="/buy">
                  <button className="flex justify-center items-center font-semibold gap-2.5 text-sm px-5 py-2 rounded-md hover:scale-[1.01] transition-all duration-200 transform-gpu bg-darkPrimary text-black">
                    Buy Node
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
