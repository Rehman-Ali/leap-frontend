import FAQComponent from "@/app/_components/home/faq";
import RPCGetStarted from "@/app/_components/rpc/get-started";
import RPCHeroSection from "@/app/_components/rpc/herosection";
import RPCPricing from "@/app/_components/rpc/pricing";
import RPCSpeedComponent from "@/app/_components/rpc/speed";

const RPCScreen = () => {
  return (
    <div className="bg-bodycolor max-w-[1200px] mx-auto">
      <RPCHeroSection/>
      <RPCSpeedComponent/>
      <RPCPricing/>
      <FAQComponent/> 
      <RPCGetStarted/>
     
    </div>
  ); 
};

export default RPCScreen;
