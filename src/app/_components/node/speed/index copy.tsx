import Image from "next/image";
import { LuAsterisk } from "react-icons/lu";

const NodeSpeedComponent = () => {
  return (
    <div className="mx-auto my-[150px]">

      <div className="flex flex-row items-center justify-between mt-[30px]">
        <div>
          <div className="  w-[112px] h-[34px] bg-[#131412] rounded-[40px] border border-[#07210a] flex flex-row gap-x-2 justify-center items-center">
            <LuAsterisk size={14} color={"#37f94e"} />
            <p className="text-[14px]  mw-12:text-[12px] font-inter text-darkPrimary">SPEEDS</p>
          </div>

          <p className="w-[600px] text-white text-[52px] font-inter font-medium leading-[70px] mt-[50px]">
            Could Put <span className="text-darkPrimary">Something</span> About The Speeds <span className="text-darkPrimary">Here</span>?
          </p>
          <p className="text-white font-inter text-[16px] max-w-[500px] my-[20px]">
            Whack a cool graphic next to it?
          </p>

          <div className="flex flex-row items-center justify-start gap-x-[100px]">
            <div>
              <p className="text-[16px] font-inter font-medium text-[#C6C7C6]">Average landing time</p>
              <p className="text-[32px] text-white font-inter font-semibold">671ms</p>
            </div>
            <div>
              <p className="text-[16px] font-inter font-medium text-[#C6C7C6]">Average Response Time</p>
              <p className="text-[32px] text-white font-inter font-semibold">1.365ms</p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-x-[30px] mt-[20px]">
            <div>
              <p className="text-[16px] font-inter font-medium text-[#C6C7C6]">Staked</p>
              <p className="text-[32px] text-white font-inter font-semibold">200,000+ SOL</p>
            </div>
            <div>
              <p className="text-[16px] font-inter font-medium text-[#C6C7C6]">TPS</p>
              <p className="text-[32px] text-white font-inter font-semibold">Unlimited</p>
            </div>
          </div>
        </div>
        <div>
          <Image
            src="/assets/node/speed.jpg"
            height={570}
            width={600}
            alt="telegram trading bot"
            className="h-[570px] w-[600px] rounded-[10px]"
          />
        </div>
      </div>
    </div>
  );
};

export default NodeSpeedComponent;
