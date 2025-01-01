import Image from "next/image";
import { LuAsterisk } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
const TelegramTadingBot = () => {
  return (
    <div className="mx-auto mt-[150px]">
      <div className="flex flex-row items-center justify-start gap-x-[80px]">
        <div>
          <Image
            src="/assets/home/telegram-trading-bot.jpg"
            height={422}
            width={535}
            alt="telegram trading bot"
            className="h-[422px] w-[535px] rounded-[10px]"
          />
        </div>
        <div>
          <div className="  w-[112px] h-[34px] bg-[#131412] rounded-[40px] border border-[#07210a] flex flex-row gap-x-1 justify-center items-center">
            <LuAsterisk size={14} color={"#37f94e"} />
            <p className="text-[14px] font-inter text-darkPrimary">SERVICES</p>
          </div>
          <p className="text-white text-[60px] font-inter font-medium mb-[60px] leading-[70px] mt-[20px]">
            Telegram <span className="text-darkPrimary">Trading</span><br/> Bot
          </p>
          <div className="flex flex-row gap-x-2 mb-[5px]">
            <FaCheck size={18} color={"#37f94e"} />
            <p className="text-[#C5C6C5] font-inter text-[14px]">
              Real Time Trade update
            </p>
          </div>
          <div className="flex flex-row gap-x-2 mb-[5px]">
            <FaCheck size={18} color={"#37f94e"} />
            <p className="text-[#C5C6C5] font-inter text-[14px]">
              Coin analysis
            </p>
          </div>
          <div className="flex flex-row gap-x-2 mb-[5px]">
            <FaCheck size={18} color={"#37f94e"} />
            <p className="text-[#C5C6C5] font-inter text-[14px]">
              Limit and Dca mode
            </p>
          </div>
          <div className="flex flex-row gap-x-2 mb-[15px]">
            <FaCheck size={18} color={"#37f94e"} />
            <p className="text-[#C5C6C5] font-inter text-[14px]">
              Copy Trading and more….
            </p>
          </div>
          <button className="w-[168px] h-[46px] bg-darkPrimary font-inter text-[#231F20] font-medium rounded-[50px] cursor-pointer hover:bg-white">
            Discover More
          </button>
        </div>
      </div>
    </div>
  );
};

export default TelegramTadingBot;
