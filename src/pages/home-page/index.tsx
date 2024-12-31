import ArbitageBot from "@/app/_components/arbitrage-bot";
import FAQComponent from "@/app/_components/faq";
import HeroSection from "@/app/_components/herosection";
import Services from "@/app/_components/services";
import TelegramTadingBot from "@/app/_components/telegram-trading-bot";
import Testimonials from "@/app/_components/testimonials";


const HomePageScreen = () => {
  return (
    <div className="bg-bodycolor max-w-[1200px] mx-auto">
      <HeroSection/>
      <Services/>
      <TelegramTadingBot />
      <ArbitageBot/>
      <FAQComponent/>
      <Testimonials/>
     
    </div>
  ); 
};

export default HomePageScreen;
