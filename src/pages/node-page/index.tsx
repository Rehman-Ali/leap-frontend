import NodeGetStarted from "@/app/_components/node/get-started";
import NodeHeroSection from "@/app/_components/node/herosection";
import NodePricing from "@/app/_components/node/pricing";
import NodeSpeedComponent from "@/app/_components/node/speed";

const NodeScreen = () => {
  return (
    <div className="bg-bodycolor max-w-[1200px] mx-auto">
      <NodeHeroSection/>
      <NodeSpeedComponent/>
      <NodePricing/>
      <NodeGetStarted/>
     
    </div>
  ); 
};

export default NodeScreen;
