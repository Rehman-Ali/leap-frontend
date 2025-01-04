import Image from "next/image";
import { LuAsterisk } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
const Services = () => {
  return (
    <div className="mx-auto">
    
      <div className="flex mw-8:flex-col  flex-row  justify-between mt-[30px]">
        <div>
          <div className="  w-[112px] h-[34px] bg-[#131412] rounded-[40px] border border-[#07210a] flex flex-row gap-x-1 justify-center items-center">
            <LuAsterisk size={14} color={"#37f94e"} />
            <p className="text-[14px]  mw-12:text-[12px] font-inter text-darkPrimary">SERVICES</p>
          </div>

          <p className="text-white  mw-12:text-[42px] mw-8:text-[36px] text-[60px] font-inter font-medium mw-8:mt-[20px] mw-8:leading-[36px] leading-[70px] mt-[10px]">
            VPS Rental
          </p>
          <p className="text-[#C5C6C5] font-inter text-[16px]  mw-8:max-w-[100%] max-w-[500px] my-[20px]">
            Unparalleled speed, reliability, and unlimited transactions per
            second (TPS). Optimise your botting with the fastest node on the
            Solana blockchain.
          </p>
          <div className="flex flex-row gap-x-2 mb-[10px]">
            <FaCheck size={18} color={"#37f94e"} />
            <p className="text-[#C5C6C5] font-inter text-[14px]">Staked node</p>
          </div>
          <div className="flex flex-row gap-x-2 mb-[10px]">
            <FaCheck size={18} color={"#37f94e"} />
            <p className="text-[#C5C6C5] font-inter text-[14px]">
              IP authorization
            </p>
          </div>
          <div className="flex flex-row gap-x-2 mb-[10px]">
            <FaCheck size={18} color={"#37f94e"} />
            <p className="text-[#C5C6C5] font-inter text-[14px]">GRPC</p>
          </div>
          <div className="flex flex-row gap-x-2 mb-[15px]">
            <FaCheck size={18} color={"#37f94e"} />
            <p className="text-[#C5C6C5] font-inter text-[14px]">
            Bloxroute BDM
            </p>
          </div>
          <div className="flex flex-row gap-x-2 mb-[15px]">
            <FaCheck size={18} color={"#37f94e"} />
            <p className="text-[#C5C6C5] font-inter text-[14px]">
            Jito Shred
            </p>
          </div>
          <button className="w-[168px]  mw-8:mb-[50px]   mw-12:w-[140px]  mw-12:text-[14px] h-[46px] bg-darkPrimary font-inter text-[#231F20] font-medium rounded-[50px] cursor-pointer hover:bg-white">
            Discover More
          </button>
        </div>
        <div>
          <Image
            src="/assets/home/services/services.jpg"
            height={460}
            width={535}
            alt="telegram trading bot"
            className="mw-8:h-[100%] mw-8:w-[100%] h-[460px] w-[535px] rounded-[15px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
