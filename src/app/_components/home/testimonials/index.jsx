"use client";
import Image from "next/image";
import { LuAsterisk } from "react-icons/lu";
import Marquee from "react-fast-marquee";
import { useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
const Testimonials = () => {
  const sectionRef = useRef(null); // Ref for a div element
  const isVisible = useInView(sectionRef, { threshold: 0.4 });
  const [animationTriggered, setAnimationTriggered] = useState(false);

  // Trigger animation only once
  if (isVisible && !animationTriggered) {
    setAnimationTriggered(true);
  }
  return (
    <div className="mx-auto mw-6:my-[70px] my-[150px] " ref={sectionRef}>
      <div className={`flex flex-col items-center justify-center
        ${
          animationTriggered ? "animate-slideIn" : ""
        }
        `}>
        <div
          className={`w-[150px]   h-[34px] bg-[#131412] rounded-[40px] border border-[#07210a] flex flex-row gap-x-1 justify-center items-center`}
        >
          <LuAsterisk size={14} color={"#37f94e"} />
          <p className="text-[14px]  mw-12:text-[12px] font-inter text-darkPrimary">
            TESTIMONIALS
          </p>
        </div>
        <p
          className={`text-white text-[60px]  mw-12:text-[42px] mw-8:text-[36px] font-inter font-medium mt-[20px]`}
        >
          Testimonials
        </p>
      </div>
      <div className="relative mw-6:mt-[30px] mt-[100px]">
        {/* Left Overlay */}
        <div className="absolute top-0 left-0 z-10 h-full w-[100px] bg-gradient-to-r from-[#070806] to-transparent pointer-events-none"></div>
        {/* Right Overlay */}
        <div className="absolute top-0 right-0 z-10 h-full w-[100px] bg-gradient-to-l from-[#070806] to-transparent pointer-events-none"></div>

        <Marquee direction="left" pauseOnHover={true}>
          <div className="w-[370px] mx-[12px] h-[254px] bg-[#13141266]  rounded-[12px] border border-[#1f250e] p-[24px]">
            <p className="text-[16px] text-[#c5c6c5] font-inter">
              &quot;I&apos;ve tried many project management tools, but Saasta
              stands out for its simplicity and effectiveness. It has everything
              we need to stay organized and collaborate effectively. Our
              projects have never been smoother!&quot;
            </p>
            <div className="flex flex-row items-center gap-x-3 mt-[15px]">
              <Image
                src="/assets/home/testimonials/two.jpg"
                height={54}
                width={54}
                alt="user icon"
                className="h-[54px] w-[54px] rounded-[12px]"
              />
              <div className="flex flex-col gap-y-1 ">
                <p className="text-white text-[16px] font-inter font-bold">
                  Emily Johnson
                </p>
                <p className="text-[14px] font-inter text-[#C5C6C5]">
                  Founder of StartUpX
                </p>
              </div>
            </div>
          </div>
          <div className="w-[370px] mx-[12px] h-[254px] bg-[#13141266]  rounded-[12px] border border-[#1f250e] p-[24px]">
            <p className="text-[16px] text-[#c5c6c5] font-inter">
              &quot;Saasta has been a game-changer for our team. Its intuitive
              interface and powerful features have helped us streamline our
              project management processes and boost productivity. Highly
              recommended!&quot;
            </p>
            <div className="flex flex-row items-center gap-x-3 mt-[15px]">
              <Image
                src="/assets/home/testimonials/three.jpg"
                height={100}
                width={100}
                alt="user icon"
                className="h-[54px] w-[54px] rounded-[12px]"
              />
              <div className="flex flex-col gap-y-1 ">
                <p className="text-white text-[16px] font-inter font-bold">
                  Michael Brown
                </p>
                <p className="text-[14px] font-inter text-[#C5C6C5]">
                  Project Manager at Global Innovations
                </p>
              </div>
            </div>
          </div>
          <div className="w-[370px] mx-[12px] h-[254px] bg-[#13141266]  rounded-[12px] border border-[#1f250e] p-[24px]">
            <p className="text-[16px] text-[#c5c6c5] font-inter">
              &quot;As an IT manager, security is a top priority for me.
              Saasta&apos;s robust security measures and compliance standards
              give me peace of mind knowing that our data is safe and
              protected.&quot;
            </p>
            <div className="flex flex-row items-center gap-x-3 mt-[15px]">
              <Image
                src="/assets/home/testimonials/four.png"
                height={54}
                width={54}
                alt="user icon"
                className="h-[54px] w-[54px] rounded-[12px]"
              />
              <div className="flex flex-col gap-y-1 ">
                <p className="text-white text-[16px] font-inter font-bold">
                  David Johnson
                </p>
                <p className="text-[14px] font-inter text-[#C5C6C5]">
                  Marketing Director, Sparkle Brands
                </p>
              </div>
            </div>
          </div>
          <div className="w-[370px] mx-[12px] h-[254px] bg-[#13141266]  rounded-[12px] border border-[#1f250e] p-[24px]">
            <p className="text-[16px] text-[#c5c6c5] font-inter">
              &quot;Saasta has transformed the way our marketing team operates.
              Its collaborative features and real-time updates have improved
              communication and coordination, leading to more successful
              campaigns and happier clients.&quot;
            </p>
            <div className="flex flex-row items-center gap-x-3 mt-[15px]">
              <Image
                src="/assets/home/testimonials/one.jpg"
                height={100}
                width={100}
                alt="user icon"
                className="h-[54px] w-[54px] rounded-[12px]"
              />
              <div className="flex flex-col gap-y-1 ">
                <p className="text-white text-[16px] font-inter font-bold">
                  Sarah Miller
                </p>
                <p className="text-[14px] font-inter text-[#C5C6C5]">
                  Marketing Director at Digital Agency
                </p>
              </div>
            </div>
          </div>
        </Marquee>
      </div>

      <div className="relative mw-6:mt-[30px] mt-[80px]">
        {/* Left Overlay */}
        <div className="absolute top-0 left-0 z-10 h-full w-[100px] bg-gradient-to-r from-[#070806] to-transparent pointer-events-none"></div>
        {/* Right Overlay */}
        <div className="absolute top-0 right-0 z-10 h-full w-[100px] bg-gradient-to-l from-[#070806] to-transparent pointer-events-none"></div>

        <Marquee direction="right">
          <div className="w-[370px] mx-[12px] h-[254px] bg-[#13141266]  rounded-[12px] border border-[#1f250e] p-[24px]">
            <p className="text-[16px] text-[#c5c6c5] font-inter">
              &quot;I&apos;ve tried many project management tools, but Saasta
              stands out for its simplicity and effectiveness. It has everything
              we need to stay organized and collaborate effectively. Our
              projects have never been smoother!&quot;
            </p>
            <div className="flex flex-row items-center gap-x-3 mt-[15px]">
              <Image
                src="/assets/home/testimonials/two.jpg"
                height={54}
                width={54}
                alt="user icon"
                className="h-[54px] w-[54px] rounded-[12px]"
              />
              <div className="flex flex-col gap-y-1 ">
                <p className="text-white text-[16px] font-inter font-bold">
                  Emily Johnson
                </p>
                <p className="text-[14px] font-inter text-[#C5C6C5]">
                  Founder of StartUpX
                </p>
              </div>
            </div>
          </div>
          <div className="w-[370px] mx-[12px] h-[254px] bg-[#13141266]  rounded-[12px] border border-[#1f250e] p-[24px]">
            <p className="text-[16px] text-[#c5c6c5] font-inter">
              &quot;Saasta has been a game-changer for our team. Its intuitive
              interface and powerful features have helped us streamline our
              project management processes and boost productivity. Highly
              recommended!&quot;
            </p>
            <div className="flex flex-row items-center gap-x-3 mt-[15px]">
              <Image
                src="/assets/home/testimonials/three.jpg"
                height={54}
                width={54}
                alt="user icon"
                className="h-[54px] w-[54px] rounded-[12px]"
              />
              <div className="flex flex-col gap-y-1 ">
                <p className="text-white text-[16px] font-inter font-bold">
                  Michael Brown
                </p>
                <p className="text-[14px] font-inter text-[#C5C6C5]">
                  Project Manager at Global Innovations
                </p>
              </div>
            </div>
          </div>
          <div className="w-[370px] mx-[12px] h-[254px] bg-[#13141266]  rounded-[12px] border border-[#1f250e] p-[24px]">
            <p className="text-[16px] text-[#c5c6c5] font-inter">
              &quot;As an IT manager, security is a top priority for me.
              Saasta&apos;s robust security measures and compliance standards
              give me peace of mind knowing that our data is safe and
              protected.&quot;
            </p>
            <div className="flex flex-row items-center gap-x-3 mt-[15px]">
              <Image
                src="/assets/home/testimonials/four.png"
                height={54}
                width={54}
                alt="user icon"
                className="h-[54px] w-[54px] rounded-[12px]"
              />
              <div className="flex flex-col gap-y-1 ">
                <p className="text-white text-[16px] font-inter font-bold">
                  David Johnson
                </p>
                <p className="text-[14px] font-inter text-[#C5C6C5]">
                  Marketing Director, Sparkle Brands
                </p>
              </div>
            </div>
          </div>
          <div className="w-[370px] mx-[12px] h-[254px] bg-[#13141266]  rounded-[12px] border border-[#1f250e] p-[24px]">
            <p className="text-[16px] text-[#c5c6c5] font-inter">
              &quot;Saasta has transformed the way our marketing team operates.
              Its collaborative features and real-time updates have improved
              communication and coordination, leading to more successful
              campaigns and happier clients.&quot;
            </p>
            <div className="flex flex-row items-center gap-x-3 mt-[15px]">
              <Image
                src="/assets/home/testimonials/one.jpg"
                height={54}
                width={54}
                alt="user icon"
                className="h-[54px] w-[54px] rounded-[12px]"
              />
              <div className="flex flex-col gap-y-1 ">
                <p className="text-white text-[16px] font-inter font-bold">
                  Sarah Miller
                </p>
                <p className="text-[14px] font-inter text-[#C5C6C5]">
                  Marketing Director at Digital Agency
                </p>
              </div>
            </div>
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default Testimonials;
