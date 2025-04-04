"use client";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const { setShowAuthFlow } = useDynamicContext();
  const toolsRef = useRef(null);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close tools dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        toolsRef.current &&
        !toolsRef.current.contains(event.target)
      ) {
        setIsToolsOpen(false);
      }
    };

    // Add event listener when tools dropdown is open
    if (isToolsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isToolsOpen]);

  // Close tools dropdown when pathname changes
  useEffect(() => {
    setIsToolsOpen(false);
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="relative z-50">
      <div className="mx-[10px] mt-[20px] border border-[#20211f] bg-[#07080699] rounded-[50px] flex flex-row items-center justify-between px-[30px] lg:px-[130px] py-[16px] backdrop-blur-[10px]">
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
        <div className="hidden lg:flex flex-row gap-x-10 items-center">
          <Link
            className="text-white font-inter text-[16px] font-medium cursor-pointer hover:text-darkPrimary"
            href="/telegram-bot"
          >
            Telegram Bot
          </Link>
          <Link
            className="text-white font-inter text-[16px] font-medium cursor-pointer hover:text-darkPrimary"
            href="/rpc"
          >
            RPC
          </Link>
          <Link
            className="text-white font-inter text-[16px] font-medium cursor-pointer hover:text-darkPrimary"
            href="/vps"
          >
            VPS
          </Link>

          {/* Tools Dropdown */}
          <div 
            className="relative group z-50" 
            ref={toolsRef}
          >
            <div
              className="flex flex-row items-center gap-1"
              onClick={() => setIsToolsOpen(!isToolsOpen)}
            >
              <button
                className={`${
                  isToolsOpen ? "text-darkPrimary" : "text-white"
                }  font-inter text-[16px] font-medium cursor-pointer hover:text-darkPrimary`}
              >
                Tools
              </button>
              {isToolsOpen ? (
                <MdKeyboardArrowUp color="#37F94E" size={20} />
              ) : (
                <MdKeyboardArrowDown color="#fff" size={20} />
              )}
            </div>

            {isToolsOpen && (
              <div className="absolute top-full mt-2 w-[200px] bg-bodyColor rounded-lg border border-[#20211f] z-50">
                <Link
                  href="/solana-wrapper"
                  className="block px-4 py-3 text-white hover:bg-darkPrimary"
                >
                  SOL Wrap/Unwrap
                </Link>
                <Link
                  href="/token-account-closer"
                  className="block px-4 py-3 text-white hover:bg-darkPrimary"
                >
                   Token Account Closer
                </Link>
                <Link
                  href="/burn-token"
                  className="block px-4 py-3 text-white hover:bg-darkPrimary"
                >
                  SOL Token Burner
                </Link>
              </div>
            )}
          </div>
          <Link
            className="text-white font-inter text-[16px] font-medium cursor-pointer hover:text-darkPrimary"
            href="https://docs.leap-blockchain.com/"
            target="_blank"
          >
            Docs
          </Link>
        </div>

        <Link
          className="text-white font-inter text-[16px] font-medium cursor-pointer hover:text-darkPrimary"
          href="/login"
        >
          <button className="hidden lg:flex items-center gap-x-2 px-6 py-3 bg-darkPrimary text-[#231F20] font-medium rounded-[50px] hover:bg-white">
            Dashboard
            <FaArrowRight color="#231F20" size={18} />
          </button>
        </Link>

        {/* Mobile Menu Toggle */}
        <div
          className="lg:hidden text-white cursor-pointer text-[24px]"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars className="text-darkPrimary" />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#07080699] mt-2 rounded-[20px] p-5 z-50">
          <div className="flex flex-col items-center gap-y-5">
            <Link
              className="text-white text-[16px] font-medium cursor-pointer hover:text-darkPrimary"
              href="/telegram-bot"
              onClick={toggleMenu}
            >
              Telegram Bot
            </Link>
            <Link
              className="text-white text-[16px] font-medium cursor-pointer hover:text-darkPrimary"
              href="/rpc"
              onClick={toggleMenu}
            >
              RPC
            </Link>
            <Link
              className="text-white text-[16px] font-medium cursor-pointer hover:text-darkPrimary"
              href="/vps"
              onClick={toggleMenu}
            >
              VPS
            </Link>

            {/* Tools Dropdown for Mobile */}
            <div 
              className="flex flex-col items-center z-50"
              ref={toolsRef}
            >
              <div
                className="flex flex-row items-center gap-1"
                onClick={() => setIsToolsOpen(!isToolsOpen)}
              >
                <button
                  className={`${
                    isToolsOpen ? "text-darkPrimary" : "text-white"
                  }  text-[16px] font-medium cursor-pointer`}
                >
                  Tools
                </button>
                {isToolsOpen ? (
                  <MdKeyboardArrowUp color="#37F94E" size={20} />
                ) : (
                  <MdKeyboardArrowDown color="#fff" size={20} />
                )}
              </div>

              {isToolsOpen && (
                <div className="flex flex-col items-center mt-2 w-40 bg-[#07080699] rounded-lg shadow-lg z-50">
                  <Link
                    href="/solana-wrapper"
                    className="block px-4 py-2 text-white hover:bg-darkPrimary"
                  >
                    SOL Wrap/Unwrap
                  </Link>
                  <Link
                    href="/token-account-closer"
                    className="block px-4 py-2 text-white hover:bg-darkPrimary"
                  >
                     Token Account Closer
                  </Link>
                  <Link
                    href="/burn-token"
                    className="block px-4 py-2 text-white hover:bg-darkPrimary"
                  >
                    SOL Token Burner
                  </Link>
                </div>
              )}
            </div>
            <Link
              className="text-white text-[16px] font-medium cursor-pointer hover:text-darkPrimary"
             href="https://docs.leap-blockchain.com/"
             target="_blank"
            >
              Docs
            </Link>
            <button
              className="w-[168px] h-[46px]  mw-12:w-[150px] leading-none flex flex-row items-center justify-center gap-x-2  mw-12:text-[14px]  bg-darkPrimary font-inter text-[#231F20] font-medium rounded-[50px] cursor-pointer hover:bg-white"
              onClick={() => setShowAuthFlow(true)}
            >
              Dashboard
              <FaArrowRight color="#231F20" size={18} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;