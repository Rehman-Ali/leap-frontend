import { FaArrowRight } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
const NodePricing = () => {
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
              In a competitive market where some node providers charge as much
              as 500 SOL, we prioritize affordability and flexibility. Our
              pricing plans are designed to meet the diverse needs of our
              clients, ensuring that you have access to secure and reliable
              nodes without the upcharge.
            </p>
          </div>
          <div className="mw-10:hidden flex flex-wrap">
            <div className="w-[25%] px-6  py-[50px]">
              <div className="inline-flex items-center whitespace-nowrap">
                <div className="text-sm text-white font-medium font-inter mr-2">
                  Monthly
                </div>
                <div className="relative">
                  <input type="checkbox" id="toggle" className="peer sr-only" />
                  <label
                    htmlFor="toggle"
                    className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-slate-400 px-0.5 outline-slate-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-black before:shadow-sm before:transition-transform before:duration-150 peer-checked:bg-[#FAF5FF] peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-[#FAF5FF]"
                  >
                    <span className="sr-only">Pay Yearly</span>
                  </label>
                </div>
                <div className="text-sm text-white font-medium font-inter  ml-2">
                  Yearly <span className="text-darkPrimary">(-10%)</span>
                </div>
              </div>
              <div className="font-light font-inter text-slate-400 mt-6 leading-tight">
                Additional Discounts based on $Leap Staked
              </div>
              <div className="flex flex-row gap-1.5 mt-2">
                <div
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Bronze - 10% Discount"
                >
                  <svg
                    width="15"
                    height="12"
                    viewBox="0 0 15 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.541 0.560748C6.97266 -0.186915 8.05182 -0.186916 8.48348 0.560747L14.1167 10.3178C14.5484 11.0654 14.0088 12 13.1455 12H1.87903C1.0157 12 0.476121 11.0654 0.907784 10.3178L6.541 0.560748Z"
                      fill="url(#paint0_linear_132_10)"
                    ></path>
                    <defs>
                      <linearGradient
                        id="paint0_linear_132_10"
                        x1="11.9476"
                        y1="-0.135843"
                        x2="3.508"
                        y2="16.3738"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#EFE7D6"></stop>
                        <stop offset="1" stopColor="#BF8F67"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Silver - 20% Discount"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 1C0 0.447715 0.447715 0 1 0H11C11.5523 0 12 0.447715 12 1V11C12 11.5523 11.5523 12 11 12H1C0.447715 12 0 11.5523 0 11V1Z"
                      fill="url(#paint0_linear_132_8)"
                    ></path>
                    <defs>
                      <linearGradient
                        id="paint0_linear_132_8"
                        x1="9.25"
                        y1="2.84736e-07"
                        x2="2.45"
                        y2="10.7"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F3F3F3"></stop>
                        <stop offset="1" stopColor="#C6C6C6"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Gold - 30% Discount"
                >
                  <svg
                    width="14"
                    height="13"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.91583 0.908654C7.00265 0.641451 7.38067 0.641452 7.46749 0.908654L8.75441 4.86938C8.79324 4.98888 8.90459 5.06978 9.03024 5.06978H13.1948C13.4757 5.06978 13.5926 5.4293 13.3653 5.59444L9.99607 8.04231C9.89442 8.11616 9.85189 8.24707 9.89071 8.36656L11.1776 12.3273C11.2645 12.5945 10.9586 12.8167 10.7313 12.6515L7.36213 10.2037C7.26048 10.1298 7.12284 10.1298 7.02119 10.2037L3.65199 12.6515C3.4247 12.8167 3.11887 12.5945 3.20569 12.3273L4.49261 8.36656C4.53144 8.24707 4.4889 8.11616 4.38725 8.04231L1.01806 5.59444C0.790761 5.4293 0.907576 5.06978 1.18853 5.06978H5.35308C5.47873 5.06978 5.59009 4.98888 5.62891 4.86938L6.91583 0.908654Z"
                      fill="url(#paint0_linear_132_6)"
                    ></path>
                    <defs>
                      <linearGradient
                        id="paint0_linear_132_6"
                        x1="10.1886"
                        y1="3.58836"
                        x2="1.77789"
                        y2="14.5609"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FFF558"></stop>
                        <stop offset="1" stopColor="#C88E07"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Platinum - 40% Discount"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="6"
                      cy="6"
                      r="6"
                      fill="url(#paint0_linear_132_4)"
                    ></circle>
                    <defs>
                      <linearGradient
                        id="paint0_linear_132_4"
                        x1="8.25"
                        y1="-6.37025e-08"
                        x2="2.4"
                        y2="12"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#00FFC2"></stop>
                        <stop offset="1" stopColor="#1A8D7F"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Diamond - 50% Discount"
                >
                  <svg
                    width="14"
                    height="12"
                    viewBox="0 0 14 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.491027 3.61207L2.42261 0.263997C2.51685 0.100643 2.6911 0 2.87969 0H10.942C11.1293 0 11.3025 0.0992148 11.3972 0.260719L13.3606 3.6082C13.4709 3.79617 13.4542 4.03257 13.3188 4.20325L7.28878 11.8004C7.07638 12.068 6.66957 12.0663 6.45941 11.7969L0.532074 4.2004C0.399858 4.03095 0.383622 3.79824 0.491027 3.61207Z"
                      fill="url(#paint0_linear_132_3)"
                    ></path>
                    <defs>
                      <linearGradient
                        id="paint0_linear_132_3"
                        x1="9.77425"
                        y1="-5.60737e-07"
                        x2="5.59034"
                        y2="11.2702"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#00D1FF"></stop>
                        <stop offset="1" stopColor="#007D99"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="my-4">
                <a
                  className=" text-white font-inter text-xs flex flex-row items-center gap-x-1 cursor-pointer"
                  href="https://docs.leap-blockchain.com/"
                  target="_blank"
                >
                  Learn More
                  <FaArrowRight size={12} color={"#fff"} />
                </a>
              </div>
              <div className="border-b border-gray-800  my-[20px]"></div>
              <div className="mt-[50px]">
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
                  <p>Dedicated Agent</p>
                </div>
              </div>
            </div>
            <div className="w-[25%] px-6 py-[20px] bg-[#37415133] rounded-tl-[24px] rounded-bl-[24px]">
              <div className=" flex flex-col justify-end">
                <div className="grow pb-4 mb-4 border-b border-slate-800">
                  <div className="text-base font-inter font-medium text-white pb-0.5">
                    Basic
                  </div>
                  <div className="mb-1">
                    <span className="text-lg font-inter font-medium text-slate-500">
                      $
                    </span>
                    <span className="text-3xl font-bold font-inter text-slate-50">
                      67
                    </span>
                    <span className="text-sm text-slate-600 font-inter font-medium">
                      /mo
                    </span>
                  </div>
                  <div className="text-slate-500 font-inter mw-12:text-[12px] text-[14px] font-normal">
                    For small traders just getting started.
                  </div>
                </div>
                <div className="pb-4 border-b border-slate-800">
                  <button
                    className="flex text-[16px] gap-2 flex-row h-[32px] text-black  items-center justify-center rounded-[50px] bg-darkPrimary font-medium font-inter cursor-pointer hover:bg-white w-full transition duration-150 ease-in-out group"
                    // href="https://hub.ligmanode.com/buy?plan=basic"
                  >
                    Get Started
                    <FaArrowRight size={12} color={"#000"} />
                  </button>
                </div>
              </div>
              <div className="mt-[73px]">
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
                  <p>200/10 secs</p>
                </div>
              </div>
              <div>
                <p className="pt-[20px] text-white font-inter font-medium text-[14px]">
                 100
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
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px]">
                  <p> &nbsp;</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px]">
                  <p> &nbsp;</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px]">
                  <p> &nbsp;</p>
                </div>
              </div>
              <div>
                <p className="pt-[20px] text-white font-inter font-medium text-[14px]">
                &nbsp;
                </p>

                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px]">
                  <p> &nbsp;</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px]">
                  <p> &nbsp;</p>
                </div>
              </div>
            </div>
            <div className="w-[25%]  px-4 py-[20px] bg-[#37415133] border border-[#e5e7eb]">
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
                    // href="https://hub.ligmanode.com/buy?plan=basic"
                  >
                    Get Started
                    <FaArrowRight size={12} color={"#000"} />
                  </button>
                </div>
              </div>
              <div className="mt-[73px]">
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
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px]">
                  <p>&nbsp;</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px]">
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
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px]">
                  <p>&nbsp;</p>
                </div>
              </div>
            </div>
            <div className="w-[25%]  px-6 py-[20px] bg-[#37415133] rounded-tr-[24px] rounded-br-[24px]">
              <div className=" flex flex-col justify-end">
                <div className="grow pb-4 mb-4 border-b border-slate-800">
                  <div className="text-base font-inter font-medium text-white pb-0.5">
                    God
                  </div>
                  <div className="mb-1">
                    <span className="text-lg font-inter font-medium text-slate-500">
                      $
                    </span>
                    <span className="text-3xl font-bold font-inter text-slate-50">
                      1349
                    </span>
                    <span className="text-sm text-slate-600 font-inter font-medium">
                      /mo
                    </span>
                  </div>
                  <div className="text-slate-500 mw-12:text-[12px] font-inter text-[14px] font-normal">
                    For botters looking to scale and maximize every snipe.
                  </div>
                </div>
                <div className="pb-4 border-b border-slate-800">
                  <button
                    className="flex text-[16px] gap-2 flex-row h-[32px] text-black  items-center justify-center rounded-[50px] bg-darkPrimary font-medium font-inter cursor-pointer hover:bg-white w-full transition duration-150 ease-in-out group"
                    // href="https://hub.ligmanode.com/buy?plan=basic"
                  >
                    Get Started
                    <FaArrowRight size={12} color={"#000"} />
                  </button>
                </div>
              </div>
              <div className="mt-[73px]">
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
                 6,000
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
              </div>
            </div>
          </div>
          <div className="hidden mw-10:flex flex-col gap-y-10">
            <div>
            <div className="flex items-center justify-center whitespace-nowrap">
                <div className="text-sm text-white font-medium font-inter mr-2">
                  Monthly
                </div>
                <div className="relative">
                  <input type="checkbox" id="toggle" className="peer sr-only" />
                  <label
                    htmlFor="toggle"
                    className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-slate-400 px-0.5 outline-slate-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-black before:shadow-sm before:transition-transform before:duration-150 peer-checked:bg-[#FAF5FF] peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-[#FAF5FF]"
                  >
                    <span className="sr-only">Pay Yearly</span>
                  </label>
                </div>
                <div className="text-sm text-white font-medium font-inter  ml-2">
                  Yearly <span className="text-darkPrimary">(-10%)</span>
                </div>
              </div>
              <div className="font-light font-inter text-slate-400 mt-6 leading-tight">
                Additional Discounts based on $Leap Staked
              </div>
              <div className="flex flex-row gap-1.5 mt-2">
                <div
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Bronze - 10% Discount"
                >
                  <svg
                    width="15"
                    height="12"
                    viewBox="0 0 15 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.541 0.560748C6.97266 -0.186915 8.05182 -0.186916 8.48348 0.560747L14.1167 10.3178C14.5484 11.0654 14.0088 12 13.1455 12H1.87903C1.0157 12 0.476121 11.0654 0.907784 10.3178L6.541 0.560748Z"
                      fill="url(#paint0_linear_132_10)"
                    ></path>
                    <defs>
                      <linearGradient
                        id="paint0_linear_132_10"
                        x1="11.9476"
                        y1="-0.135843"
                        x2="3.508"
                        y2="16.3738"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#EFE7D6"></stop>
                        <stop offset="1" stopColor="#BF8F67"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Silver - 20% Discount"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 1C0 0.447715 0.447715 0 1 0H11C11.5523 0 12 0.447715 12 1V11C12 11.5523 11.5523 12 11 12H1C0.447715 12 0 11.5523 0 11V1Z"
                      fill="url(#paint0_linear_132_8)"
                    ></path>
                    <defs>
                      <linearGradient
                        id="paint0_linear_132_8"
                        x1="9.25"
                        y1="2.84736e-07"
                        x2="2.45"
                        y2="10.7"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F3F3F3"></stop>
                        <stop offset="1" stopColor="#C6C6C6"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Gold - 30% Discount"
                >
                  <svg
                    width="14"
                    height="13"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.91583 0.908654C7.00265 0.641451 7.38067 0.641452 7.46749 0.908654L8.75441 4.86938C8.79324 4.98888 8.90459 5.06978 9.03024 5.06978H13.1948C13.4757 5.06978 13.5926 5.4293 13.3653 5.59444L9.99607 8.04231C9.89442 8.11616 9.85189 8.24707 9.89071 8.36656L11.1776 12.3273C11.2645 12.5945 10.9586 12.8167 10.7313 12.6515L7.36213 10.2037C7.26048 10.1298 7.12284 10.1298 7.02119 10.2037L3.65199 12.6515C3.4247 12.8167 3.11887 12.5945 3.20569 12.3273L4.49261 8.36656C4.53144 8.24707 4.4889 8.11616 4.38725 8.04231L1.01806 5.59444C0.790761 5.4293 0.907576 5.06978 1.18853 5.06978H5.35308C5.47873 5.06978 5.59009 4.98888 5.62891 4.86938L6.91583 0.908654Z"
                      fill="url(#paint0_linear_132_6)"
                    ></path>
                    <defs>
                      <linearGradient
                        id="paint0_linear_132_6"
                        x1="10.1886"
                        y1="3.58836"
                        x2="1.77789"
                        y2="14.5609"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FFF558"></stop>
                        <stop offset="1" stopColor="#C88E07"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Platinum - 40% Discount"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="6"
                      cy="6"
                      r="6"
                      fill="url(#paint0_linear_132_4)"
                    ></circle>
                    <defs>
                      <linearGradient
                        id="paint0_linear_132_4"
                        x1="8.25"
                        y1="-6.37025e-08"
                        x2="2.4"
                        y2="12"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#00FFC2"></stop>
                        <stop offset="1" stopColor="#1A8D7F"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Diamond - 50% Discount"
                >
                  <svg
                    width="14"
                    height="12"
                    viewBox="0 0 14 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.491027 3.61207L2.42261 0.263997C2.51685 0.100643 2.6911 0 2.87969 0H10.942C11.1293 0 11.3025 0.0992148 11.3972 0.260719L13.3606 3.6082C13.4709 3.79617 13.4542 4.03257 13.3188 4.20325L7.28878 11.8004C7.07638 12.068 6.66957 12.0663 6.45941 11.7969L0.532074 4.2004C0.399858 4.03095 0.383622 3.79824 0.491027 3.61207Z"
                      fill="url(#paint0_linear_132_3)"
                    ></path>
                    <defs>
                      <linearGradient
                        id="paint0_linear_132_3"
                        x1="9.77425"
                        y1="-5.60737e-07"
                        x2="5.59034"
                        y2="11.2702"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#00D1FF"></stop>
                        <stop offset="1" stopColor="#007D99"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <a
                  className=" text-white font-inter text-xs flex flex-row items-center gap-x-1 cursor-pointer"
                  href="https://docs.leap-blockchain.com/"
                  target="_blank"
                >
                  Learn More
                  <FaArrowRight size={12} color={"#fff"} />
                </a>
              </div> 
              </div>

              <div className=" px-6 py-[20px] bg-[#37415133] rounded-[24px]">
              <div className=" flex flex-col justify-end">
                <div className="grow pb-4 mb-4 border-b border-slate-800">
                  <div className="text-base font-inter font-medium text-white pb-0.5">
                    Basic
                  </div>
                  <div className="mb-1">
                    <span className="text-lg font-inter font-medium text-slate-500">
                      $
                    </span>
                    <span className="text-3xl font-bold font-inter text-slate-50">
                      67
                    </span>
                    <span className="text-sm text-slate-600 font-inter font-medium">
                      /mo
                    </span>
                  </div>
                  <div className="text-slate-500 font-inter mw-12:text-[12px] text-[14px] font-normal">
                    For small traders just getting started.
                  </div>
                </div>
                <div className="pb-4 border-b border-slate-800">
                  <button
                    className="flex text-[16px] gap-2 flex-row h-[32px] text-black  items-center justify-center rounded-[50px] bg-darkPrimary font-medium font-inter cursor-pointer hover:bg-white w-full transition duration-150 ease-in-out group"
                    // href="https://hub.ligmanode.com/buy?plan=basic"
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
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Unlimited Bandwidth</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Unlimited Request</p>
                </div>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>200/10 secs Rate Limit</p>
                </div>
              </div>
              <div>
                <p className="pt-[20px] text-white font-inter font-medium text-[14px]">
                Estimated TPS 100
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
              
              </div>
            
            </div>
            <div className=" px-4 py-[20px] bg-[#37415133] border border-[#e5e7eb] rounded-[24px]">
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
                    // href="https://hub.ligmanode.com/buy?plan=basic"
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
            </div>
            <div className=" px-6 py-[20px] bg-[#37415133] rounded-[24px]">
              <div className=" flex flex-col justify-end">
                <div className="grow pb-4 mb-4 border-b border-slate-800">
                  <div className="text-base font-inter font-medium text-white pb-0.5">
                    God
                  </div>
                  <div className="mb-1">
                    <span className="text-lg font-inter font-medium text-slate-500">
                      $
                    </span>
                    <span className="text-3xl font-bold font-inter text-slate-50">
                      1349
                    </span>
                    <span className="text-sm text-slate-600 font-inter font-medium">
                      /mo
                    </span>
                  </div>
                  <div className="text-slate-500 mw-12:text-[12px] font-inter text-[14px] font-normal">
                    For botters looking to scale and maximize every snipe.
                  </div>
                </div>
                <div className="pb-4 border-b border-slate-800">
                  <button
                    className="flex text-[16px] gap-2 flex-row h-[32px] text-black  items-center justify-center rounded-[50px] bg-darkPrimary font-medium font-inter cursor-pointer hover:bg-white w-full transition duration-150 ease-in-out group"
                    // href="https://hub.ligmanode.com/buy?plan=basic"
                  >
                    Get Started
                    <FaArrowRight size={12} color={"#000"} />
                  </button>
                </div>
              </div>
              <div className="mt-[73px]">
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
                <span className="text-white" >Estimated TPS </span>  6,000
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
                  <p>Dedicated Agent</p>
                </div>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </section>
  );
};

export default NodePricing;
