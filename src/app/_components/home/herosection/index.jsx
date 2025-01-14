"use client"
import { useInView } from "@/hooks/useInView";
import { useRef, useState } from "react";
import { LuAsterisk } from "react-icons/lu";

const HeroSection = () => {
  const sectionRef = useRef(null); // Ref for a div element
  const isVisible = useInView(sectionRef, { threshold: 0.4 });
  const [animationTriggered, setAnimationTriggered] = useState(false);

  // Trigger animation only once
  if (isVisible && !animationTriggered) {
    setAnimationTriggered(true);
  }
  return (
    <div className="relative mt-[100px] min-h-screen overflow-hidden"
    ref={sectionRef}
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/assets/home/hero-section/bg.png')] bg-cover bg-center -z-10"></div>

      {/* Content */}
      <div className="relative flex flex-col h-full z-10 mx-[10px]">
        <div className="flex flex-col justify-center items-center px-8 space-y-4">
          <h1 className={`text-white ${
              animationTriggered ? "animate-slideIn" : ""
            } mw-8:text-[34px] mw-12:text-[53px] text-[65px] font-inter text-center font-medium`}>
            Leap <span className="text-darkPrimary">Ahead</span> Of Your
            Competition
          </h1>
          <p className={`text-[#C6C7C6] text-[16px] ${
              animationTriggered ? "animate-slideIn" : ""
            } mw-8:text-[14px] text-center font-inter`}>
            You Deserve Seamless Trading Without Limits
          </p>
        </div>

        <div className="flex flex-col items-center justify-center mt-[70px]">
          <div className={`w-[150px] h-[34px] ${
              animationTriggered ? "animate-slideIn" : ""
            } bg-[#131412] rounded-[40px] border border-[#07210a] flex flex-row gap-x-1 justify-center items-center`}>
            <LuAsterisk size={14} color={"#37f94e"} />
            <p className="text-[14px]  mw-12:text-[12px] font-inter text-darkPrimary">
              HOW IT WORKS
            </p>
          </div>
          <p className={`text-white ${
              animationTriggered ? "animate-slideIn" : ""
            } text-[60px] mw-12:text-[42px] mw-8:text-[36px] font-inter font-medium mt-[5px]`}>
            Why Us?
          </p>
        </div>

        <div className="flex flex-wrap mt-[30px] gap-[24px] justify-center">
          {[
            {
              title: "Unmatched Speed",
              description:
                "Leap’s state-of-the-art infrastructure ensures industry-leading speed and performance, enabling you to execute trades seamlessly, even during periods of high network congestion on Solana.",
            },
            {
              title: "Proven Reliability",
              description:
                "Our advanced systems ensure consistent uptime and robust performance, enabling seamless trading experiences, optimised efficiency, and uninterrupted operations during critical moments.",
            },
            {
              title: "Expert Guidance",
              description:
                "Backed by a team of seasoned Solana experts, Leap delivers unparalleled support, simplifying complex processes for developers and traders while ensuring you can focus on what truly matters.",
            },
            {
              title: "Flexible Pricing",
              description:
                "Leap offers a pricing model tailored to your needs. With subscription-based plans for nodes and transaction-based fees for our trading bots, you pay only for the services you use.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex ${animationTriggered ? 'animate-slideInFade' :"" }   flex-col w-[23%] mw-8:w-[97%] mw-12:w-[48%] bg-[#131412] rounded-[12px] p-[24px] max-h-[300px] h-auto`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <p className="text-[24px] font-inter font-medium text-white">
                {item.title}
              </p>
              <p className="text-[16px] text-[#c5c6c5] font-inter mt-[15px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className={`flex flex-col items-center justify-center mt-[150px] ${
              animationTriggered ? "animate-slideIn" : ""
            }`}>
          <div className="w-[170px] h-[34px] bg-[#131412] rounded-[40px] border border-[#07210a] flex flex-row gap-x-1 justify-center items-center">
            <LuAsterisk size={14} color={"#37f94e"} />
            <p className="text-[14px] mw-12:text-[12px] font-inter text-darkPrimary">
              WHAT WE OFFER
            </p>
          </div>
          <p className="text-white
          
          text-[60px]  mw-12:text-[42px] mw-8:text-[36px] font-inter font-medium mt-[5px]">
            Services
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
