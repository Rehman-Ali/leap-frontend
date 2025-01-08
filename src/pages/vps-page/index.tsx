"use client";

import { useInView } from "@/hooks/useInView";
import { useRef, useState } from "react";

const VPSScreen = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null); // Ref for a div element
  const isVisible = useInView(sectionRef, { threshold: 0.4 });
  const [animationTriggered, setAnimationTriggered] = useState(false);

  // Trigger animation only once
  if (isVisible && !animationTriggered) {
    setAnimationTriggered(true);
  }

  return (
    <div
      className="bg-bodycolor max-w-screen-lg mx-auto px-4 py-12"
      ref={sectionRef}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Heading */}
        <p
          className={`
         ${animationTriggered ? "animate-slideIn" : ""}
        text-4xl sm:text-5xl lg:text-6xl font-medium font-inter text-white text-center`}
        >
          Coming <span className="text-darkPrimary">Soon...</span>
        </p>

        {/* Subheading */}
        <p
          className={`*:
         ${animationTriggered ? "animate-slideIn" : ""}
        text-sm sm:text-base font-inter text-[#C6C7C6] text-center`}
        >
          Join our Discord to stay updated
        </p>

        {/* Button */}
        <button className={`
         ${
              animationTriggered ? "animate-slideIn" : ""
            }
        mt-5 px-8 py-3 bg-darkPrimary font-inter text-sm sm:text-base text-[#231F20] font-medium rounded-full cursor-pointer hover:bg-white transition duration-300`}>
          Join Here
        </button>
      </div>
    </div>
  );
};

export default VPSScreen;
