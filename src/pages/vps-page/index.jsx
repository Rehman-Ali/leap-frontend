"use client";

import VPSGetStarted from "@/app/_components/vps/get-started";
import VPSHeroSection from "@/app/_components/vps/herosection";
import VPSPricing from "@/app/_components/vps/pricing";
import VPSSpeedComponent from "@/app/_components/vps/speed";

const VPSScreen = () => {
  return (
    <div className="bg-bodycolor max-w-[1200px] mx-auto">
      <VPSHeroSection />
      <VPSSpeedComponent />
      <VPSPricing />
      <VPSGetStarted />
    </div>
  );
};

export default VPSScreen;
