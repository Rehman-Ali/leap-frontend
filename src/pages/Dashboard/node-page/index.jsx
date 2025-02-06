import Link from "next/link";

const DashboardNodeScreen = () => {
  return (
    <div className="h-full w-full max-w-[100vw] flex justify-center dark:bg-bodyColor bg-white">
      <div className="h-full w-full max-w-[1500px] p-2 lg:p-5">
        <div className="flex justify-between">
          <h1 className="font-semibold text-xl flex items-center dark:text-white">
            Your Nodes
            <span className="bg-darkPrimary text-black dark:text-white text-sm px-2 py-0.5 h-fit ml-5 rounded-lg">
              0
            </span>
          </h1>
          <Link href="/buy">
            <button className="flex justify-center dark:text-white items-center font-semibold gap-2.5 text-sm px-5 py-2 rounded-md hover:scale-[1.01] transition-all duration-200 transform-gpu bg-darkPrimary text-black">
              Buy Node
            </button>
          </Link>
        </div>
        <hr className="mt-4 mb-6" />
        <div>
          <div className="h-[80vh] w-full flex flex-col justify-center items-center text-center">
            <div className="text-2xl font-semibold text-gray-400 dark:text-white">
              You dont have any paid plans yet.
              <br />
              Get started by buying one and fly by the competition.
              <br />
              <br />
              <span className="text-base">Want to test the waters first? </span>
            </div>
            <div className="border-2 border-dashed text-center rounded-lg flex justify-center flex-col items-center mt-4 p-4">
              <div className="border border-gray-200 p-3 rounded-lg justify-center dark:bg-gray-900 bg-white">
                <div className="flex justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="text-xs font-semibold px-2 py-0.5 rounded-md border w-fit  text-gray-500 dark:text-white dark:border-white border-gray-300">
                      FREE
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">🌍</p>
                </div>
                <div className="flex flex-col items-center w-full">
                  <p className="font-semibold my-2 text-xl dark:text-white">PUBLIC</p>
                  <div className="my-3 w-full flex flex-col gap-2 p-2">
                    <div className="w-full">
                      <div className="w-full">
                        <div className="text-gray-500 text-[10px] dark:text-white">RPC URL</div>
                        <div className="flex items-center">
                          <div className="flex items-center w-full">
                            <input
                              className="text-sm outline-none w-full pr-1.5 dark:text-white"
                              placeholder=" "
                              type="text"
                              defaultValue="https://public.blockchain.com"
                            />
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth="0"
                              viewBox="0 0 512 512"
                              className="cursor-pointer hover:scale-110 transition-all opacity-50 hover:opacity-100"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="336"
                                height="336"
                                x="128"
                                y="128"
                                fill="none"
                                strokeLinejoin="round"
                                strokeWidth="32"
                                rx="57"
                                ry="57"
                              ></rect>
                              <path
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="32"
                                d="m383.5 128 .5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="w-full">
                        <div className="text-gray-500 text-[10px] dark:text-white">
                          WEBSOCKET RPC URL
                        </div>
                        <div className="flex items-center">
                          <div className="flex items-center w-full">
                            <input
                              className="text-sm outline-none w-full pr-1.5 dark:text-white"
                              placeholder=" "
                              type="text"
                              defaultValue="wss://public.leap-blockchain.com"
                            />
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth="0"
                              viewBox="0 0 512 512"
                              className="cursor-pointer hover:scale-110 transition-all opacity-50 hover:opacity-100"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="336"
                                height="336"
                                x="128"
                                y="128"
                                fill="none"
                                strokeLinejoin="round"
                                strokeWidth="32"
                                rx="57"
                                ry="57"
                              ></rect>
                              <path
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="32"
                                d="m383.5 128 .5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                   
                  </div>
                </div>
              </div>
              <Link className="mt-4" href="#">
                <button className="flex justify-center items-center dark:text-white font-semibold gap-2.5 text-sm px-5 py-2 rounded-md hover:scale-[1.01] transition-all duration-200 transform-gpu bg-darkPrimary text-black">
                  Upgrade Plan
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNodeScreen;
