
import { LuAsterisk} from "react-icons/lu";

const HeroSection = () => {
  return (
    <div className="relative mt-[100px] min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/assets/home/hero-section/bg.png')] bg-cover bg-center transform scale-125 transition-transform duration-1000  -z-10"></div>

      {/* Content */}
      <div className="relative flex flex-col h-full z-10">
        <div className="flex flex-col justify-center items-center px-8 space-y-4 ">
          <h1 className="text-white mw-8:text-[34px] mw-12:text-[53px] text-[65px] font-inter text-center font-medium">
            Leap <span className="text-darkPrimary">Ahead</span> Of Your
            Competition
          </h1>
          <p className="text-[#C6C7C6] text-[16px] mw-8:text-[14px] text-center font-inter">
            You Deserve Seamless Trading Without Limits
          </p>
        </div>

        <div className="flex flex-col items-center justify-center mt-[70px]">
          <div className="w-[150px] h-[34px] bg-[#131412] rounded-[40px] border border-[#07210a] flex flex-row gap-x-1 justify-center items-center">
            <LuAsterisk size={14} color={"#37f94e"} />
            <p className="text-[14px]   mw-12:text-[12px] font-inter text-darkPrimary">
              HOW IT WORKS
            </p>
          </div>
          <p className="text-white text-[60px] mw-12:text-[42px] mw-8:text-[36px] font-inter font-medium mt-[5px]">
            Why Us?
          </p>
        </div>
        <div className="flex flex-wrap mt-[30px] gap-[24px]">
          <div className="w-[23%] mw-8:w-[100%] mw-8:h-[180px]  mw-12:w-[48%] h-[300px] mw-12:h-[220px] bg-[#131412] rounded-[12px] p-[24px]">
            <p className="text-[24px] font-inter font-medium text-white">
              Unmatched Speed
            </p>
            <p className="text-[16px] text-[#c5c6c5] font-inter mt-[15px]">
              Leap’s state-of-the-art infrastructure ensures industry-leading
              speed and performance, enabling you to execute trades seamlessly,
              even during periods of high network congestion on Solana.
            </p>
          </div>
          <div className="w-[23%] mw-8:w-[100%]  mw-12:w-[48%] mw-8:h-[180px] h-[300px] mw-12:h-[220px] bg-[#131412] rounded-[12px] p-[24px]">
            <p className="text-[24px] font-inter font-medium text-white">
            Proven Reliability
            </p>
            <p className="text-[16px] text-[#c5c6c5] font-inter mt-[15px]">
            Our advanced systems ensure consistent uptime and robust performance, enabling seamless trading experiences, optimised efficiency, and uninterrupted operations during critical moments.
            </p>
          </div>
          <div className="w-[23%] mw-8:w-[100%] mw-8:h-[180px]  mw-12:w-[48%] mw-12:h-[220px] h-[300px] bg-[#131412] rounded-[12px] p-[24px]">
            <p className="text-[24px] font-inter font-medium text-white">
            Expert Guidance
            </p>
            <p className="text-[16px] text-[#c5c6c5] font-inter mt-[15px]">
            Backed by a team of seasoned Solana experts, Leap delivers unparalleled support, simplifying complex processes for developers and traders while ensuring you can focus on what truly matters.
            </p>
          </div>
          <div className="w-[23%] mw-8:w-[100%]  mw-12:w-[48%] mw-8:h-[180px]  mw-12:h-[220px]  h-[300px] bg-[#131412] rounded-[12px] p-[24px]">
            <p className="text-[24px] font-inter font-medium text-white">
            Flexible Pricing
            </p>
            <p className="text-[16px] text-[#c5c6c5] font-inter mt-[15px]">
            Leap offers a pricing model tailored to your needs. With subscription-based plans for nodes and transaction-based fees for our trading bots, you pay only for the services you use.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-[150px]">
        <div className="w-[170px] h-[34px] bg-[#131412] rounded-[40px] border border-[#07210a] flex flex-row gap-x-1 justify-center items-center">
          <LuAsterisk size={14} color={"#37f94e"} />
          <p className="text-[14px] mw-12:text-[12px] font-inter text-darkPrimary">
            WHAT WE OFFER
          </p>
        </div>
        <p className="text-white text-[60px]  mw-8:text-[38px]  mw-12:text-[42px] font-inter font-medium mt-[5px]">
          Services
        </p>
      </div>
    
      </div>
    </div>
  );
};

export default HeroSection;
