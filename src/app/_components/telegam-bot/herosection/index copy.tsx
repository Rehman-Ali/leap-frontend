import Image from "next/image";
import { LuAsterisk } from "react-icons/lu";

const TelegramHeroSection = () => {
  return (
    <div className="relative mt-[100px] min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/assets/home/hero-section/bg.png')] bg-cover bg-center transform scale-100 transition-transform duration-1000 -z-10"></div>

      {/* Content */}
      <div className="relative flex flex-col h-full z-10">
        <div className="flex flex-col justify-center items-center px-8 space-y-4">
          <h1 className="text-white  mw-8:text-[34px] mw-12:text-[53px] text-[65px] font-inter font-medium">
            Leap Telegram<span className="text-darkPrimary"> Bot</span>
          </h1>
          <p className="text-[#C6C7C6] mw-8:text-[14px] text-center text-[16px] font-inter]">
            Take your crypto trading to the next level with the Leap Telegram
            Bot, designed for speed, simplicity, and precision.
          </p>
          <button className=" w-[140px]  mw-12:w-[110px]  mw-12:text-[14px] h-[46px] bg-darkPrimary font-inter text-[#231F20] font-medium rounded-[50px] cursor-pointer hover:bg-white">
            Get Started
          </button>
        </div>

        {/* Features Section */}
        <div className="flex flex-col items-center justify-center mt-[70px]"></div>
        <div className="flex flex-wrap mt-[30px] gap-[24px]">
          <div className="flex flex-col  w-[32%]  mw-12:w-[48%] bg-[#131412] rounded-[12px] p-[24px]">
            <div className="flex flex-row items-center gap-x-[60px] justify-start">
              <Image
                src="/assets/telebot/telebot2.png"
                height={48}
                width={48}
                alt="feature logo"
              />
              <p className="text-[24px] text-white font-inter font-medium">
                Copy Trading
              </p>
            </div>
            <p className="pt-[5px] text-16 font-inter text-[#c6c7c6] text-center">
              Automatically follow the trades by your selected wallets.
            </p>
          </div>
          <div className="flex flex-col  w-[32%]  mw-12:w-[48%] bg-[#131412] rounded-[12px] p-[24px]">
            <div className="flex flex-row items-center gap-x-[40px] justify-start">
              <Image
                src="/assets/node/node1.png"
                height={48}
                width={48}
                alt="feature logo"
              />
              <p className="text-[24px] text-white font-inter font-medium">
                Limit & DCA Trades
              </p>
            </div>
            <p className="pt-[5px] text-16 font-inter text-[#c6c7c6] text-center">
              Plan your entries and exits with precision.
            </p>
          </div>
          <div className="flex flex-col  w-[32%]  mw-12:w-[48%] bg-[#131412] rounded-[12px] p-[24px]">
            <div className="flex flex-row items-center gap-x-[50px] justify-start">
              <Image
                src="/assets/telebot/telebot1.png"
                height={48}
                width={48}
                alt="feature logo"
              />
              <p className="text-[24px] text-white font-inter font-medium">
                Coin Analytics
              </p>
            </div>
            <p className="pt-[5px] text-16 font-inter text-[#c6c7c6] text-center">
              Automatically follow the trades by your selected wallets.
            </p>
          </div>
          <div className="flex flex-col  w-[32%]  mw-12:w-[48%] bg-[#131412] rounded-[12px] p-[24px]">
            <div className="flex flex-row items-center gap-x-[90px] justify-start">
              <Image
                src="/assets/node/node2.png"
                height={48}
                width={48}
                alt="feature logo"
              />
              <p className="text-[24px] text-white font-inter font-medium">
                Jito
              </p>
            </div>
            <p className="pt-[5px] text-16 font-inter text-[#c6c7c6] text-center">
              Execute trades at lightning speed during high-volume events.
            </p>
          </div>

          <div className="flex flex-col  w-[32%]  mw-12:w-[48%] bg-[#131412] rounded-[12px] p-[24px]">
            <div className="flex flex-row items-center gap-x-[60px] justify-start">
              <Image
                src="/assets/node/node3.png"
                height={48}
                width={48}
                alt="feature logo"
              />
              <p className="text-[24px] text-white font-inter font-medium">
                Bloxroute
              </p>
            </div>
            <p className="pt-[5px] text-16 font-inter text-[#c6c7c6] text-center">
              Land faster than ever before.
            </p>
          </div>
          <div className="flex flex-col  w-[32%]  mw-12:w-[48%] bg-[#131412] rounded-[12px] p-[24px]">
            <div className="flex flex-row items-center gap-x-[50px] justify-start">
              <Image
                src="/assets/telebot/telegram3.png"
                height={48}
                width={48}
                alt="feature logo"
              />
              <p className="text-[24px] text-white font-inter font-medium">
                MEV Protection
              </p>
            </div>
            <p className="pt-[5px] text-16 font-inter text-[#c6c7c6] text-center">
              Automatically follow the trades by your selected wallets
            </p>
          </div>
        </div>

        {/* Benchmark Section */}
        <div className="flex flex-row items-center justify-between my-[150px]">
          <div>
            <div className="  w-[112px] h-[34px] bg-[#131412] rounded-[40px] border border-[#07210a] flex flex-row gap-x-2 justify-center items-center">
              <LuAsterisk size={14} color={"#37f94e"} />
              <p className="text-[14px]  mw-12:text-[12px] font-inter text-darkPrimary">PRICING</p>
            </div>

            <p className=" text-white text-[55px] font-inter font-medium leading-[70px] mt-[50px]">
              Simple and<span className="text-darkPrimary"> Transparent</span><br/>
              Pricing
            </p>
            <p className="text-white font-inter text-[16px] max-w-[500px] my-[20px]">
            Free to Set Up: Get started at no cost.
            </p>
            <p className="text-white font-inter text-[16px] max-w-[500px] my-[20px]">
            Transaction-Based Fee: Pay only a small percentage on each transaction—no hidden fees.
            </p>
            <p className="text-white font-inter text-[16px] max-w-[500px] my-[20px]">
            Focused exclusively on Solana, we deliver unmatched performance.
            </p>

           
          </div>
          <div>
            <Image
              src="/assets/telebot/pricing.png"
              height={400}
              width={625}
              alt="telegram trading bot"
              className="h-[350px] w-[575px] rounded-[10px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelegramHeroSection;
