import Image from "next/image";
import { LuAsterisk } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";

const TelegramTradingBot = () => {
  return (
    <div className="mx-auto px-4 mt-[100px]">
      <div className="flex flex-col mw-8:flex-col md:flex-row items-center  mw-8:items-start justify-between gap-y-10 md:gap-x-[80px]">
        {/* Left Content (Image) */}
        <div className="flex justify-center mw-8:w-full">
          <Image
            src="/assets/home/telegram-trading-bot.jpg"
            alt="Telegram Trading Bot"
            width={535}
            height={422}
            className=" mw-8:w-full w-[535px] h-auto rounded-[10px]"
          />
        </div>

        {/* Right Content */}
        <div className="flex flex-col items-start text-left">
          {/* Badge */}
          <div className="flex gap-x-1 items-center justify-center w-[112px] h-[34px] bg-[#131412] rounded-[40px] border border-[#07210a]">
            <LuAsterisk size={14} color={"#37f94e"} />
            <p className="text-[14px] mw-12:text-[12px] font-inter text-darkPrimary">
              SERVICES
            </p>
          </div>

          {/* Title */}
          <p className="text-white mb-[10px] text-[60px] mw-12:text-[42px] mw-8:text-[36px] font-inter font-medium leading-[70px] mw-12:leading-[48px] mw-8:leading-[42px] mt-[20px]">
            Telegram <span className="text-darkPrimary">Trading </span>
            Bot
          </p>
          <p className="text-[#C5C6C5] font-inter text-[16px] mw-8:max-w-[100%] max-w-[500px] my-[20px] text-left">
          Simplified trading, faster than ever before.
          </p>
          {/* Features */}
          {[
            "Real Time Trade update",
            "Coin analysis",
            "Limit and DCA mode",
            "Copy Trading and more….",
          ].map((feature, index) => (
            <div
              key={index}
              className="flex flex-row items-left gap-x-2 mb-[10px]"
            >
              <FaCheck size={18} color={"#37f94e"} />
              <p className="text-[#C5C6C5] font-inter text-[14px]">
                {feature}
              </p>
            </div>
          ))}

          {/* Button */}
          <button className="w-[168px] mw-12:w-[140px] mw-12:text-[14px] h-[46px] bg-darkPrimary font-inter text-[#231F20] font-medium rounded-[50px] cursor-pointer hover:bg-white mt-[15px]">
            Discover More
          </button>
        </div>
      </div>
    </div>
  );
};

export default TelegramTradingBot;
