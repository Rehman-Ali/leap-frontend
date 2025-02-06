"use client";
import { useInView } from "@/hooks/useInView";
import { useRef, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const Accordion = ({ items, isVisible }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mt-10 space-y-4 w-full max-w-[800px] mx-auto">
      {items.map((item, index) =>
        <div
          key={index}
          className={`bg-[#131412] ${isVisible
            ? "animate-slideIn"
            : ""}  border border-[#393938] rounded-[15px] overflow-hidden`}
        >
          {/* Accordion Header */}
          <button
            onClick={() => toggleAccordion(index)}
            className="text-[16px] mw-12:text-[14px] font-inter font-medium flex justify-between items-center h-[76px] w-full px-6 py-3 text-left text-white bg-[#131412] cursor-pointer transition duration-300"
          >
            <span className="font-medium">
              {item.title}
            </span>
            <span className="transition-transform duration-300">
              {activeIndex === index
                ? <AiOutlineMinus className="w-4 h-4 text-white" />
                : <AiOutlinePlus className="w-4 h-4 text-white" />}
            </span>
          </button>

          {/* Accordion Content */}
          <div
            className={`overflow-hidden transition-all duration-700 ease-in-out ${activeIndex ===
            index
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0"}`}
          >
            <div className="px-6 pb-4 bg-[#131412] text-[#C6C7C6] font-inter text-[16px] mw-12:text-[14px] transition-opacity duration-500 ease-in-out">
              {item.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FAQComponent = () => {
  const sectionRef = useRef(null); // Ref for a div element
  const isVisible = useInView(sectionRef, { threshold: 0.4 });
  const [animationTriggered, setAnimationTriggered] = useState(false);

  // Trigger animation only once
  if (isVisible && !animationTriggered) {
    setAnimationTriggered(true);
  }
  const accordionItems = [
    {
      title: "Is our Node Staked?",
      content: "Yes, our node has over 200,000 Solana staked."
    },
    {
      title: "What are the TPS limits?",
      content:
        "We currently have unlimited TPS limits when using websockets, GRPC does have limits though."
    },
    {
      title: "What are the costs?",
      content: "Node Rentals are 2 Solana a week or 6 Solana a month."
    },
    {
      title: "Can Leap handle high network congestion on Solana?",
      content:
        "Yes. Leap’s cutting-edge infrastructure is built to perform during periods of high Solana network activity, ensuring seamless operations without downtime."
    },
    {
      title: "What kind of support does Leap provide?",
      content:
        "Our team of Solana experts are available to assist with setup, troubleshooting, and optimising your experience. We are committed to providing responsive and knowledgeable support."
    },
    {
      title: "How do I get started?",
      content:
        "Simply join our discord here (insert discord link) Our team will guide you through the onboarding process."
    },
    {
      title: "Do Leap offer a free trial?",
      content:
        "Simply join our discord here (insert discord link) Our team will guide you through the onboarding process."
    },
    {
      title: "Where is Leaps Node located?",
      content:
        "Currently we are located in VA, however we are looking to expand over the coming months."
    },
    {
      title: "Can I cancel my Subscription at any time?",
      content:
        "Of course, there are no fixed contracts unless you have required something very specific."
    },
    {
      title: "How Many IPs Can I authorise With One Subscription",
      content:
        "You can authorise 1 IP per subscription unless you purchase a private node and then you can do as you please."
    }
  ];

  return (
    <div className="mx-auto mt-[100px] px-4" ref={sectionRef}>
      <div className="flex flex-col items-center text-center">
        <p
          className={`text-white ${animationTriggered
            ? "animate-slideIn"
            : ""}  text-[42px] mw-8:text-[36px] font-inter font-medium mt-[20px]`}
        >
          Frequently Asked Questions (FAQs)
        </p>
      </div>
      <Accordion isVisible={animationTriggered} items={accordionItems} />
    </div>
  );
};

export default FAQComponent;
