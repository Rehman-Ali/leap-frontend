import Image from "next/image";
import Link from "next/link";

const DashboardScreen = () => {
  return (
    <div className="h-full w-full max-w-[100vw] flex justify-center dark:bg-bodyColor bg-white">
      <div className="h-full w-full max-w-[1500px] p-2 lg:p-5">
        <div className="flex flex-col gap-6">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="relative flex flex-col items-center justify-center rounded-lg border dark:border-gray-600 p-6 md:p-8 w-full overflow-hidden">
              <Image
                src="/assets/dashboard/lotus.png"
                alt="lotus"
                height={300}
                width={300}
                className=" absolute w-40 h-40 -right-8 -bottom-8 animate-spin-slow"
              />
              <div className="z-10">
                <h1 className=" text-lg font-bold dark:text-white">
                  Earn <span className="text-darkPrimary">+7% APY</span> on your
                  SOL.
                  <br />
                  Secure the network with us.
                </h1>
                <p className="mt-4 font-light text-gray-700 dark:text-white">
                  Ligma has partnered with Lotus to provide you with a secure
                  and reliable staking service.
                </p>
                <div className="flex flex-col mt-6 bg-[#f8f8f7] dark:bg-gray-900 dark:text-white p-4 rounded-lg w-full">
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex gap-2 items-center">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                        <line x1="9" x2="9.01" y1="9" y2="9"></line>
                        <line x1="15" x2="15.01" y1="9" y2="9"></line>
                      </svg>
                      <div>VERY LOW RISK </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <line x1="10" x2="14" y1="2" y2="2"></line>
                        <line x1="12" x2="15" y1="14" y2="11"></line>
                        <circle cx="12" cy="14" r="8"></circle>
                      </svg>
                      <div>UNSTAKE EVERY 48 HOURS</div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M21 8L18.74 5.74A9.75 9.75 0 0 0 12 3C11 3 10.03 3.16 9.13 3.47"></path>
                        <path d="M8 16H3v5"></path>
                        <path d="M3 12C3 9.51 4 7.26 5.64 5.64"></path>
                        <path d="m3 16 2.26 2.26A9.75 9.75 0 0 0 12 21c2.49 0 4.74-1 6.36-2.64"></path>
                        <path d="M21 12c0 1-.16 1.97-.47 2.87"></path>
                        <path d="M21 3v5h-5"></path>
                        <path d="M22 22 2 2"></path>
                      </svg>
                      <div>NO FEES</div>
                    </div>
                  </div>
                  <Link
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full mt-4"
                  >
                    <button className="flex justify-center items-center font-semibold gap-2.5 text-sm px-5 py-2 rounded-md hover:scale-[1.01] transition-all duration-200 transform-gpu bg-[#e8f93d] text-black w-full">
                      Stake Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col items-center justify-between rounded-lg border dark:border-gray-600 p-6 md:p-8 overflow-hidden w-full">
              <h1 className="self-start font-bold text-lg dark:text-white">Network Info</h1>
              <div className="bg-[#f8f8f7] dark:bg-gray-900 p-6 rounded-lg mt-6 w-full">
                <div className="flex flex-col w-full gap-5 text-nowrap">
                  <div className="grid grid-cols-3">
                    <div>
                      <div className="text-gray-500 dark:text-white text-sm">Token Price</div>
                      <div className="text-lg font-bold dark:text-white">$216.37</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-sm dark:text-white">Daily Volume</div>
                      <div className="text-lg font-bold dark:text-white">$11.7B</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-sm dark:text-white">SOL Staked</div>
                      <div className="text-lg font-bold dark:text-white">65.56%</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div>
                      <div className="text-gray-500 text-sm dark:text-white">Transactions</div>
                      <div className="text-lg font-bold dark:text-white">340.2B</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-sm dark:text-white">Avg TPS</div>
                      <div className="text-lg font-bold dark:text-white">4,308</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-sm dark:text-white">Epoch</div>
                      <div className="text-lg font-bold dark:text-white">701</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm dark:text-white">Epoch Progress</div>
                    <div className="bg-gray-200 h-4 w-full rounded-full mt-2">
                      <div
                        className="bg-darkPrimary h-4 rounded-full text-white text-xs font-bold flex items-center justify-center"
                        style={{ width: "32.21%" }}
                      >
                        32.21%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                href="#"
                target="_blank"
                className="text-gray-400 dark:text-white text-xs self-end mt-2"
              >
                View More
              </Link>
            </div>
            <div className="hidden xl:flex">
              <div className="bg-marble p-6 xl:p-8 rounded-lg w-full flex justify-center flex-col items-center bg-cover">
                <h1 className="font-bold text-3xl lg:text-4xl">
                  Leap RPC is now available!
                </h1>
                <div className="mt-4 xl:mt-6">
                  <p className="text-pretty lg:text-lg">
                   Advance your setup to the next level with our RPC!
                    <br />
                    <br />
                    High Limits.
                    <br />
                    Maximum Performance.
                  </p>
                </div>
                <Link href="/buy">
                  <button className="flex justify-center items-center font-semibold gap-2.5 text-sm px-5 py-2 rounded-md hover:scale-[1.01] transition-all duration-200 transform-gpu bg-darkPrimary text-black mt-4 xl:mt-6">
                    BUY NOW
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {/* <div className="rounded-lg border dark:border-gray-600 p-6 md:p-8 w-full overflow-hidden">
            <h1 className="font-bold text-lg dark:text-white">Jito Tips Tracker</h1>
            <div className="text-gray-500 text-md dark:text-white">
              Track the latest landing Jito Tips. Don&apos;t waste your money with
              overpriced tips.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <div className="bg-[#f8f8f7] dark:bg-gray-900 dark:text-white rounded-xl p-4 flex flex-col gap-2">
                <div className="font-bold flex flex-row gap-2 text-nowrap">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                  </svg>
                  Risky
                  <span className="text-gray-500 dark:text-white font-normal">
                    (80% Landing)
                  </span>
                </div>
                <div className="text-gray-500 text-xl dark:text-white mt-4 mb-2 self-center">
                  0.000021 SOL
                </div>
              </div>
              <div className="bg-[#f8f8f7] dark:bg-gray-900 dark:text-white rounded-xl p-4 flex flex-col gap-2">
                <div className="font-bold flex flex-row gap-2 text-nowrap">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
                    <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
                    <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
                  </svg>
                  Recommended
                  <span className="text-gray-500 dark:text-white font-normal">
                    (95% Landing)
                  </span>
                </div>
                <div className="text-gray-500 text-xl dark:text-white mt-4 mb-2 self-center">
                  0.001782 SOL
                </div>
              </div>
              <div className="bg-[#f8f8f7] dark:bg-gray-900 dark:text-white rounded-xl p-4 flex flex-col gap-2">
                <div className="font-bold flex flex-row gap-2 text-nowrap">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" x2="9.01" y1="9" y2="9"></line>
                    <line x1="15" x2="15.01" y1="9" y2="9"></line>
                  </svg>
                  Safe
                  <span className="text-gray-500 dark:text-white font-normal">
                    (99% Landing)
                  </span>
                </div>
                <div className="text-gray-500 text-xl dark:text-white mt-4 mb-2 self-center">
                  0.01579 SOL
                </div>
              </div>
            </div>
          </div> */}
          <div className="flex xl:hidden">
            <div className="bg-marble p-6 xl:p-8 rounded-lg w-full flex justify-center flex-col items-center bg-cover">
              <h1 className="font-bold text-3xl lg:text-4xl">
              Leap RPC is now available!
              </h1>
              <div className="mt-4 xl:mt-6">
                <p className="text-pretty lg:text-lg">
                Advance your setup to the next level with our RPC!
                  <br />
                  <br />
                  High Limits.
                  <br />
                  Maximum Performance.
                </p>
              </div>
              <Link href="#">
                <button className="flex justify-center items-center font-semibold gap-2.5 text-sm px-5 py-2 rounded-md hover:scale-[1.01] transition-all duration-200 transform-gpu bg-darkPrimary text-black mt-4 xl:mt-6">
                  BUY NOW
                </button>
              </Link>
            </div>
          </div>
          <div className="w-full rounded-lg border dark:border-gray-600 p-6 md:p-8">
            <h1 className="self-start font-bold text-lg dark:text-white">Your Nodes</h1>
            <div className="text-gray-500 text-md dark:text-white">
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
                <Link href="#">
                  <button className="flex justify-center dark:text-white items-center font-semibold gap-2.5 text-sm px-5 py-2 rounded-md hover:scale-[1.01] transition-all duration-200 transform-gpu border text-black">
                    Use Free Node
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
