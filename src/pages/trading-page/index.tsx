
import TradingGetStarted from "@/app/_components/trading-bot/get-started";
import TradingHeroSection from "@/app/_components/trading-bot/herosection";

const TradingBotScreen = () => {
  
  return (
    <div className="bg-bodycolor max-w-[1200px] mx-auto">
    <TradingHeroSection/>
    <TradingGetStarted/>
  </div>
  );
};

export default TradingBotScreen;
