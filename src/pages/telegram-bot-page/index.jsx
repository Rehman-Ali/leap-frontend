
import TelegramGetStarted from "@/app/_components/telegam-bot/get-started";
import TelegramHeroSection from "@/app/_components/telegam-bot/herosection";

const TelegramScreen = () => {
  return (
    <div className="bg-bodycolor max-w-[1200px] mx-auto">
      <TelegramHeroSection/>
      <TelegramGetStarted/>
    </div>
  ); 
};

export default TelegramScreen;
