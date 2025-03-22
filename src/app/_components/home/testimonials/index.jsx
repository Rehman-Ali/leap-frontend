"use client";
import Image from "next/image";
import { LuAsterisk } from "react-icons/lu";
import Slider from "react-slick";
import { useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
const Testimonials = () => {
  const sectionRef = useRef(null);
  const isVisible = useInView(sectionRef, { threshold: 0.4 });
  const [animationTriggered, setAnimationTriggered] = useState(false);

  // Trigger animation only once
  if (isVisible && !animationTriggered) {
    setAnimationTriggered(true);
  }

  // Settings for the first row slider
  const settings1 = {
    dots: false,
    infinite: true,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "5px",
    className: "center",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "10px"
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "10px"
        }
      }
    ]
  };

  // Settings for the second row slider (reverse direction)
  const settings2 = {
    ...settings1,
    autoplay: true,

    autoplaySpeed: 2500,
    rtl: true // Right to left to mimic the reverse direction
  };

  return (
    <div className="mx-auto mw-6:my-[70px] my-[150px]" ref={sectionRef}>
      <div
        className={`flex flex-col items-center justify-center
        ${animationTriggered ? "animate-slideIn" : ""}
        `}
      >
        <div
          className={`w-[150px] h-[34px] bg-[#131412] rounded-[40px] border border-[#07210a] flex flex-row gap-x-1 justify-center items-center`}
        >
          <LuAsterisk size={14} color={"#37f94e"} />
          <p className="text-[14px] mw-12:text-[12px] font-inter text-darkPrimary">
            TESTIMONIALS
          </p>
        </div>
        <p
          className={`text-white text-[60px] mw-12:text-[42px] mw-8:text-[36px] font-inter font-medium mt-[20px]`}
        >
          Testimonials
        </p>
      </div>

      {/* First row - left to right */}
      <div className="relative mw-6:mt-[30px] mt-[100px]">
        {/* Left Overlay */}
        <div className="absolute top-0 left-0 z-10 h-full w-[100px] bg-gradient-to-r from-[#070806] to-transparent pointer-events-none"></div>
        {/* Right Overlay */}
        <div className="absolute top-0 right-0 z-10 h-full w-[100px] bg-gradient-to-l from-[#070806] to-transparent pointer-events-none"></div>

        <div className="slider-container">
          <Slider {...settings1}>
            <div className="px-1">
              <div className="w-full h-[320px] bg-[#13141266] flex flex-col justify-between rounded-[12px] border border-[#1f250e] p-[24px]">
                <p className="text-[16px] text-[#c5c6c5] font-inter">
                  &quot;I have tried so many different copy traders but none of
                  which land as fast as this! Leap is by far the quickest copy
                  trader I have ever used, I am consistently able to get 0 block
                  differences even with low fees&quot;
                </p>
                <div className="flex flex-row items-center gap-x-3">
                  <Image
                    src="/assets/home/testimonials/riz.jpg"
                    height={54}
                    width={54}
                    alt="user icon"
                    className="h-[54px] w-[54px] rounded-[12px]"
                  />
                  <div className="flex flex-col gap-y-1 ">
                    <div className="flex flex-row gap-x-2 items-center">
                      <p className="text-white text-[16px] font-inter font-bold">
                        rizzlablue
                      </p>
                      <div className="flex flex-row gap-x-1">
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                      </div>
                    </div>

                    {/* <p className="text-[14px] font-inter text-[#C5C6C5]">
                      04/03/2025, 10:29
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-1">
              <div className="w-full h-[320px] bg-[#13141266] flex flex-col justify-between rounded-[12px] border border-[#1f250e] p-[24px]">
                <p className="text-[16px] text-[#c5c6c5] font-inter">
                  &quot;I have recently started using Leap Node, and can already
                  say it is faster and more consistent than any node i have
                  personally used before. Also backed by a great team, who are
                  always on hand to help and answer any questions.&quot;
                </p>
                <div className="flex flex-row items-center gap-x-3">
                  <Image
                    src="/assets/home/testimonials/hambo.jpg"
                    height={100}
                    width={100}
                    alt="user icon"
                    className="h-[54px] w-[54px] rounded-[12px]"
                  />
                  <div className="flex flex-col gap-y-1">
                  <div className="flex flex-row gap-x-2 items-center">
                    <p className="text-white text-[16px] font-inter font-bold">
                      hambo
                    </p>
                    <div className="flex flex-row gap-x-1">
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                    
                      </div>
                    </div>
                    {/* <p className="text-[14px] font-inter text-[#C5C6C5]">
                      04/03/2025, 10:30
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-1">
              <div className="w-full h-[320px] bg-[#13141266] flex flex-col justify-between rounded-[12px] border border-[#1f250e] p-[24px]">
                <p className="text-[16px] text-[#c5c6c5] font-inter">
                  &quot;I've been trading memecoins for a few months using
                  Photon, Bullx and Trojan. But this solana node and tg bot is
                  the fastest bot I've ever used. I don't need anything else now
                  and it's the only bot I use to trade sol memecoins with now.
                  It's consistent and reliable and the entries have been exact
                  and perfect. &quot;
                </p>
                <div className="flex flex-row items-center gap-x-3">
                  <Image
                    src="/assets/home/testimonials/kove.jpg"
                    height={54}
                    width={54}
                    alt="user icon"
                    className="h-[54px] w-[54px] rounded-[12px]"
                  />
                  <div className="flex flex-col gap-y-1">
                  <div className="flex flex-row gap-x-2 items-center">
                    <p className="text-white text-[16px] font-inter font-bold">
                      Kobe
                    </p>
                    <div className="flex flex-row gap-x-1">
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                 
                      </div>
                    </div>
                    {/* <p className="text-[14px] font-inter text-[#C5C6C5]">
                      04/03/2025, 10:57
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-1">
              <div className="w-full h-[320px] bg-[#13141266] flex flex-col justify-between rounded-[12px] border border-[#1f250e] p-[24px]">
                <p className="text-[16px] text-[#c5c6c5] font-inter">
                  &quot;Best trading bot i have user for a while super fast and
                  super reliable , and devs continue pushing new features !
                  &quot;
                </p>
                <div className="flex flex-row items-center gap-x-3">
                  <Image
                    src="/assets/home/testimonials/blacken.jpg"
                    height={100}
                    width={100}
                    alt="user icon"
                    className="h-[54px] w-[54px] rounded-[12px]"
                  />
                  <div className="flex flex-col gap-y-1">
                  <div className="flex flex-row gap-x-2 items-center">
                    <p className="text-white text-[16px] font-inter font-bold">
                      BLACKENVYPR
                    </p>
                    <div className="flex flex-row gap-x-1">
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                    
                    
                      </div>
                    </div>
                    {/* <p className="text-[14px] font-inter text-[#C5C6C5]">
                      04/03/2025, 11:21
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>

      {/* Second row - right to left */}
      <div className="relative mw-6:mt-[30px] mt-[80px]">
        {/* Left Overlay */}
        <div className="absolute top-0 left-0 z-10 h-full w-[100px] bg-gradient-to-r from-[#070806] to-transparent pointer-events-none"></div>
        {/* Right Overlay */}
        <div className="absolute top-0 right-0 z-10 h-full w-[100px] bg-gradient-to-l from-[#070806] to-transparent pointer-events-none"></div>

        <div className="slider-container">
          <Slider {...settings2}>
            <div className="px-1">
              <div className="w-full h-[500px] bg-[#13141266] flex flex-col justify-between rounded-[12px] border border-[#1f250e] p-[24px]">
                <p className="text-[16px] text-[#c5c6c5] font-inter">
                  &quot;I have used most of the different bots and nodes on the
                  market, and I must say I am really impressed with what Leap
                  has achieved so far. I am part of the Alpha testing of the
                  Copytrade bot and I can safely say its my main copytrading
                  bot. The recent update utilizing a new way of recieving token
                  data increased my speeds a lot, to the point where I am
                  beating my previous setup that currently cost nearly 200 sol.
                  My current setup using Leaps CLI bot + Leap Node has made me a
                  ton of money already, and that is only from Alpha testing! So
                  safe to say I am super excited to see what the Leap team can
                  do in the future! &quot;
                </p>
                <div className="flex flex-row items-center gap-x-3">
                  <Image
                    src="/assets/home/testimonials/monke.jpg"
                    height={54}
                    width={54}
                    alt="user icon"
                    className="h-[54px] w-[54px] rounded-[12px]"
                  />
                  <div className="flex flex-col gap-y-1">
                  <div className="flex flex-row gap-x-2 items-center">
                    <p className="text-white text-[16px] font-inter font-bold">
                      monke
                    </p>
                    <div className="flex flex-row gap-x-1">
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                      
                      </div>
                    </div>
                    {/* <p className="text-[14px] font-inter text-[#C5C6C5]">
                      04/03/2025, 11:38
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-1">
              <div className="w-full h-[320px] bg-[#13141266] flex flex-col justify-between rounded-[12px] border border-[#1f250e] p-[24px]">
                <p className="text-[16px] text-[#c5c6c5] font-inter">
                  &quot;Just had my node for a few days now, but the performance
                  has been fantastic, even with the shitty market conditions I
                  am still able to get some good Ws. Very happy with the node.
                  &quot;
                </p>
                <div className="flex flex-row items-center gap-x-3">
                  <Image
                    src="/assets/home/testimonials/eth.jpg"
                    height={54}
                    width={54}
                    alt="user icon"
                    className="h-[54px] w-[54px] rounded-[12px]"
                  />
                  <div className="flex flex-col gap-y-1">
                  <div className="flex flex-row gap-x-2 items-center">
                    <p className="text-white text-[16px] font-inter font-bold">
                      Eth
                    </p>
                    <div className="flex flex-row gap-x-1">
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                      
                      </div>
                    </div>
                    {/* <p className="text-[14px] font-inter text-[#C5C6C5]">
                      04/03/2025, 12:46
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-1">
              <div className="w-full h-[320px] bg-[#13141266] flex flex-col justify-between rounded-[12px] border border-[#1f250e] p-[24px]">
                <p className="text-[16px] text-[#c5c6c5] font-inter">
                  &quot;Top of the line RPC. One of the fastest speeds I have
                  achieved in my botting experience. Very helpful and responsive
                  in the tickets aswell! Looking forward to what the team cooks
                  up, especially the shredder! &quot;
                </p>
                <div className="flex flex-row items-center gap-x-3">
                  <Image
                    src="/assets/home/testimonials/rotary.jpg"
                    height={54}
                    width={54}
                    alt="user icon"
                    className="h-[54px] w-[54px] rounded-[12px]"
                  />
                  <div className="flex flex-col gap-y-1">
                  <div className="flex flex-row gap-x-2 items-center">
                    <p className="text-white text-[16px] font-inter font-bold">
                      rip
                    </p>
                    <div className="flex flex-row gap-x-1">
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                       
                      </div>
                    </div>
                    {/* <p className="text-[14px] font-inter text-[#C5C6C5]">
                      04/03/2025, 19:19
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-1">
              <div className="w-full h-[320px] bg-[#13141266] flex flex-col justify-between rounded-[12px] border border-[#1f250e] p-[24px]">
                <p className="text-[16px] text-[#c5c6c5] font-inter">
                  &quot;Call this review biased, given I'm on the team. But I've
                  genuinely joined here as a member, and ended up joining the
                  team, investing my time and energy here as I do see this as
                  the future of trading bots. Just wait to see what we have in
                  store, we have a lot of things cooking up&quot;
                </p>
                <div className="flex flex-row items-center gap-x-3">
                  <Image
                    src="/assets/home/testimonials/nba.jpg"
                    height={54}
                    width={54}
                    alt="user icon"
                    className="h-[54px] w-[54px] rounded-[12px]"
                  />
                  <div className="flex flex-col gap-y-1">
                  <div className="flex flex-row gap-x-2 items-center">
                    <p className="text-white text-[16px] font-inter font-bold">
                      Nba1990
                    </p>
                    <div className="flex flex-row gap-x-1">
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                     
                      </div>
                    </div>
                    {/* <p className="text-[14px] font-inter text-[#C5C6C5]">
                      04/03/2025, 22:14
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-1">
              <div className="w-full h-[320px] bg-[#13141266] flex flex-col justify-between rounded-[12px] border border-[#1f250e] p-[24px]">
                <p className="text-[16px] text-[#c5c6c5] font-inter">
                  &quot;Very reliable provider, instantly helped me with issues
                  and gave me great advice on how I can increase my performance.
                  Very proud to be a member of Leap &quot;
                </p>
                <div className="flex flex-row items-center gap-x-3">
                  <Image
                    src="/assets/home/testimonials/classic.jpg"
                    height={54}
                    width={54}
                    alt="user icon"
                    className="h-[54px] w-[54px] rounded-[12px]"
                  />
                  <div className="flex flex-col gap-y-1">
                  <div className="flex flex-row gap-x-2 items-center">
                    <p className="text-white text-[16px] font-inter font-bold">
                      classicgrey
                    </p>
                    <div className="flex flex-row gap-x-1">
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                        <FaStar siz={20} color="#feff05" />
                        
                      </div>
                    </div>
                    {/* <p className="text-[14px] font-inter text-[#C5C6C5]">
                      04/03/2025, 23:42
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>

      {/* Custom CSS for proper spacing */}
      <style jsx global>{`
        .slick-slide {
          padding: 0 10px;
        }
        .slick-list {
          margin: 0 -10px;
        }
      `}</style>
    </div>
  );
};

export default Testimonials;
