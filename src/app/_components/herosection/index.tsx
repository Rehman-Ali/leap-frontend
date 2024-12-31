import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import { LuAsterisk, LuSquareAsterisk } from "react-icons/lu";

const HeroSection = () => {
  return (
    <div className="relative mt-[100px] h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/assets/home/hero-section/bg.png')] bg-cover bg-center transform scale-125 transition-transform duration-1000"></div>

      {/* Content */}
      <div className="relative flex flex-col h-full z-10">
        <div className="flex flex-col justify-center items-center px-8 space-y-4 ">
          <h1 className="text-white text-[65px] font-inter font-medium">
            Leap <span className="text-darkPrimary">Ahead</span> Of Your
            Competition
          </h1>
          <p className="text-[#C6C7C6] text-[16px] font-inter">
            You Deserve Seamless Trading Without Limits
          </p>
        </div>

        <div className="flex flex-col items-center justify-center mt-[70px]">
          <div className="w-[150px] h-[34px] bg-[#131412] rounded-[40px] border border-[#07210a] flex flex-row gap-x-1 justify-center items-center">
            <LuSquareAsterisk size={14} color={"#37f94e"} />
            <p className="text-[14px] font-inter text-darkPrimary">
              HOW IT WORKS
            </p>
          </div>
          <p className="text-white text-[60px] font-inter font-medium mt-[5px]">
            Why Us?
          </p>
        </div>
        <div className="flex flex-wrap mt-[30px] gap-[24px]">
          <div className="w-[23%] h-[300px] bg-[#131412] rounded-[12px] p-[24px]">
            <p className="text-[24px] font-inter font-medium text-white">
              Unmatched Speed
            </p>
            <p className="text-[16px] text-[#c5c6c5] font-inter mt-[15px]">
              Leap’s state-of-the-art infrastructure ensures industry-leading
              speed and performance, enabling you to execute trades seamlessly,
              even during periods of high network congestion on Solana.
            </p>
          </div>
          <div className="w-[23%] h-[300px] bg-[#131412] rounded-[12px] p-[24px]">
            <p className="text-[24px] font-inter font-medium text-white">
              Unmatched Speed
            </p>
            <p className="text-[16px] text-[#c5c6c5] font-inter mt-[15px]">
              Leap’s state-of-the-art infrastructure ensures industry-leading
              speed and performance, enabling you to execute trades seamlessly,
              even during periods of high network congestion on Solana.
            </p>
          </div>
          <div className="w-[23%] h-[300px] bg-[#131412] rounded-[12px] p-[24px]">
            <p className="text-[24px] font-inter font-medium text-white">
              Unmatched Speed
            </p>
            <p className="text-[16px] text-[#c5c6c5] font-inter mt-[15px]">
              Leap’s state-of-the-art infrastructure ensures industry-leading
              speed and performance, enabling you to execute trades seamlessly,
              even during periods of high network congestion on Solana.
            </p>
          </div>
          <div className="w-[23%] h-[300px] bg-[#131412] rounded-[12px] p-[24px]">
            <p className="text-[24px] font-inter font-medium text-white">
              Unmatched Speed
            </p>
            <p className="text-[16px] text-[#c5c6c5] font-inter mt-[15px]">
              Leap’s state-of-the-art infrastructure ensures industry-leading
              speed and performance, enabling you to execute trades seamlessly,
              even during periods of high network congestion on Solana.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-[150px]">
        <div className="w-[170px] h-[34px] bg-[#131412] rounded-[40px] border border-[#07210a] flex flex-row gap-x-1 justify-center items-center">
          <LuAsterisk size={14} color={"#37f94e"} />
          <p className="text-[14px] font-inter text-darkPrimary">
            WHAT WE OFFER
          </p>
        </div>
        <p className="text-white text-[60px] font-inter font-medium mt-[5px]">
          Services
        </p>
      </div>
    
      </div>
    </div>
  );
};

export default HeroSection;
