import Image from "next/image";
import { LuAsterisk } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
const ArbitageBot = () => {
  return (
    <div className="mx-auto mt-[150px]">
      <div className="flex flex-row items-center justify-between">
      
        <div>
          <div className="  w-[112px] h-[34px] bg-[#131412] rounded-[40px] border border-[#07210a] flex flex-row gap-x-1 justify-center items-center">
            <LuAsterisk size={14} color={"#37f94e"} />
            <p className="text-[14px]  mw-12:text-[12px] font-inter text-darkPrimary">SERVICES</p>
          </div>
          <p className="text-white  mw-12:text-[42px] mw-8:text-[36px] text-[60px] font-inter font-medium mb-[60px] leading-[70px] mt-[20px]">
          Arbitrage Bot
          </p>
          <div className="flex flex-row gap-x-2 mb-[5px]">
            <FaCheck size={18} color={"#37f94e"} />
            <p className="text-[#C5C6C5] font-inter text-[14px]">
            Fully automated trading
            </p>
          </div>
          <div className="flex flex-row gap-x-2 mb-[5px]">
            <FaCheck size={18} color={"#37f94e"} />
            <p className="text-[#C5C6C5] font-inter text-[14px]">
            Identifies and capitalises on profitable opportunities
            </p>
          </div>
          <div className="flex flex-row gap-x-2 mb-[5px]">
            <FaCheck size={18} color={"#37f94e"} />
            <p className="text-[#C5C6C5] font-inter text-[14px]">
            Built for serious traders on the Solana blockchain
            </p>
          </div>
          <div className="flex flex-row gap-x-2 mb-[15px]">
            <FaCheck size={18} color={"#37f94e"} />
            <p className="text-[#C5C6C5] font-inter text-[14px]">
            Leverages unmatched speed and efficiency for maximum profitability
            </p>
          </div>
          <button className="w-[168px]  mw-12:w-[140px]  mw-12:text-[14px] h-[46px] bg-darkPrimary font-inter text-[#231F20] font-medium rounded-[50px] cursor-pointer hover:bg-white">
            Discover More
          </button>
        </div>
        <div>
          <Image
            src="/assets/home/arbitrage-bot.png"
            height={460}
            width={535}
            alt="telegram trading bot"
            className="h-[460px] w-[535px] rounded-[10px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ArbitageBot;
