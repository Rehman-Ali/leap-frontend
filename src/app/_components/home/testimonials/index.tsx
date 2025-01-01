import Image from "next/image";
import { LuAsterisk } from "react-icons/lu";
import Marquee from "react-fast-marquee";
const Testimonials = () => {
  return (
    <div className="mx-auto my-[150px]">
      <div className="flex flex-col items-center justify-center">
        <div className="w-[150px] h-[34px] bg-[#131412] rounded-[40px] border border-[#07210a] flex flex-row gap-x-1 justify-center items-center">
          <LuAsterisk size={14} color={"#37f94e"} />
          <p className="text-[14px] font-inter text-darkPrimary">
            TESTIMONIALS
          </p>
        </div>
        <p className="text-white text-[60px] font-inter font-medium mt-[20px]">
          Testimonials
        </p>
      </div>
      <div className="relative mt-[100px]">
        {/* Left Overlay */}
        <div className="absolute top-0 left-0 z-10 h-full w-[100px] bg-gradient-to-r from-[#070806] to-transparent pointer-events-none"></div>
        {/* Right Overlay */}
        <div className="absolute top-0 right-0 z-10 h-full w-[100px] bg-gradient-to-l from-[#070806] to-transparent pointer-events-none"></div>

        <Marquee direction="left">
          <div className="w-[370px] mx-[12px] h-[254px] bg-[#13141266]  rounded-[12px] border border-[#1f250e] p-[24px]">
            <p className="text-[16px] text-[#c5c6c5] font-inter">
            &quot;I&apos;ve tried many project management tools, but Saasta stands out
              for its simplicity and effectiveness. It has everything we need to
              stay organized and collaborate effectively. Our projects have
              never been smoother!&quot;
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
              &quot;I&apos;ve tried many project management tools, but Saasta stands out
              for its simplicity and effectiveness. It has everything we need to
              stay organized and collaborate effectively. Our projects have
              never been smoother!&quot;
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
              &quot;I&apos;ve tried many project management tools, but Saasta stands out
              for its simplicity and effectiveness. It has everything we need to
              stay organized and collaborate effectively. Our projects have
              never been smoother!&quot;
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
              &quot;I&apos;ve tried many project management tools, but Saasta stands out
              for its simplicity and effectiveness. It has everything we need to
              stay organized and collaborate effectively. Our projects have
              never been smoother!&quot;
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
        </Marquee>
      </div>

      <div className="relative mt-[80px]">
        {/* Left Overlay */}
        <div className="absolute top-0 left-0 z-10 h-full w-[100px] bg-gradient-to-r from-[#070806] to-transparent pointer-events-none"></div>
        {/* Right Overlay */}
        <div className="absolute top-0 right-0 z-10 h-full w-[100px] bg-gradient-to-l from-[#070806] to-transparent pointer-events-none"></div>

        <Marquee direction="right">
          <div className="w-[370px] mx-[12px] h-[254px] bg-[#13141266]  rounded-[12px] border border-[#1f250e] p-[24px]">
            <p className="text-[16px] text-[#c5c6c5] font-inter">
              &quot;I&apos;ve tried many project management tools, but Saasta stands out
              for its simplicity and effectiveness. It has everything we need to
              stay organized and collaborate effectively. Our projects have
              never been smoother!&quot;
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
              &quot;I&apos;ve tried many project management tools, but Saasta stands out
              for its simplicity and effectiveness. It has everything we need to
              stay organized and collaborate effectively. Our projects have
              never been smoother!&quot;
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
            &quot;I&apos;ve tried many project management tools, but Saasta stands out
              for its simplicity and effectiveness. It has everything we need to
              stay organized and collaborate effectively. Our projects have
              never been smoother!&quot;
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
            &quot;I&apos;ve tried many project management tools, but Saasta stands out
              for its simplicity and effectiveness. It has everything we need to
              stay organized and collaborate effectively. Our projects have
              never been smoother!&quot;
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
        </Marquee>
      </div>
    </div>
  );
};

export default Testimonials;
