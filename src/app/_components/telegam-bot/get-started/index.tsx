"use client";


import { useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";

const TelegramGetStarted = () => {
 const sectionRef = useRef<HTMLDivElement | null>(null); // Ref for a div element
  const isVisible = useInView(sectionRef, { threshold: 0.4 });
  const [animationTriggered, setAnimationTriggered] = useState(false);

  // Trigger animation only once
  if (isVisible && !animationTriggered) {
    setAnimationTriggered(true);
  }

  return (
    <div
      ref={sectionRef}
      className="flex items-center justify-center my-16 md:mb-20 lg:my-24 px-4"
    >
      <div className="flex flex-col items-center justify-center border border-[#131412] rounded-lg w-full max-w-[960px] bg-gradient-to-b from-[#121311] to-[#070806] h-auto py-8 md:py-12">
        <p
          className={`text-3xl 
        ${animationTriggered ? "animate-slideIn" : ""}
        md:text-4xl lg:text-5xl font-inter font-medium text-white text-center mb-4`}
        >
          Get Started Today
        </p>
        <p
          className={`text-sm md:text-base
        ${animationTriggered ? "animate-slideIn" : ""}
        text-[#c6c7c6] text-center mb-6`}
        >
          Join today and claim a free trial of Leap Node
        </p>
        <button
          className={`w-40 h-12
        ${animationTriggered ? "animate-slideIn" : ""}
        bg-darkPrimary font-inter text-[#231F20] font-medium rounded-full cursor-pointer hover:bg-white transition duration-300`}
        >
          Get Started Today
        </button>
      </div>
    </div>
  );
};

export default TelegramGetStarted;
