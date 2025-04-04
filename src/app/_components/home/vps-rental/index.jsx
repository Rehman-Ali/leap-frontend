"use client";
import Image from "next/image";
import { LuAsterisk } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import { useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import Link from "next/link";

const VPSRental = () => {
  const sectionRef = useRef(null); // Ref for a div element
  const isVisible = useInView(sectionRef, { threshold: 0.4 });
  const [animationTriggered, setAnimationTriggered] = useState(false);

  // Trigger animation only once
  if (isVisible && !animationTriggered) {
    setAnimationTriggered(true);
  }

  return (
    <div className="mx-auto px-4 mw-6:mt-[70px] mt-[100px]" ref={sectionRef}>
      <div className="flex flex-col mw-8:flex-col-reverse md:flex-row items-center  mw-8:items-start justify-between gap-y-10 md:gap-x-[80px]">
        {/* Left Content (Image) */}
        <div
          className={`flex justify-center mw-8:w-full ${
            animationTriggered ? "animate__animated animate__fadeInLeft" : ""
          } `}
        >
          {/* <Image
            src="/assets/home/telegram-trading-bot.jpg"
            alt="Leap VPS Hosting - High Performance Virtual Private Servers for Crypto Trading with Low Latency"
            width={535}
            height={422}
            className=" mw-8:w-full w-[535px] h-auto rounded-[10px]"
          /> */}
        </div>

        {/* Right Content */}
        <div className="flex flex-col items-start text-left">
          {/* Badge */}
          <div
            className={`flex gap-x-1  items-center justify-center w-[112px] h-[34px] bg-[#131412] rounded-[40px] border border-[#07210a]`}
          >
            <LuAsterisk size={14} color={"#37f94e"} />
            <p className="text-[14px] mw-12:text-[12px] font-inter text-darkPrimary">
              SERVICES
            </p>
          </div>

          {/* Title */}
          <div className="text-start mt-[15px]">
            <h2 className="text-[32px] font-bold mb-4 text-white">VPS Rental</h2>
          
            <h3
            className={`text-[#C5C6C5] font-inter  text-[16px] mw-8:max-w-[100%] max-w-[500px] my-[20px] text-left`}
          >
               Experience lightning-fast trading with our high-performance VPS hosting. Our virtual private servers are hosted in the same rack as our nodes to provide the lowest possible latency for your trading operations
          </h3>
          </div>
          <h3
            className={`text-[#C5C6C5] font-inter  text-[16px] mw-8:max-w-[100%] max-w-[500px] my-[20px] text-left`}
          >
            Unlock the power of dedicated performance with our virtual private
            servers! Enjoy fast, secure, and reliable hosting with complete
            control over your environment. <Link href="/vps" className="text-darkPrimary hover:text-white">Learn more about our VPS hosting</Link>.
          </h3>
          <p
            className={`text-[#C5C6C5] font-inter $ text-[16px] mw-8:max-w-[100%] max-w-[500px] mb-[20px] text-left`}
          >
           Our affordable servers are also hosted in the same rack as our <Link href="/rpc" className="text-darkPrimary hover:text-white">RPC nodes</Link> to give our users the lowest latency we can! Check out our <Link href="/telegram-bot" className="text-darkPrimary hover:text-white">Telegram bot</Link> for real-time monitoring.
          </p>

          <div className="w-[100%]">
            <div>
              <p className=" text-[18px] font-inter font-medium text-darkPrimary">
                Location
              </p>
              <div className="flex flex-row gap-x-3">
                <div className="flex mt-[10px] gap-y-3 flex-col justify-start items-start">
                  <div
                    className={`flex gap-x-1  items-center justify-center w-auto px-[12px] h-[34px] bg-[#131412] rounded-[40px] border border-[#07210a]`}
                  >
                    <p className="text-[14px] mw-12:text-[10px] font-inter text-white">
                      Dallas, TX
                    </p>
                  </div>
                  <div
                    className={`flex gap-x-1  items-center justify-centerw-auto px-[12px] h-[34px] bg-[#131412] rounded-[40px] border border-[#07210a]`}
                  >
                    <p className="text-[14px] mw-12:text-[10px] font-inter text-white">
                      Bend, OR
                    </p>
                  </div>

                  <div
                    className={`flex gap-x-1  items-center justify-centerw-auto px-[12px] h-[34px] bg-[#131412] rounded-[40px] border border-[#07210a]`}
                  >
                    <p className="text-[14px] mw-12:text-[10px] font-inter text-white">
                      Ashburn, VA
                    </p>
                  </div>
                </div>
                <div className="flex  mt-[10px] flex-col  gap-y-3 justify-start items-start">
                  <div
                    className={`flex gap-x-1  items-center justify-centerw-auto px-[12px] h-[34px] bg-[#131412] rounded-[40px] border border-[#07210a]`}
                  >
                    <p className="text-[14px] mw-12:text-[10px] font-inter text-white">
                      Charlotte, NC
                    </p>
                  </div>
                  <div
                    className={`flex gap-x-1  items-center justify-centerw-auto px-[12px] h-[34px] bg-[#131412] rounded-[40px] border border-[#07210a]`}
                  >
                    <p className="text-[14px] mw-12:text-[10px] font-inter text-white">
                      Latham, NY
                    </p>
                  </div>
                  <div
                    className={`flex gap-x-1 items-center justify-centerw-auto px-[12px] h-[34px] bg-[#131412] rounded-[40px] border border-[#07210a]`}
                  >
                    <p className="text-[14px] mw-12:text-[10px] font-inter text-white">
                      Staten Island, NY
                    </p>
                  </div>
                </div>
                <div className="flex mt-[10px] flex-col gap-y-3 justify-start items-start">
                  <div
                    className={`flex gap-x-1  items-center justify-centerw-auto px-[12px] h-[34px] bg-[#131412] rounded-[40px] border border-[#07210a]`}
                  >
                    <p className="text-[14px] mw-12:text-[10px] font-inter text-white">
                      AMS - Netherlands
                    </p>
                  </div>
                  <div
                    className={`flex gap-x-1  items-center justify-centerw-auto px-[12px] h-[34px] bg-[#131412] rounded-[40px] border border-[#07210a]`}
                  >
                    <p className="text-[14px] mw-12:text-[10px] font-inter text-white">
                      FRS - France
                    </p>
                  </div>
                  <div
                    className={`flex gap-x-1  items-center justify-centerw-auto px-[12px] h-[34px] bg-[#131412] rounded-[40px] border border-[#07210a]`}
                  >
                    <p className="text-[14px] mw-12:text-[10px] font-inter text-white">
                      VA - Virginia
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex mt-[20px] mw-10:flex-col flex-row mw-10:items-start items-start justify-between w-[100%]">
                <div>
                  <p className=" text-[18px] font-inter font-medium text-darkPrimary">
                    Operating Systems
                  </p>
                  <p className="text-[16px] font-inter font-normal text-white">
                    Windows $80 per month
                  </p>
                  <p className="text-[16px] font-inter font-normal text-white">
                    Linux $60 per month
                  </p>
                </div>
                <div>
                  <p className="text-[18px] font-inter font-medium text-darkPrimary">
                    Specs
                  </p>
                  <p className="text-[16px] font-inter font-normal text-white">
                    4x 4GHz + CPU Cores
                  </p>
                  <p className="text-[16px] font-inter font-normal text-white">
                    16GB of RAM + 435GB PURE SSD
                  </p>
                  <p className="text-[16px] font-inter font-normal text-white"></p>
                </div>
              </div>

              <p className="pt-[10px] text-[18px] font-inter font-medium text-darkPrimary">
                Order Time
              </p>
              <p className="text-[16px] font-inter font-normal text-white">
                Our servers are typically ready within 24 hours
              </p>
            </div>
          </div>

          {/* Button */}
          <Link href="/buy-vps">
            <button
              className={`w-[120px] mw-12:w-[100px] mw-12:text-[14px] h-[46px]  bg-darkPrimary font-inter text-[#231F20] font-medium rounded-[50px] cursor-pointer hover:bg-white mt-[15px]`}
            >
              Order
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VPSRental;
