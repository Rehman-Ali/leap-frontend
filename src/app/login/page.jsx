'use client'
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {

 const { setShowAuthFlow } = useDynamicContext();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* <div className="mb-[30px]">
        <Image
          src="/assets/logo1.png"
          height={80}
          width={180}
          alt="logo"
          className="h-[80px] w-auto"
        />
      </div>
      <p className="font-inter text-[16px] text-[#ffffff]">
        Select Wallet to Sign In to Leap
      </p> */}
      {/* <Link href="/dashboard" > */}
      <button 
       onClick={() => setShowAuthFlow(true)}
      className="mt-5 px-8 py-3 bg-darkPrimary font-inter text-sm sm:text-base text-[#231F20] font-medium rounded-full cursor-pointer hover:bg-white transition duration-300">
        Connect Here
      </button>
      {/* </Link> */}
    </div>
  );
};
export default LoginPage;
