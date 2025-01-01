import ArbitageBot from "@/app/_components/home/arbitrage-bot";
import FAQComponent from "@/app/_components/home/faq";
import HeroSection from "@/app/_components/home/herosection";
import Services from "@/app/_components/home/services";
import TelegramTadingBot from "@/app/_components/home/telegram-trading-bot";
import Testimonials from "@/app/_components/home/testimonials";


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
