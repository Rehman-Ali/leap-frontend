"use client";
import { useInView } from "@/hooks/useInView";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

const ArticleScreen = () => {
  const sectionRef = useRef(null); // Ref for a div element
  const isVisible = useInView(sectionRef, { threshold: 0.4 });
  const [animationTriggered, setAnimationTriggered] = useState(false);

  // Trigger animation only once
  if (isVisible && !animationTriggered) {
    setAnimationTriggered(true);
  }
  return (
    <div ref={sectionRef} className="bg-bodycolor max-w-[1200px] mx-auto">
      <div className="flex flex-row items-center justify-center">
        <h1
          className={`text-darkPrimary
          ${animationTriggered ? "animate-slideIn" : ""}
          text-4xl sm:text-5xl lg:text-6xl font-bold`}
        >
          Articles
        </h1>
      </div>
      <div className="mt-10 flex flex-row items-center justify-between">
        <div className="flex flex-row items-start gap-x-5">
          <div className="border-b-darkPrimary border-b-[2px]">
            <p className="text-darkPrimary font-inter font-semibold text-[24px]">
              All
            </p>
          </div>
          <div>
            <p className="text-darkPrimary font-inter font-semibold text-[24px]">
              Crypto
            </p>
          </div>
          <div>
            <p className="text-darkPrimary font-inter font-semibold text-[24px]">
              Forex
            </p>
          </div>
          <div>
            <p className="text-darkPrimary font-inter font-semibold text-[24px]">
              Stock
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-x-3">
          <input
            className="border border-gray-400 h-[50px] w-[300px] rounded-[8px] pl-[10px]"
            type="text"
            placeholder="search..."
          />
          <FaSearch size={30} color={"#37F94E"} />
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        <div className="bg-gray-500 h-[300px] w-[24%] rounded-[8px]">
          <Image
            src="/assets/articles/pic1.jpg"
            height={157}
            width={300}
            className="h-[157px] w-[100%] rounded-t-[8px]"
          />
          <div className="p-[10px] h-[143px] bg-white flex flex-col justify-between rounded-b-[8px]">
            <div className="flex flex-col gap-y-2">
              <p className="text-red-700 font-inter text-[16px] font-medium">STOCK</p>
              <p className="text-black font-inter font-medium text-[16px]">Article Name</p>
            </div>
            <p className="text-black font-inter font-normal text-[12px]">
             By <span className="text-black font-semibold text-[14px]"> Author Name</span> | 20-20-2020
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleScreen;
