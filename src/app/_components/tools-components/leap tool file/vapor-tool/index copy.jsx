"use client";


import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

const VaporToolScreen = () => {
  const { setShowAuthFlow } = useDynamicContext();

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/home/hero-section/bg.png')" }}
    >
      <div className="flex items-center justify-center min-h-screen ">
        <div className="flex flex-col items-center justify-center mw-4:w-[340px] mw-9:w-[360px] mw-5:w-[400px] w-[600px]">
          <h1 className="text-[45px] mw-7:text-[28px] text-center font-inter text-darkPrimary font-bold">
            Vapor
          </h1>
          <p className="text-[18px] mw-7:text-[16px] text-center font-inter text-white font-medium">
            powered by Leap
          </p>
          <p className="py-[20px] text-[16px] mw-7:text-[14px] text-center font-inter text-white font-normal">
            Vapor is a tool to close unused token accounts in your wallet. By
            closing these accounts, you will be refunded the SOL used to create
            them, which is 0.00204 SOL per account.
          </p>
          <button
            onClick={() => setShowAuthFlow(true)}
            className="mt-10 px-8 py-3 bg-darkPrimary font-inter text-sm sm:text-base text-[#231F20] font-semibold rounded-full cursor-pointer hover:bg-white transition duration-300"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default VaporToolScreen;
