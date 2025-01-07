"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="mx-[10px] mt-[20px] border border-[#20211f] bg-[#07080699] rounded-[50px] flex flex-row items-center justify-between px-[30px] lg:px-[130px] py-[16px] backdrop-blur-[10px] opacity-[1px]">
        <Link
          className="text-white font-inter text-[16px] font-medium cursor-pointer hover:text-darkPrimary"
          href="/"
        >
          <Image
            src="/assets/layout/logo.png"
            height={45}
            width={133}
            className="h-[45px] w-[133px] cursor-pointer"
            alt="leap logo"
          />
        </Link>
        {/* Desktop Links */}
        <div className="hidden lg:flex flex-row gap-x-10">
          <Link
            className="text-white font-inter text-[16px] font-medium cursor-pointer hover:text-darkPrimary"
            href="/telegram-bot"
          >
            Telegram Bot
          </Link>
          <Link
            className="text-white font-inter text-[16px] font-medium cursor-pointer hover:text-darkPrimary"
            href="/node"
          >
            Node
          </Link>
          <Link
            className="text-white font-inter text-[16px] font-medium cursor-pointer hover:text-darkPrimary"
            href="/arb-bot"
          >
            Arb Bot
          </Link>
          <Link
            className="text-white font-inter text-[16px] font-medium cursor-pointer hover:text-darkPrimary"
            href="/rpc"
          >
            RPC
          </Link>
        </div>
        <Link
            className="text-white font-inter text-[16px] font-medium cursor-pointer hover:text-darkPrimary"
            href="/login"
          >
        <button className="hidden lg:block w-[168px]  mw-12:w-[150px]  mw-12:text-[14px] h-[46px] bg-darkPrimary font-inter text-[#231F20] font-medium rounded-[50px] cursor-pointer hover:bg-white">
          Dashboard
        </button>
        </Link>    
        {/* Mobile Menu Toggle */}
        <div
          className="lg:hidden text-white cursor-pointer text-[24px]"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <FaTimes className="" />
          ) : (
            <FaBars className="text-darkPrimary" />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#07080699] mt-2 rounded-[20px] p-5">
          <div className="flex flex-col items-center gap-y-5">
            <Link
              className="text-white font-inter text-[16px] font-medium cursor-pointer hover:text-darkPrimary"
              href="/telegram-bot"
              onClick={toggleMenu}
            >
              Telegram Bot
            </Link>
            <Link
              className="text-white font-inter text-[16px] font-medium cursor-pointer hover:text-darkPrimary"
              href="/node"
              onClick={toggleMenu}
            >
              Node
            </Link>
            <Link
              className="text-white font-inter text-[16px] font-medium cursor-pointer hover:text-darkPrimary"
              href="/arb-bot"
              onClick={toggleMenu}
            >
              Arb Bot
            </Link>
            <Link
              className="text-white font-inter text-[16px] font-medium cursor-pointer hover:text-darkPrimary"
              href="/rpc"
              onClick={toggleMenu}
            >
              RPC
            </Link>
            <button
              className="w-[168px] h-[46px]  mw-12:w-[150px]  mw-12:text-[14px]  bg-darkPrimary font-inter text-[#231F20] font-medium rounded-[50px] cursor-pointer hover:bg-white"
              onClick={toggleMenu}
            >
              Join Our Discord
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
