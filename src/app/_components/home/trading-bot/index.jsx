"use client";
import Image from "next/image";
import { LuAsterisk } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import { useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import Link from "next/link";

const TradingBot = () => {
  const sectionRef = useRef(null); // Ref for a div element
  const isVisible = useInView(sectionRef, { threshold: 0.4 });
  const [animationTriggered, setAnimationTriggered] = useState(false);

  // Trigger animation only once
  if (isVisible && !animationTriggered) {
    setAnimationTriggered(true);
  }
  return (
    <div className="mx-auto px-[15px] mt-[100px]" ref={sectionRef}>
      <div className="flex flex-col mw-8:items-start mw-8:flex-col md:flex-row items-center justify-between gap-y-10 md:gap-x-[80px]">
        {/* Left Content (Text) */}
        <div className="flex flex-col items-start text-left ">
          {/* Badge */}
          <div
            className={`flex ${
              animationTriggered ? "animate-slideIn" : ""
            } items-center justify-center w-[112px] h-[34px] bg-[#131412] rounded-[40px] border border-[#07210a]`}
          >
            <LuAsterisk size={14} color={"#37f94e"} />
            <p className="text-[14px] mw-12:text-[12px] font-inter text-darkPrimary">
              SERVICES
            </p>
          </div>

          {/* Title */}
          <p
            className={`text-white ${
              animationTriggered ? "animate-slideIn" : ""
            } text-[60px] mw-12:text-[42px] mw-8:text-[36px] font-inter font-medium leading-[70px] mw-8:leading-[40px] mt-[20px]`}
          >
            Trading Bot
          </p>
          <p
            className={`text-[#C5C6C5] ${
              animationTriggered ? "animate-slideIn" : ""
            } font-inter text-[16px] mw-8:max-w-[100%] max-w-[500px] my-[20px] text-left`}
          >
            Make profit 24/7 with our state of the art arbitrage bot.
          </p>
          {/* Features */}
          {[
            "Fully automated trading",
            "Identifies and capitalises on profitable opportunities",
            "Built for serious traders on the Solana blockchain",
            "Leverages unmatched speed and efficiency for maximum profitability",
          ].map((feature, index) => (
            <div
              key={index}
              className={`flex flex-row items-center gap-x-2 mb-[10px] ${
                animationTriggered ? "animate-slideIn" : ""
              }`}
            >
              <FaCheck size={18} color={"#37f94e"} />
              <p className="text-[#C5C6C5] font-inter text-[14px]">{feature}</p>
            </div>
          ))}

          {/* Button */}
          <Link href="/trading-bot">
            <button
              className={`w-[168px] ${
                animationTriggered ? "animate-slideIn" : ""
              } mw-12:w-[140px] mw-12:text-[14px] h-[46px] bg-darkPrimary font-inter text-[#231F20] font-medium rounded-[50px] cursor-pointer hover:bg-white mt-[15px]`}
            >
              Discover More
            </button>
          </Link>
        </div>

        {/* Right Content (Image) */}
        <div
          className={`flex justify-center mw-8:w-full ${
            animationTriggered ? "animate__animated animate__fadeInRight" : ""
          } `}
        >
          <Image
            src="/assets/home/arbitrage-bot.png"
            alt="Arbitrage Bot"
            width={535}
            height={460}
            className="mw-8:w-full w-[535px] h-auto rounded-[10px]"
          />
        </div>
      </div>
    </div>
  );
};

export default TradingBot;
