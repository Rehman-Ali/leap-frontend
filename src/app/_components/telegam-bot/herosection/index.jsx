"use client";
import { useInView } from "@/hooks/useInView";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { LuAsterisk } from "react-icons/lu";

const TelegramHeroSection = () => {
  const sectionRef = useRef(null); // Ref for a div element
  const isVisible = useInView(sectionRef, { threshold: 0.4 });
  const [animationTriggered, setAnimationTriggered] = useState(false);

  // Trigger animation only once
  if (isVisible && !animationTriggered) {
    setAnimationTriggered(true);
  }

  return (
    <div ref={sectionRef} className="relative mw-6:mt-[40px] mt-16 min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/assets/home/hero-section/bg.png')] bg-cover bg-center transform scale-100 transition-transform duration-1000 -z-10"></div>

      {/* Content */}
      <div className="relative flex flex-col h-full z-10 px-4 lg:px-8">
        <div className="flex flex-col justify-center items-center space-y-4 text-center">
          <h1
            className={`text-white
          ${animationTriggered ? "animate-slideIn" : ""}
          text-4xl sm:text-5xl lg:text-6xl font-medium`}
          >
            Leap Telegram<span className="text-darkPrimary"> Bot</span>
          </h1>
          <h2
            className={`text-[#C6C7C6]
          ${animationTriggered ? "animate-slideIn" : ""}
          text-sm sm:text-base lg:text-lg max-w-xl`}
          >
            Take your crypto trading to the next level with the Leap Telegram
            Bot, designed for speed, simplicity, and precision.
          </h2>
          <p className="text-[#C6C7C6] text-sm sm:text-base lg:text-lg max-w-xl mt-4">
             Our advanced trading bot integrates seamlessly with Telegram, providing real-time market updates, automated trading strategies, and comprehensive portfolio management. With features like copy trading, DCA orders, and MEV protection, you'll have everything you need for successful trading on Solana.
           </p>
          <a href="https://t.me/leaptrading_bot" target="_blank">
            <button
              className={`w-36
          ${animationTriggered ? "animate-slideIn" : ""}
          mw-12:w-[110px] mw-12:text-[14px]  sm:w-40 h-12 bg-darkPrimary font-medium text-[#231F20] rounded-full cursor-pointer hover:bg-white`}
            >
              Get Started
            </button>
          </a>
        </div>

        {/* Features Section */}
        {/* <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              image: "/assets/telebot/telebot2.png",
              title: "Copy Trading",
              description: "Automatically follow the trades by your selected wallets.",
            },
            {
              image: "/assets/node/node1.png",
              title: "Limit & DCA Trades",
              description: "Plan your entries and exits with precision.",
            },
            {
              image: "/assets/telebot/telebot1.png",
              title: "Coin Analytics",
              description: "Automatically follow the trades by your selected wallets.",
            },
            {
              image: "/assets/node/node2.png",
              title: "Jito",
              description: "Execute trades at lightning speed during high-volume events.",
            },
            {
              image: "/assets/node/node3.png",
              title: "Bloxroute",
              description: "Land faster than ever before.",
            },
            {
              image: "/assets/telebot/telegram3.png",
              title: "MEV Protection",
              description: "Automatically follow the trades by your selected wallets.",
            },
            {
              image: "/assets/telebot/telegram3.png",
              title: "Mempool Access",
              description: "Piggy back pending transactions and land faster than ever before.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`flex ${animationTriggered ? 'animate-slideInFade' :"" } flex-col bg-[#131412] rounded-lg p-6 text-center items-center space-y-4`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
           >
              <Image src={feature.image} height={48} width={48} alt={feature.title} />
              <h3 className="text-xl text-white font-medium">{feature.title}</h3>
              <p className="text-sm text-[#C6C7C6]">{feature.description}</p>
            </div>
          ))}
        </div> */}

        <div className="mw-6:mt-[25px] mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              image: "/assets/telebot/telebot2.png",
              title: "Copy Trading",
              description:
                "Automatically follow the trades by your selected wallets."
            },
            {
              image: "/assets/node/node1.png",
              title: "Limit & DCA Trades",
              description: "Plan your entries and exits with precision."
            },
            {
              image: "/assets/telebot/telebot1.png",
              title: "Coin Analytics",
              description:
                "Track market trends and wallet activity for smarter trades."
            },
            {
              image: "/assets/node/node2.png",
              title: "Jito",
              description:
                "Execute trades at lightning speed during high-volume events."
            },
            {
              image: "/assets/node/node3.png",
              title: "Bloxroute",
              description: "Land faster than ever before."
            },
            {
              image: "/assets/telebot/telegram3.png",
              title: "MEV Protection",
              description:
                "Protect your trades from front-running and price manipulation."
            },
            {
              image: "/assets/telebot/telegram3.png",
              title: "Mempool Access",
              description:
                "Piggy back pending transactions and land faster than ever before."
            }
          ].map((feature, index) => (
            <div
              key={index}
              className={`flex ${
                animationTriggered ? "animate-slideIn" : ""
              } flex-col bg-[#131412] rounded-lg p-6 text-center items-center space-y-4 ${
                index === 6
                  ? "col-span-1 sm:col-span-2 lg:col-span-3 w-full"
                  : ""
              }`}
              // style={{
              //   animationDelay: `${index * 0.1}s`
              // }}
            >
              <Image
                src={feature.image}
                height={48}
                width={48}
                alt={`Leap Telegram Bot ${feature.title} Feature - ${feature.description}`}
              />
              <h3 className="text-xl text-white font-medium">
                {feature.title}
              </h3>
              <p className="text-sm text-[#C6C7C6]">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Benchmark Section */}
        <div className="mt-[120px] mw-8:mt-[50px] flex flex-col lg:flex-row mw-12:items-start items-center justify-between my-16 space-y-8 lg:space-y-0 lg:space-x-16">
          <div className="text-left">
            <div
              className={`w-28 
            ${animationTriggered ? "animate-slideIn" : ""}
            h-8 bg-[#131412] rounded-full border border-[#07210a] flex items-center justify-center space-x-2  lg:mx-0`}
            >
              <LuAsterisk size={14} color={"#37f94e"} />
              <span className="text-sm mw-8:text-[14px] text-darkPrimary">
                PRICING
              </span>
            </div>
            <h2
              className={`text-white  ${
                animationTriggered ? "animate-slideIn" : ""
              } mw-5:text-[31px] mw-12:text-[42px] mw-8:text-[38px]  text-[52px] leading-[60px]  font-medium  mt-4`}
            >
              Simple and<span className="text-darkPrimary"> Transparent</span>
              <br /> Pricing
            </h2>
            <ul
              className={`text-white   ${
                animationTriggered ? "animate-slideIn" : ""
              } text-sm sm:text-base lg:text-lg mt-6 space-y-4 max-w-md mx-auto lg:mx-0`}
            >
              <li>Free to Set Up: Get started at no cost.</li>
              <li>
                Transaction-Based Fee: Pay only a small percentage on each
                transaction—no hidden fees.
              </li>
              <li>
                Focused exclusively on Solana, we deliver unmatched performance.
              </li>
            </ul>
          </div>
          <div
            className={`flex justify-center mw-8:w-full
          ${animationTriggered ? "animate__animated animate__fadeInRight" : ""}
        `}
          >
            <Image
              src="/assets/telebot/pricing.png"
              height={400}
              width={625}
              alt="telegram trading bot"
              className="h-auto  mw-8:w-full w-md lg:max-w-lg rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelegramHeroSection;
