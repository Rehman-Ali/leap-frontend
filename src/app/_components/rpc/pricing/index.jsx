import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { IoClose, IoScale } from "react-icons/io5";
const RPCPricing = () => {
  return (
    <section className="relative" id="pricing">
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
        aria-hidden="true"
      >
        <div className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-1/3 aspect-square">
          <div className="absolute inset-0 translate-z-0 bg-darkPrimary rounded-full blur-[120px] opacity-30"></div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center pb-12 md:pb-20">
            <div>
              <div className="inline-flex text-[20px] mw-10:text-[16px] font-inter font-medium text-white pb-3">
                Pricing Plans
              </div>
            </div>
            <h2 className="h2 font-inter text-[44px] mw-10:text-[32px] font-bold bg-clip-text bg-transparent text-white  pb-4">
              Flexible plans and features
            </h2>
            <p className="text-[18px] mw-10:text-[16px] font-inter text-white">
              Our node is designed for maximum performance and reliability,
              equipped with cutting-edge technologies to meet the demands of
              professional crypto traders and developers.
            </p>
          </div>
          <div className="mw-10:hidden flex flex-wrap">
            <div className="w-[16%] px-3   py-[50px]">
              <div className="mw-12:mt-[240px] mt-[255px]">
                <p className="text-white font-inter font-medium text-[14px]">
                  Usage
                </p>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px]">
                  <p>Bandwidth</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px]">
                  <p>Requests</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px]">
                  <p>Rate Limit</p>
                </div>
              </div>
              <div>
                <p className="pt-[20px] text-white font-inter font-medium text-[14px]">
                  Estimated TPS
                </p>
                <p className="pt-[30px] text-white font-inter font-medium text-[14px]">
                  Features
                </p>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px]">
                  <p>High Landing Rate</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px]">
                  <p>Websocket Support</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px]">
                  <p>Dedicated Regions</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px]">
                  <p>Geyser gRPC</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px]">
                  <p>Enterprise Add-ons</p>
                </div>
              </div>
              <div>
                <p className="pt-[20px] text-white font-inter font-medium text-[14px]">
                  Support
                </p>

                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px]">
                  <p>Premium Support</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px]">
                  <p>
                  Community Support</p>
                </div>
              </div>
            </div>
           
            
            <div className="w-[21%] px-3 py-[20px] bg-[#37415133] rounded-tl-[24px] rounded-bl-[24px]">
              <div className=" flex flex-col justify-end">
                <div className="grow pb-[55px] mw-12:pb-[40px] mb-4 border-b border-slate-800">
                  <div className="text-base font-inter font-medium text-white pb-0.5">
                    Free
                  </div>
                  <div className="mb-1">
                    <span className="text-lg font-inter font-medium text-slate-500">
                      $
                    </span>
                    <span className="text-3xl font-bold font-inter text-slate-50">
                      0
                    </span>
                    <span className="text-sm text-slate-600 font-inter font-medium">
                      /mo
                    </span>
                  </div>
                  <div className="text-slate-500 font-inter mw-12:text-[12px] min-h-[65px] text-[14px] font-normal">
                  
                  </div>
                </div>
                <div className=" pb-4 border-b border-slate-800">
                  <Link href="/buy">
                    <button
                      className="flex text-[16px] gap-2 flex-row h-[32px] text-black  items-center justify-center rounded-[50px] bg-darkPrimary font-medium font-inter cursor-pointer hover:bg-white w-full transition duration-150 ease-in-out group"
                      // href="https://hub.ligmanode.com/buy?plan=Getting Started"
                    >
                      Get Started
                      <FaArrowRight size={12} color={"#000"} />
                    </button>
                  </Link>
                </div>
              </div>
              <div className="mt-[53px]">
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Unlimited</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>100,000</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>10 rps</p>
                </div>
              </div>
              <div>
                <p className="pt-[20px] text-white font-inter font-medium text-[14px]">
                  20
                </p>
                <p className="pt-[30px] text-white font-inter font-medium text-[14px]">
                  &nbsp;
                </p>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center">
                  <FaCheck size={14} color={"#fff"} />
                  <p>&nbsp;</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center">
                  <FaCheck size={14} color={"#fff"} />
                  <p>&nbsp;</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center">
                  <FaCheck size={14} color={"#fff"} />
                  <p>&nbsp;</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center">
                <IoClose size={16} color={"#FF0000"} />
                  <p> &nbsp;</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center">
                <IoClose size={16} color={"#FF0000"} /> 
                  <p> &nbsp;</p>
                </div>
              </div>
              <div>
                <p className="pt-[20px] text-white font-inter font-medium text-[14px]">
                  &nbsp;
                </p>

                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center">
                  <IoClose size={16} color={"#FF0000"} />
                  <p> &nbsp;</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center">
                  <FaCheck size={14} color={"#fff"} />
                  <p> &nbsp;</p>
                </div>
              </div>
            </div>

            <div className="w-[21%] px-3 py-[20px] bg-[#37415133]">
              <div className=" flex flex-col justify-end">
                <div className="grow pb-[55px] mw-12:pb-[40px] mb-4 border-b border-slate-800">
                  <div className="text-base font-inter font-medium text-white pb-0.5">
                    Getting Started
                  </div>
                  <div className="mb-1">
                    <span className="text-lg font-inter font-medium text-slate-500">
                      $
                    </span>
                    <span className="text-3xl font-bold font-inter text-slate-50">
                      1200
                    </span>
                    <span className="text-sm text-slate-600 font-inter font-medium">
                      /mo
                    </span>
                  </div>
                  <div className="text-slate-500 font-inter mw-12:text-[12px] min-h-[65px] text-[14px] font-normal">
                  Instant access to any location of your choice
                  </div>
                </div>
                <div className=" pb-4 border-b border-slate-800">
                  <Link href="/buy">
                    <button
                      className="flex text-[16px] gap-2 flex-row h-[32px] text-black  items-center justify-center rounded-[50px] bg-darkPrimary font-medium font-inter cursor-pointer hover:bg-white w-full transition duration-150 ease-in-out group"
                      // href="https://hub.ligmanode.com/buy?plan=Getting Started"
                    >
                      Get Started
                      <FaArrowRight size={12} color={"#000"} />
                    </button>
                  </Link>
                </div>
              </div>
              <div className="mt-[53px]">
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Unlimited</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Unlimited</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>200 rps</p>
                </div>
              </div>
              <div>
                <p className="pt-[20px] text-white font-inter font-medium text-[14px]">
                  200
                </p>
                <p className="pt-[30px] text-white font-inter font-medium text-[14px]">
                  &nbsp;
                </p>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center">
                  <FaCheck size={14} color={"#fff"} />
                  <p>&nbsp;</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center">
                  <FaCheck size={14} color={"#fff"} />
                  <p>&nbsp;</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center">
                  <FaCheck size={14} color={"#fff"} />
                  <p>&nbsp;</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center">
                  <FaCheck size={14} color={"#fff"} />
                  <p> &nbsp;</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center">
                  <FaCheck size={14} color={"#fff"} />
                  <p> &nbsp;</p>
                </div>
              </div>
              <div>
                <p className="pt-[20px] text-white font-inter font-medium text-[14px]">
                  &nbsp;
                </p>

                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center">
                  <FaCheck size={14} color={"#fff"} />
                  <p> &nbsp;</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center">
                  <FaCheck size={14} color={"#fff"} />
                  <p> &nbsp;</p>
                </div>
              </div>
            </div>
            <div className="w-[21%]  px-3 py-[20px] bg-[#37415133] ">
              <div className=" flex flex-col justify-end">
                <div className="grow pb-4 mb-4 border-b border-slate-800">
                  <div className="text-base font-inter font-medium text-white pb-0.5">
                    Professional
                  </div>
                  <div className="mb-1">
                    <span className="text-lg font-inter font-medium text-slate-500">
                      $
                    </span>
                    <span className="text-3xl font-bold font-inter text-slate-50">
                      1800
                    </span>
                    <span className="text-sm text-slate-600 font-inter font-medium">
                      /mo
                    </span>
                  </div>
                  <div className="text-slate-500 mw-12:text-[12px] min-h-[65px] font-inter text-[14px] font-normal">
                    Take your trading to the next level with no rate limits and Instant access to all our node locations including, VA, Frankfurt and Amsterdam.
                  </div>
                </div>
                <div className="pb-4 border-b border-slate-800">
                  <Link href="/buy">
                    <button
                      className="flex text-[16px] gap-2 flex-row h-[32px] text-black  items-center justify-center rounded-[50px] bg-darkPrimary font-medium font-inter cursor-pointer hover:bg-white w-full transition duration-150 ease-in-out group"
                      // href="https://hub.ligmanode.com/buy?plan=Getting Started"
                    >
                      Get Started
                      <FaArrowRight size={12} color={"#000"} />
                    </button>
                  </Link>
                </div>
              </div>
              <div className="mt-[53px]">
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Unlimited</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Unlimited</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>No Rate Limit</p>
                </div>
              </div>
              <div>
                <p className="pt-[20px] text-darkPrimary font-inter font-medium text-[14px]">
                  1,000
                </p>
                <p className="pt-[30px] text-white font-inter font-medium text-[14px]">
                  &nbsp;
                </p>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center">
                  <FaCheck size={14} color={"#fff"} />
                  <p>&nbsp;</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center">
                  <FaCheck size={14} color={"#fff"} />
                  <p>&nbsp;</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center">
                  <FaCheck size={14} color={"#fff"} />
                  <p>&nbsp;</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center">
                  <FaCheck size={14} color={"#fff"} />
                  <p>&nbsp;</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center">
                  <FaCheck size={14} color={"#fff"} />
                  <p>&nbsp;</p>
                </div>
              </div>
              <div>
                <p className="pt-[20px] text-white font-inter font-medium text-[14px]">
                  &nbsp;
                </p>

                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center">
                  <FaCheck size={14} color={"#fff"} />
                  <p>&nbsp;</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center">
                  <FaCheck size={14} color={"#fff"} />
                  <p>&nbsp;</p>
                </div>
                {/*   */}
              </div>
            </div>
            <div className="w-[21%]  px-3 py-[20px] bg-[#37415133] rounded-tr-[24px] rounded-br-[24px]">
              <div className=" flex flex-col justify-end">
                <div className="grow pb-[34px] mb-4 border-b border-slate-800">
                  <div className="text-base font-inter font-medium text-white pb-0.5">
                    Enterprise
                  </div>
                  <div className="mb-1">
                    <span className="text-lg font-inter font-medium text-slate-500">
                      $
                    </span>
                    <span className="text-3xl font-bold font-inter text-slate-50">
                      ~
                    </span>
                    <span className="text-sm text-slate-600 font-inter font-medium">
                      /mo
                    </span>
                  </div>
                  <div className="text-slate-500 mw-12:text-[12px] min-h-[65px] font-inter text-[14px] font-normal">
                  Fully managed private nodes designed for the fastest speeds at any scale. Contact us to get started.
                  </div>
                </div>
                <div className="pb-4 border-b border-slate-800">
                  <a href="https://discord.gg/9UXPJgnZ5q" target="_blank">
                    <button
                      className="flex text-[16px] gap-2 flex-row h-[32px] text-black  items-center justify-center rounded-[50px] bg-darkPrimary font-medium font-inter cursor-pointer hover:bg-white w-full transition duration-150 ease-in-out group"
                      // href="https://hub.ligmanode.com/buy?plan=Getting Started"
                    >
                      Contact Us
                      <FaArrowRight size={12} color={"#000"} />
                    </button>
                  </a>
                </div>
              </div>
              <div className="mt-[53px]">
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Unlimited</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Unlimited</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>No Rate Limit</p>
                </div>
              </div>
              <div>
                <p className="pt-[20px] text-darkPrimary font-inter font-medium text-[14px]">
                  ~
                </p>
                <p className="pt-[30px] text-white font-inter font-medium text-[14px]">
                  &nbsp;
                </p>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center">
                  <FaCheck size={14} color={"#fff"} />
                  <p>&nbsp;</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center">
                  <FaCheck size={14} color={"#fff"} />
                  <p>&nbsp;</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center">
                  <FaCheck size={14} color={"#fff"} />
                  <p>&nbsp;</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center">
                  <FaCheck size={14} color={"#fff"} />
                  <p>&nbsp;</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center">
                  <FaCheck size={14} color={"#fff"} />
                  <p>&nbsp;</p>
                </div>
              </div>
              <div>
                <p className="pt-[20px] text-white font-inter font-medium text-[14px]">
                  &nbsp;
                </p>

                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center">
                  <FaCheck size={14} color={"#fff"} />
                  <p>&nbsp;</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center">
                  <FaCheck size={14} color={"#fff"} />
                  <p>&nbsp;</p>
                </div>
                {/*   */}
              </div>
            </div>
          </div>
          <div className="hidden mw-10:flex flex-col gap-y-10">
          <div className=" px-6 py-[20px] bg-[#37415133] rounded-[24px]">
              <div className=" flex flex-col justify-end">
                <div className="grow pb-4 mb-4 border-b border-slate-800">
                  <div className="text-base font-inter font-medium text-white pb-0.5">
                    Free
                  </div>
                  <div className="mb-1">
                    <span className="text-lg font-inter font-medium text-slate-500">
                      $
                    </span>
                    <span className="text-3xl font-bold font-inter text-slate-50">
                      0
                    </span>
                    <span className="text-sm text-slate-600 font-inter font-medium">
                      /mo
                    </span>
                  </div>
                  <div className="text-slate-500 font-inter mw-12:text-[12px] text-[14px] font-normal">
                    {/* Instant access to any location of your choice. */}
                  </div>
                </div>
                <div className="pb-4 border-b border-slate-800">
                  <Link href="/buy">
                    <button
                      className="flex text-[16px] gap-2 flex-row h-[32px] text-black  items-center justify-center rounded-[50px] bg-darkPrimary font-medium font-inter cursor-pointer hover:bg-white w-full transition duration-150 ease-in-out group"
                      // href="https://hub.ligmanode.com/buy?plan=Getting Started"
                    >
                      Get Started
                      <FaArrowRight size={12} color={"#000"} />
                    </button>
                  </Link>
                </div>
              </div>
              <div className="mw-6:mt-[20px] mt-[50px]">
                <p className="pt-[20px] text-white font-inter font-medium text-[14px]">
                  Usage
                </p>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Unlimited Bandwidth</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>100,000</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>10 rps Rate Limit</p>
                </div>

                <div>
                  <p className="pt-[20px] text-darkPrimary font-inter font-medium text-[14px]">
                    <span className="text-white">Estimated TPS </span> 500
                  </p>
                  <p className="pt-[30px] text-white font-inter font-medium text-[14px]">
                    Features
                  </p>
                  <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                    <FaCheck size={14} color={"#fff"} />
                    <p>High Landing Rate</p>
                  </div>
                  <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                    <FaCheck size={14} color={"#fff"} />
                    <p>Websocket Support</p>
                  </div>
                  <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                    <FaCheck size={14} color={"#fff"} />
                    <p>Dedicated Regions</p>
                  </div>
                </div>
                <div>
                  <p className="pt-[20px] text-white font-inter font-medium text-[14px]">
                    Support
                  </p>

                  <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                    <FaCheck size={14} color={"#fff"} />
                    <p>
                    Community Support</p>
                  </div>
                  {/* <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                <FaCheck size={14} color={"#fff"} />
                  <p>Dedicated Agent</p>
                </div> */}
                </div>
              </div>
            </div>
            <div className=" px-6 py-[20px] bg-[#37415133] rounded-[24px]">
              <div className=" flex flex-col justify-end">
                <div className="grow pb-4 mb-4 border-b border-slate-800">
                  <div className="text-base font-inter font-medium text-white pb-0.5">
                    Getting Started
                  </div>
                  <div className="mb-1">
                    <span className="text-lg font-inter font-medium text-slate-500">
                      $
                    </span>
                    <span className="text-3xl font-bold font-inter text-slate-50">
                      1200
                    </span>
                    <span className="text-sm text-slate-600 font-inter font-medium">
                      /mo
                    </span>
                  </div>
                  <div className="text-slate-500 font-inter mw-12:text-[12px] text-[14px] font-normal">
                    Instant access to any location of your choice.
                  </div>
                </div>
                <div className="pb-4 border-b border-slate-800">
                  <Link href="/buy">
                    <button
                      className="flex text-[16px] gap-2 flex-row h-[32px] text-black  items-center justify-center rounded-[50px] bg-darkPrimary font-medium font-inter cursor-pointer hover:bg-white w-full transition duration-150 ease-in-out group"
                      // href="https://hub.ligmanode.com/buy?plan=Getting Started"
                    >
                      Get Started
                      <FaArrowRight size={12} color={"#000"} />
                    </button>
                  </Link>
                </div>
              </div>
              <div className="mw-6:mt-[20px] mt-[50px]">
                <p className="pt-[20px] text-white font-inter font-medium text-[14px]">
                  Usage
                </p>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Unlimited Bandwidth</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Unlimited Requests</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>200 rps Rate Limit</p>
                </div>

                <div>
                  <p className="pt-[20px] text-darkPrimary font-inter font-medium text-[14px]">
                    <span className="text-white">Estimated TPS </span> 500
                  </p>
                  <p className="pt-[30px] text-white font-inter font-medium text-[14px]">
                    Features
                  </p>
                  <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                    <FaCheck size={14} color={"#fff"} />
                    <p>High Landing Rate</p>
                  </div>
                  <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                    <FaCheck size={14} color={"#fff"} />
                    <p>Websocket Support</p>
                  </div>
                  <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                    <FaCheck size={14} color={"#fff"} />
                    <p>Dedicated Regions</p>
                  </div>
                  <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                    <FaCheck size={14} color={"#fff"} />
                    <p>Geyser gRPC</p>
                  </div>
                  <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                    <FaCheck size={14} color={"#fff"} />
                    <p>Enterprise Add-ons</p>
                  </div>
                </div>
                <div>
                  <p className="pt-[20px] text-white font-inter font-medium text-[14px]">
                    Support
                  </p>

                  <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                    <FaCheck size={14} color={"#fff"} />
                    <p>Premium Support</p>
                  </div>
                  <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                    <FaCheck size={14} color={"#fff"} />
                    <p>Community Support</p>
                  </div>
                  {/* <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                <FaCheck size={14} color={"#fff"} />
                  <p>Dedicated Agent</p>
                </div> */}
                </div>
              </div>
            </div>
            {/* <div className=" px-4 py-[20px] bg-[#37415133] border border-[#e5e7eb] rounded-[24px]">
              <div className=" flex flex-col justify-end">
                <div className="grow pb-4 mb-4 border-b border-slate-800">
                  <div className="text-base font-inter font-medium text-white pb-0.5">
                    Pro
                  </div>
                  <div className="mb-1">
                    <span className="text-lg font-inter font-medium text-slate-500">
                      $
                    </span>
                    <span className="text-3xl font-bold font-inter text-slate-50">
                      499
                    </span>
                    <span className="text-sm text-slate-600 font-inter font-medium">
                      /mo
                    </span>
                  </div>
                  <div className="text-slate-500 mw-12:text-[12px] font-inter text-[14px] font-normal">
                    For botters with moderate transaction and performance needs.
                  </div>
                </div>
                <div className="pb-4 border-b border-slate-800">
                  <button
                    className="flex text-[16px] gap-2 flex-row h-[32px] text-black  items-center justify-center rounded-[50px] bg-darkPrimary font-medium font-inter cursor-pointer hover:bg-white w-full transition duration-150 ease-in-out group"
                    // href="https://hub.ligmanode.com/buy?plan=Getting Started"
                  >
                    Get Started
                    <FaArrowRight size={12} color={"#000"} />
                  </button>
                </div>
              </div>
              <div className="mt-[50px]">
              <p className="pt-[20px] text-white font-inter font-medium text-[14px]">
                 Usage
                </p>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Unlimited Bandwidth</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Unlimited Requests</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>No Rate Limit</p>
                </div>
              </div>
              <div>
                <p className="pt-[20px] text-darkPrimary font-inter font-medium text-[14px]">
                <span className="text-white" >Estimated TPS </span> 1,000
                </p>
                <p className="pt-[30px] text-white font-inter font-medium text-[14px]">
                Features
                </p>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                <FaCheck size={14} color={"#fff"} />
                  <p>High Landing Rate</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                <FaCheck size={14} color={"#fff"} />
                  <p>Websocket Support</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                <FaCheck size={14} color={"#fff"} />
                  <p>Dedicated Regions</p>
                </div>

              </div>
              <div>
                <p className="pt-[20px] text-white font-inter font-medium text-[14px]">
                Support
                </p>

                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                <FaCheck size={14} color={"#fff"} />
                  <p>Premium Support</p>
                </div>
                
              </div>
            </div> */}
            <div className=" px-6 py-[20px] bg-[#37415133] rounded-[24px]">
              <div className=" flex flex-col justify-end">
                <div className="grow pb-4 mb-4 border-b border-slate-800">
                  <div className="text-base font-inter font-medium text-white pb-0.5">
                   Professional
                  </div>
                  <div className="mb-1">
                    <span className="text-lg font-inter font-medium text-slate-500">
                      $
                    </span>
                    <span className="text-3xl font-bold font-inter text-slate-50">
                      1800
                    </span>
                    <span className="text-sm text-slate-600 font-inter font-medium">
                      /mo
                    </span>
                  </div>
                  <div className="text-slate-500 mw-12:text-[12px] font-inter text-[14px] font-normal">
                   Take your trading to the next level with no rate limits and Instant access to all our node locations including, VA, Frankfurt and Amsterdam.
                  </div>
                </div>
                <div className="pb-4 border-b border-slate-800">
                  <Link href="/buy">
                    <button
                      className="flex text-[16px] gap-2 flex-row h-[32px] text-black  items-center justify-center rounded-[50px] bg-darkPrimary font-medium font-inter cursor-pointer hover:bg-white w-full transition duration-150 ease-in-out group"
                      // href="https://hub.ligmanode.com/buy?plan=Getting Started"
                    >
                      Get Started
                      <FaArrowRight size={12} color={"#000"} />
                    </button>
                  </Link>
                </div>
              </div>
              <div className="mw-6:mt-[20px] mt-[73px]">
                <p className="pt-[20px] text-white font-inter font-medium text-[14px]">
                  Usage
                </p>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Unlimited Bandwidth</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Unlimited Requests</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>No Rate Limit</p>
                </div>
              </div>
              <div>
                <p className="pt-[20px] text-darkPrimary font-inter font-medium text-[14px]">
                  <span className="text-white">Estimated TPS </span> 6,000
                </p>
                <p className="pt-[30px] text-white font-inter font-medium text-[14px]">
                  Features
                </p>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>High Landing Rate</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Websocket Support</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Dedicated Regions</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Geyser gRPC</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Enterprise Add-ons</p>
                </div>
              </div>
              <div>
                <p className="pt-[20px] text-white font-inter font-medium text-[14px]">
                  Support
                </p>

                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Premium Support</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Community Support</p>
                </div>
                {/* <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                <FaCheck size={14} color={"#fff"} />
                  <p>Dedicated Agent</p>
                </div> */}
              </div>
            </div>

            <div className=" px-6 py-[20px] bg-[#37415133] rounded-[24px]">
              <div className=" flex flex-col justify-end">
                <div className="grow pb-4 mb-4 border-b border-slate-800">
                  <div className="text-base font-inter font-medium text-white pb-0.5">
                    Enterprise
                  </div>
                  <div className="mb-1">
                    <span className="text-lg font-inter font-medium text-slate-500">
                      $
                    </span>
                    <span className="text-3xl font-bold font-inter text-slate-50">
                      ~
                    </span>
                    <span className="text-sm text-slate-600 font-inter font-medium">
                      /mo
                    </span>
                  </div>
                  <div className="text-slate-500 mw-12:text-[12px] font-inter text-[14px] font-normal">
                   Fully managed private nodes designed for the fastest speeds at any scale. Contact us to get started.
                  </div>
                </div>
                <div className="pb-4 border-b border-slate-800">
                  <a href="https://discord.gg/9UXPJgnZ5q" target="_blank">
                    <button
                      className="flex text-[16px] gap-2 flex-row h-[32px] text-black  items-center justify-center rounded-[50px] bg-darkPrimary font-medium font-inter cursor-pointer hover:bg-white w-full transition duration-150 ease-in-out group"
                      // href="https://hub.ligmanode.com/buy?plan=Getting Started"
                    >
                      Contact Us
                      <FaArrowRight size={12} color={"#000"} />
                    </button>
                  </a>
                </div>
              </div>
              <div className=" mw-6:mt-[20px] mt-[73px]">
                <p className="pt-[20px] text-white font-inter font-medium text-[14px]">
                  Usage
                </p>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Unlimited Bandwidth</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Unlimited Requests</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>No Rate Limit</p>
                </div>
              </div>
              <div>
                <p className="pt-[20px] text-darkPrimary font-inter font-medium text-[14px]">
                  <span className="text-white">Estimated TPS </span> 6,000
                </p>
                <p className="pt-[30px] text-white font-inter font-medium text-[14px]">
                  Features
                </p>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>High Landing Rate</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Websocket Support</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Dedicated Regions</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Geyser gRPC</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Enterprise Add-ons</p>
                </div>
              </div>
              <div>
                <p className="pt-[20px] text-white font-inter font-medium text-[14px]">
                  Support
                </p>

                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Premium Support</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>
                    Community Support</p>
                </div>
                {/* <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                <FaCheck size={14} color={"#fff"} />
                  <p>Dedicated Agent</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RPCPricing;
