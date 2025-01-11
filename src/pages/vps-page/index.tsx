"use client";

import VPSGetStarted from "@/app/_components/vps/get-started";
import VPSHeroSection from "@/app/_components/vps/herosection";
import VPSPricing from "@/app/_components/vps/pricing";
import VPSSpeedComponent from "@/app/_components/vps/speed";
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
    <div className="bg-bodycolor max-w-[1200px] mx-auto">
      <VPSHeroSection/>
      <VPSSpeedComponent/>
      <VPSPricing/>

      <VPSGetStarted/>
          </div>
  );
};

export default VPSScreen;
