import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

const VPSPricing = () => {


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
        <div className="py-12 mw-6:py-[40px]">
          <div className="max-w-4xl mx-auto text-center pb-5 md:pb-5">
            <div>
              <div className="inline-flex text-[28px] mw-10:text-[22px] font-inter font-medium text-white pb-3">
                Pricing Plans
              </div>
            </div>
            {/* <h2 className="h2 font-inter text-[44px] mw-10:text-[32px] font-bold bg-clip-text bg-transparent text-white  pb-4">
              Flexible plans and features
            </h2>
            <p className="text-[18px] mw-10:text-[16px] font-inter text-white">
              In a competitive market where some node providers charge as much
              as 500 SOL, we prioritize affordability and flexibility. Our
              pricing plans are designed to meet the diverse needs of our
              clients, ensuring that you have access to secure and reliable
              nodes without the upcharge. 
            </p>*/}
          </div>
          <div className="mw-10:hidden flex flex-wrap items-center justify-center">
            <div className="w-[25%] px-6  py-[50px]">
              <div className="mt-[360px]">
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
                {/* <p className="pt-[20px] text-white font-inter font-medium text-[14px]">
                  Estimated TPS
                </p> */}
            
              </div>
              <div>
                <p className="pt-[20px] text-white font-inter font-medium text-[14px]">
                  Support
                </p>

                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px]">
                  <p>Premium Support</p>
                </div>
                {/* <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px]">
                  <p>Dedicated Agent</p>
                </div> */}
              </div>
            </div>
            <div className="w-[35%] px-6 py-[20px] bg-[#37415133] rounded-[24px] ">
              <div className=" flex flex-col justify-end">
                <div className="grow pb-4 mb-4 border-b border-slate-800">
                  <div className="text-base font-inter font-medium text-darkPrimary pb-0.5">
                    Leap VPS
                  </div>
                  <div className="mb-1 flex flex-row items-center gap-x-3">
                    <div className="flex flex-col items-start justify-start gap-y-3 mt-[5px]">
                      <p className="text-base pr-[10px] font-bold font-inter text-slate-50">
                        Windows
                      </p>
                      <p className="text-base pr-[10px] font-bold font-inter text-slate-50">
                        Linux
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="text-lg font-inter font-medium text-slate-500">
                          $
                        </span>
                        <span className="text-3xl font-bold font-inter text-slate-50">
                          80
                        </span>
                        <span className="text-sm text-slate-600 font-inter font-medium">
                          /mo
                        </span>
                      </p>
                      <p>
                        <span className="text-lg font-inter font-medium text-slate-500">
                          $
                        </span>
                        <span className="text-3xl font-bold font-inter text-slate-50">
                          60
                        </span>
                        <span className="text-sm text-slate-600 font-inter font-medium">
                          /mo
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="text-slate-500 mb-1 font-inter mw-12:text-[12px] text-[14px] font-normal">
                    <p>Specs:</p>
                    <p>4x 4GHz + CPU Cores</p>
                    <p>16GB of RAM + 435GB PURE SSD</p>
                  </div>
                  <div className="text-slate-500 mb-1 font-inter mw-12:text-[12px] text-[14px] font-normal">
                    <p>Locations:</p>
                    <p><span>Dallas - TX,</span><span className="pr-[10px] pl-[10px]">Charlotte - NC,</span><span>AMS - Netherlands</span></p>
                    <p><span>Bend - OR,</span><span className="pr-[10px] pl-[10px]">Latham - NY,</span><span>FRS - France</span></p>
                    <p><span>Ashburn - VA,</span><span className="pr-[10px] pl-[10px]">Staten Island - NY,</span><span>VA - Virginia</span></p>
                   
                  </div>
                  
                </div>
                <div className="pb-4 border-b border-slate-800">
                  <Link href="/buy-vps">
                    <button
                      className="flex text-[16px] gap-2 flex-row h-[32px] text-black  items-center justify-center rounded-[50px] bg-darkPrimary font-medium font-inter cursor-pointer hover:bg-white w-full transition duration-150 ease-in-out group"
                      // href="https://hub.ligmanode.com/buy?plan=basic"
                    >
                      Get Started
                      <FaArrowRight size={12} color={"#000"} />
                    </button>
                  </Link>
                </div>
              </div>
              <div className="mt-[40px]">
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
                  <p>Unlimited</p>
                </div>
              </div>
              <div>
                {/* <p className="pt-[20px] text-white font-inter font-medium text-[14px]">
                  100
                </p> */}
               
              </div>
              <div>
                <p className="pt-[20px] text-white font-inter font-medium text-[14px]">
                  &nbsp;
                </p>

                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center">
                <FaCheck size={14} color={"#fff"} />
                  <p> &nbsp;</p>
                </div>
                
              </div>
            </div>
           
          </div>
          <div className="hidden mw-10:flex flex-col gap-y-10">
            

            <div className=" px-6  py-[20px] bg-[#37415133] rounded-[24px]">
              <div className=" flex flex-col justify-end">
                <div className="grow pb-4 mb-4 border-b border-slate-800">
                  <div className="text-base font-inter font-medium text-darkPrimary pb-0.5">
                  Leap VPS
                  </div>
                  <div className="mb-1 flex flex-row items-center gap-x-3">
                    <div className="flex flex-col items-start justify-start gap-y-3 mt-[5px]">
                      <p className="text-base pr-[10px] font-bold font-inter text-slate-50">
                        Windows
                      </p>
                      <p className="text-base pr-[10px] font-bold font-inter text-slate-50">
                        Linux
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="text-lg font-inter font-medium text-slate-500">
                          $
                        </span>
                        <span className="text-3xl font-bold font-inter text-slate-50">
                          80
                        </span>
                        <span className="text-sm text-slate-600 font-inter font-medium">
                          /mo
                        </span>
                      </p>
                      <p>
                        <span className="text-lg font-inter font-medium text-slate-500">
                          $
                        </span>
                        <span className="text-3xl font-bold font-inter text-slate-50">
                          60
                        </span>
                        <span className="text-sm text-slate-600 font-inter font-medium">
                          /mo
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="text-slate-500 mb-1 font-inter mw-12:text-[12px] text-[14px] font-normal">
                    <p>Specs:</p>
                    <p>4x 4GHz + CPU Cores</p>
                    <p>16GB of RAM + 435GB PURE SSD</p>
                  </div>
                  <div className="text-slate-500 mb-1 font-inter mw-12:text-[12px] text-[14px] font-normal">
                    <p>Locations:</p>
                    <p><span>Dallas - TX,</span><span className="pr-[10px] pl-[10px]">Charlotte - NC,</span><span>AMS - Netherlands</span></p>
                    <p><span>Bend - OR,</span><span className="pr-[10px] pl-[10px]">Latham - NY,</span><span>FRS - France</span></p>
                    <p><span>Ashburn - VA,</span><span className="pr-[10px] pl-[10px]">Staten Island - NY,</span><span>VA - Virginia</span></p>
                   
                  </div>
                </div>
                <div className="pb-4 border-b border-slate-800">
                  <Link href="/buy-vps">
                    <button
                      className="flex text-[16px] gap-2 flex-row h-[32px] text-black  items-center justify-center rounded-[50px] bg-darkPrimary font-medium font-inter cursor-pointer hover:bg-white w-full transition duration-150 ease-in-out group"
                      // href="https://hub.ligmanode.com/buy?plan=basic"
                    >
                      Get Started
                      <FaArrowRight size={12} color={"#000"} />
                    </button>
                  </Link>
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
                  <p>Unlimited Rate Limit</p>
                </div>
              </div>
              <div>
                {/* <p className="pt-[20px] text-white font-inter font-medium text-[14px]">
                  Estimated TPS 100
                </p> */}
                <p className="pt-[30px] text-white font-inter font-medium text-[14px]">
                  Support
                </p>
                <div className="border-b border-gray-800 py-[10px] text-slate-400 font-inter text-[14px] flex flex-row items-center gap-x-3">
                  <FaCheck size={14} color={"#fff"} />
                  <p>Premium Support</p>
                </div>
              </div>
            </div>
            {/* <div className=" px-4 py-[20px] bg-[#37415133] border border-[#e5e7eb] rounded-[24px]">
              <div className=" flex flex-col justify-end">
                <div className="grow pb-4 mb-4 border-b border-slate-800">
                  <div className="text-base font-inter font-medium text-white pb-0.5">
                    Pro
                  </div>
                  <div className="mb-1 flex flex-row items-center gap-x-3">
                    <div className="flex flex-col items-start justify-start gap-y-3 mt-[5px]">
                      <p className="text-base pr-[10px] font-bold font-inter text-slate-50">
                        Windows
                      </p>
                      <p className="text-base pr-[10px] font-bold font-inter text-slate-50">
                        Linux
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="text-lg font-inter font-medium text-slate-500">
                          $
                        </span>
                        <span className="text-3xl font-bold font-inter text-slate-50">
                          80
                        </span>
                        <span className="text-sm text-slate-600 font-inter font-medium">
                          /mo
                        </span>
                      </p>
                      <p>
                        <span className="text-lg font-inter font-medium text-slate-500">
                          $
                        </span>
                        <span className="text-3xl font-bold font-inter text-slate-50">
                          60
                        </span>
                        <span className="text-sm text-slate-600 font-inter font-medium">
                          /mo
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="text-slate-500 mb-1 font-inter mw-12:text-[12px] text-[14px] font-normal">
                    <p>Specs:</p>
                    <p>4x 4GHz + CPU Cores</p>
                    <p>16GB of RAM + 435GB PURE SSD</p>
                  </div>
                  <div className="text-slate-500 mw-12:text-[12px] font-inter text-[14px] font-normal">
                    For botters with moderate transaction and performance needs.
                  </div>
                </div>
                <div className="pb-4 border-b border-slate-800">
                  <Link href="/buy">
                    <button
                      className="flex text-[16px] gap-2 flex-row h-[32px] text-black  items-center justify-center rounded-[50px] bg-darkPrimary font-medium font-inter cursor-pointer hover:bg-white w-full transition duration-150 ease-in-out group"
                      // href="https://hub.ligmanode.com/buy?plan=basic"
                    >
                      Get Started
                      <FaArrowRight size={12} color={"#000"} />
                    </button>
                  </Link>
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
                  <span className="text-white">Estimated TPS </span> 1,000
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
                  <div className="mb-1 flex flex-row items-center gap-x-3">
                    <div className="flex flex-col items-start justify-start gap-y-3 mt-[5px]">
                      <p className="text-base pr-[10px] font-bold font-inter text-slate-50">
                        Windows
                      </p>
                      <p className="text-base pr-[10px] font-bold font-inter text-slate-50">
                        Linux
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="text-lg font-inter font-medium text-slate-500">
                          $
                        </span>
                        <span className="text-3xl font-bold font-inter text-slate-50">
                          80
                        </span>
                        <span className="text-sm text-slate-600 font-inter font-medium">
                          /mo
                        </span>
                      </p>
                      <p>
                        <span className="text-lg font-inter font-medium text-slate-500">
                          $
                        </span>
                        <span className="text-3xl font-bold font-inter text-slate-50">
                          60
                        </span>
                        <span className="text-sm text-slate-600 font-inter font-medium">
                          /mo
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="text-slate-500 mb-1 font-inter mw-12:text-[12px] text-[14px] font-normal">
                    <p>Specs:</p>
                    <p>4x 4GHz + CPU Cores</p>
                    <p>16GB of RAM + 435GB PURE SSD</p>
                  </div>
                  <div className="text-slate-500 mw-12:text-[12px] font-inter text-[14px] font-normal">
                    For botters looking to scale and maximize every snipe.
                  </div>
                </div>
                <div className="pb-4 border-b border-slate-800">
                  <Link href="/buy">
                    <button
                      className="flex text-[16px] gap-2 flex-row h-[32px] text-black  items-center justify-center rounded-[50px] bg-darkPrimary font-medium font-inter cursor-pointer hover:bg-white w-full transition duration-150 ease-in-out group"
                      // href="https://hub.ligmanode.com/buy?plan=basic"
                    >
                      Get Started
                      <FaArrowRight size={12} color={"#000"} />
                    </button>
                  </Link>
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
                  <p>Dedicated Agent</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VPSPricing;
