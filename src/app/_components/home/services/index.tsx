"use client"
import Image from "next/image";
import { LuAsterisk } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import { useRef } from "react";
import { useInView } from "@/hooks/useInView";

const Services = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null); // Ref for a div element
  const isVisible = useInView(sectionRef, { threshold: 0.4 });
  return (
    <div className="mx-auto px-[15px]"
      ref={sectionRef}
    >

      {/* Header and Description */}
      <div className="flex flex-col  mw-8:items-start mw-8:flex-col mw-8:space-y-6 md:flex-row justify-between items-center mt-[30px] space-y-0">
        {/* Left Content */}
        <div className={`flex flex-col  items-start ${isVisible ? "animate-slideIn" : ""
          }`}>
          <div className="flex items-center justify-center w-[112px] h-[34px] bg-[#131412] rounded-[40px] border border-[#07210a]">
            <LuAsterisk size={14} color={"#37f94e"} />
            <p className="text-[14px] mw-12:text-[12px] font-inter text-darkPrimary">
              SERVICES
            </p>
          </div>

          <p className={`text-white ${isVisible ? "animate-slideIn" : ""
            } text-[60px] mw-12:text-[42px] mw-8:text-[36px] font-inter font-medium mt-[10px] mw-8:mt-[20px] leading-[70px] mw-8:leading-[40px] text-left`}>
            VPS Rental
          </p>
          <p className={`text-[#C5C6C5] ${isVisible ? "animate-slideIn" : ""
            } font-inter text-[16px] mw-8:max-w-[100%] max-w-[500px] my-[20px] text-left`}>
            Unparalleled speed, reliability, and unlimited transactions per
            second (TPS). Optimise your botting with the fastest node on the
            Solana blockchain.
          </p>

          {/* List Items */}
          {[
            "Staked node",
            "IP authorization",
            "GRPC",
            "Bloxroute BDM",
            "Jito Shred",
          ].map((item, index) => (
            <div key={index} className={`flex flex-row items-center ${isVisible ? "animate-slideIn" : ""
              } gap-x-2 mb-[10px]`}>
              <FaCheck size={18} color={"#37f94e"} />
              <p className="text-[#C5C6C5] font-inter text-[14px]">{item}</p>
            </div>
          ))}

          <button className={`w-[168px] ${isVisible ? "animate-slideIn" : ""
            }  mw-8:mb-[50px] mw-12:w-[140px] mw-12:text-[14px] h-[46px] bg-darkPrimary font-inter text-[#231F20] font-medium rounded-[50px] cursor-pointer hover:bg-white mt-[15px]`}>
            Discover More
          </button>
        </div>

        {/* Right Content */}
        <div className={`flex justify-center   mw-8:w-[100%] ${isVisible ? "animate__animated animate__fadeInRight" : ""} `}>
          <Image
            src="/assets/home/services/services.jpg"
            alt="VPS Rental Service"
            width={535}
            height={460}
            className="h-auto mw-8:w-full w-[535px] rounded-[15px]"
          />
        </div>
      </div>
    </div>

  );
};

export default Services;
