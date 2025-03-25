"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";

const RPCHeroSection = () => {
  const sectionRef = useRef(null); // Ref for a div element
  const isVisible = useInView(sectionRef, { threshold: 0.4 });
  const [animationTriggered, setAnimationTriggered] = useState(false);

  // Trigger animation only once
  if (isVisible && !animationTriggered) {
    setAnimationTriggered(true);
  }

  return (
    <div
      className="relative mw-6:mt-[40px] mt-24 min-h-[500px] overflow-hidden"
      ref={sectionRef}
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/assets/home/hero-section/bg.png')] bg-cover bg-center scale-[1.2] transition-transform duration-1000 -z-10"></div>

      {/* Content */}
      <div className="relative flex flex-col h-full z-10">
        {/* Hero Section */}
        <div className="flex flex-col justify-center items-center px-4 space-y-4">
          <div className="text-center">
            <h1 className="text-[48px] font-bold mb-4 text-white">Solana RPC Node</h1>
            <p className="text-[18px] text-slate-500 mb-8 text-white">
              Experience lightning-fast Solana RPC nodes with features like GRPC, JitoShred, Bloxroute BDM, and unlimited TPS. Optimized for high-frequency trading and MEV protection.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="flex flex-col items-center justify-center mw-6:mt-[20px] mt-16">
          <h2
            className={` ${
              animationTriggered ? "animate-slideIn" : ""
            } text-white text-center text-3xl sm:text-4xl lg:text-5xl font-inter font-medium`}
          >
            Features
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mt-8 px-4">
          {[
            { src: "/assets/node/node1.png", text: "GRPC" },
            { src: "/assets/node/node2.png", text: "JitoShred" },
            { src: "/assets/node/node3.png", text: "Bloxroute BDM" },
            { src: "/assets/node/node1.png", text: "Unlimited TPS" }
          ].map((feature, index) => (
            <div
              key={index}
              className={` ${
                animationTriggered ? "animate-slideInFade" : ""
              } flex items-center gap-4 w-full sm:w-[45%] lg:w-[23%] bg-[#131412] rounded-lg p-6`}
            >
              <Image
                src={feature.src}
                height={48}
                width={48}
                alt="feature logo"
                className="object-contain"
              />
              <p className="text-lg sm:text-xl text-white font-inter font-medium">
                {feature.text}
              </p>
            </div>
          ))}
        </div>

        {/* Benchmark Section */}
        <div className="flex flex-col items-center justify-center mw-8:mt-[25px] mt-[50px] px-4">
          <p
            className={`${
              animationTriggered ? "animate-slideIn" : ""
            } text-white text-center text-base sm:text-lg font-inter `}
          >
            Land transactions faster and more consistently than ever before
          </p>
          <a href="https://discord.gg/9UXPJgnZ5q" target="_blank">
            <button
              className={` ${
                animationTriggered ? "animate-slideIn" : ""
              } mt-5 mw-8:mt-3 w-32 mb-10 sm:w-36 h-12 bg-darkPrimary text-sm sm:text-base font-inter text-[#231F20] font-medium rounded-full cursor-pointer hover:bg-white transition duration-300`}
            >
              Get Started
            </button>
          </a>
          {/* <p
            className={` ${
              animationTriggered ? "animate-slideIn" : ""
            } text-white pb-[20px] mw-8:pb-[10px] text-center text-4xl sm:text-5xl lg:text-6xl font-inter font-medium mw-8:t-3 mt-6`}
          >
            Benchmark
          </p>
          <Image
            src="/assets/node/benchmark.jpg"
            height={600}
            width={1170}
            alt="benchmark logo"
            className="mt-6 w-full max-w-4xl h-auto object-cover rounded-lg" 
          />*/}
        </div>
      </div>
    </div>
  );
};

export default RPCHeroSection;
