"use client";

import { useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import Link from "next/link";

const RPCGetStarted = () => {
  const sectionRef = useRef(null); // Ref for a div element
  const isVisible = useInView(sectionRef, { threshold: 0.4 });
  const [animationTriggered, setAnimationTriggered] = useState(false);

  // Trigger animation only once
  if (isVisible && !animationTriggered) {
    setAnimationTriggered(true);
  }
  return (
    <div
      className="flex items-center justify-center mb-16 md:mb-20 lg:mb-24 px-4  mw-6:mt-[70px] mt-[100px]"
      ref={sectionRef}
    >
      <div className="flex 
      mw-6:px-[10px]
      flex-col items-center justify-center border border-[#131412] rounded-lg w-full max-w-[960px] bg-gradient-to-b from-[#121311] to-[#070806] h-auto py-8 md:py-12">
        <p
          className={` ${
            animationTriggered ? "animate-slideIn" : ""
          }  text-3xl md:text-4xl lg:text-5xl mw-6:text-[28px] font-inter font-medium text-white text-center mb-4`}
        >
          Don&apos;t waste any more time
        </p>
        <p
          className={`${
            animationTriggered ? "animate-slideIn" : ""
          } text-sm md:text-base text-[#c6c7c6] text-center mb-6`}
        >
         Land transactions faster and more consistently than ever before
        </p>
        <Link href="/buy">
        <button
          className={` ${
            animationTriggered ? "animate-slideIn" : ""
          } w-40 h-12 bg-darkPrimary font-inter text-[#231F20] font-medium rounded-full cursor-pointer hover:bg-white transition duration-300`}
        >
          Get Started
        </button>
        </Link>
      </div>
    </div>
  );
};

export default RPCGetStarted;
