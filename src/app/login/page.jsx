"use client";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FullPageLoader from "../_components/loader";




const LoginPage = () => {
  const router = useRouter();
  const [loader, setLoader] = useState(true);
  const { setShowAuthFlow } = useDynamicContext();

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("role")
      : null;

  useEffect(() => {
    if(token !== null){
      router.replace(token === "admin" ? "/admin-dashboard" : "/dashboard");
      setTimeout(() =>{
        setLoader(false);
      }, 2000)
    }else{
      return setLoader(false);
    }
  }, []);

  return loader ? (
    <FullPageLoader />
  ) : (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-[30px]">
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
      </p>
      {/* <Link href="/dashboard" > */}
      <button
        onClick={() => setShowAuthFlow(true)}
        className="mt-5 px-8 py-3 bg-darkPrimary font-inter text-sm sm:text-base text-[#231F20] font-medium rounded-full cursor-pointer hover:bg-white transition duration-300"
      >
        Connect Here
      </button>
      {/* </Link> */}
    </div>
  );
};
export default LoginPage;
