import Image from "next/image";
import { LuAsterisk } from "react-icons/lu";

const NodeSpeedComponent = () => {
  return (
    <div className="mx-auto my-[150px] px-4 max-w-7xl">
      <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-8">
        {/* Text Content */}
        <div className="lg:w-1/2">
          {/* Badge */}
          <div className="w-28 h-9 bg-[#131412] rounded-full border border-[#07210a] flex items-center justify-center gap-2">
            <LuAsterisk size={14} color={"#37f94e"} />
            <p className="text-sm font-inter text-darkPrimary">SPEEDS</p>
          </div>

          {/* Heading */}
          <p className="text-white text-3xl sm:text-4xl lg:text-5xl font-inter font-medium leading-tight mt-6">
            Could Put <span className="text-darkPrimary">Something</span> About The Speeds <span className="text-darkPrimary">Here</span>?
          </p>

          {/* Subheading */}
          <p className="text-white font-inter text-base sm:text-lg max-w-xl mt-4">
            Whack a cool graphic next to it?
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div>
              <p className="text-sm sm:text-base font-inter font-medium text-[#C6C7C6]">
                Average landing time
              </p>
              <p className="text-2xl sm:text-3xl text-white font-inter font-semibold">
                671ms
              </p>
            </div>
            <div>
              <p className="text-sm sm:text-base font-inter font-medium text-[#C6C7C6]">
                Average Response Time
              </p>
              <p className="text-2xl sm:text-3xl text-white font-inter font-semibold">
                1.365ms
              </p>
            </div>
            <div>
              <p className="text-sm sm:text-base font-inter font-medium text-[#C6C7C6]">
                Staked
              </p>
              <p className="text-2xl sm:text-3xl text-white font-inter font-semibold">
                200,000+ SOL
              </p>
            </div>
            <div>
              <p className="text-sm sm:text-base font-inter font-medium text-[#C6C7C6]">
                TPS
              </p>
              <p className="text-2xl sm:text-3xl text-white font-inter font-semibold">
                Unlimited
              </p>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-center   mw-8:w-[100%]">
          <Image
            src="/assets/node/speed.jpg"
            height={570}
            width={600}
            alt="telegram trading bot"
            className="mw-8:w-full w-lg h-auto rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default NodeSpeedComponent;
