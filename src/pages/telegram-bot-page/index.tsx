
import TelegramGetStarted from "@/app/_components/telegam-bot/get-started";
import TelegramHeroSection from "@/app/_components/telegam-bot/herosection";
import TelegramBotPricing from "@/app/_components/telegam-bot/pricing";

const TelegramScreen = () => {
  return (
    <div className="bg-bodycolor max-w-[1200px] mx-auto">
      <TelegramHeroSection/>
      <TelegramBotPricing/>
      <TelegramGetStarted/>
    </div>
  ); 
};

export default TelegramScreen;
