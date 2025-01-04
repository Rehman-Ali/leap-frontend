'use client'

import Image from "next/image";
import Link from "next/link";


const Header = () => {
 

  return (
    <header>
        <div className="mt-[20px] border border-[#20211f] bg-[#07080699] rounded-[50px]  flex flex-row items-center  justify-between px-[130px] py-[16px] backdrop-blur-[10px] opacity-[1px]">
          <Image
          src="/assets/layout/logo.png"
          height={45}
          width={133}
          className="h-[45px] w-[133px] cursor-pointer"
          alt="leap logo"
          />
          <div className="flex flex-row gap-x-10">
            <Link className="text-white font-inter text-[16px] font-medium cursor-pointer hover:text-darkPrimary" href="/telegram-bot">Telegram Bot</Link>      
            <Link className="text-white font-inter text-[16px] font-medium cursor-pointer hover:text-darkPrimary" href="/node">Node</Link>      
            <Link className="text-white font-inter text-[16px] font-medium cursor-pointer hover:text-darkPrimary" href="/arb-bot">Arb Bot</Link>      
          </div>
          <button className="w-[168px] h-[46px] bg-darkPrimary font-inter text-[#231F20] font-medium rounded-[50px] cursor-pointer hover:bg-white">
            Join Our Discord
          </button>
          </div>       
    </header>
  );
};

export default Header;
