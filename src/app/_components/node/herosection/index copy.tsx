import Image from "next/image";

const NodeHeroSection = () => {
  return (
    <div className="relative mt-[100px] min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/assets/home/hero-section/bg.png')] bg-cover bg-center transform scale-125 transition-transform duration-1000 -z-10"></div>

      {/* Content */}
      <div className="relative flex flex-col h-full z-10">
        <div className="flex flex-col justify-center items-center px-8 space-y-4">
          <h1 className="text-white mw-8:text-[34px] mw-12:text-[53px]  text-[65px] font-inter font-medium">
            Leap <span className="text-darkPrimary">Node</span>
          </h1>
          <p className="text-[#C6C7C6] text-[16px] font-inter font-bold">
            Land transactions faster and more consistently than ever before
          </p>
        </div>

        {/* Features Section */}
        <div className="flex flex-col items-center justify-center mt-[70px]">
          <p className="text-white  mw-12:text-[42px] mw-8:text-[36px] text-[60px] font-inter font-medium mt-[5px]">
            Features
          </p>
        </div>
        <div className="flex flex-wrap mt-[30px] gap-[24px]">
          <div className="flex flex-row items-center gap-x-[60px] justify-start w-[23%] bg-[#131412] rounded-[12px] p-[24px]">
            <Image
              src="/assets/node/node1.png"
              height={48}
              width={48}
              alt="feature logo"
            />
            <p className="text-[24px] text-white font-inter font-medium">
              GRPC
            </p>
          </div>
          <div className="flex flex-row items-center gap-x-[40px] justify-start w-[23%] bg-[#131412] rounded-[12px] p-[24px]">
            <Image
              src="/assets/node/node2.png"
              height={52}
              width={52}
              alt="feature logo"
            />
            <p className="text-[24px] text-white font-inter font-medium">
              JitoShred
            </p>
          </div>
          <div className="flex flex-row items-center gap-x-[10px] justify-start w-[24%] bg-[#131412] rounded-[12px] p-[24px]">
            <Image
              src="/assets/node/node3.png"
              height={48}
              width={48}
              alt="feature logo"
            />
            <p className="text-[24px] text-white font-inter font-medium">
              Bloxroute BDM
            </p>
          </div>
          <div className="flex flex-row items-center gap-x-[20px] justify-start w-[24%] bg-[#131412] rounded-[12px] p-[24px]">
            <Image
              src="/assets/node/node1.png"
              height={48}
              width={48}
              alt="feature logo"
            />
            <p className="text-[24px] text-white font-inter font-medium">
              Unlimited TPS
            </p>
          </div>
        </div>

        {/* Benchmark Section */}
        <div className="flex flex-col items-center justify-center mt-[100px]">
          <p className="text-[#C6C7C6] text-[16px] font-inter font-bold">
            Land transactions faster and more consistently than ever before
          </p>
          <button className="mt-[20px] w-[130px]  mw-12:w-[100px]  mw-12:text-[14px] h-[46px] bg-darkPrimary font-inter text-[#231F20] font-medium rounded-[50px] cursor-pointer hover:bg-white">
            Join Now
          </button>
          <p className="text-white text-[60px] font-inter font-medium mt-[5px]">
            Benchmark
          </p>
          <Image
            src="/assets/node/benchmark.jpg"
            height={600}
            width={1170}
            alt="benchmark logo"
            className="h-[600px] w-[90%] object-cover mt-[30px] rounded-[12px]"
          />
        </div>
      </div>
    </div>
  );
};

export default NodeHeroSection;
