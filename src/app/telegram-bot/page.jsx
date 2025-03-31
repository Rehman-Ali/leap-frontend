import TelegramScreen from "@/pages/telegram-bot-page";

export const metadata = {
  title: "Telegram Trading Bot | Advanced Crypto Trading Automation",
  description: "Take your crypto trading to the next level with the Leap Telegram Bot. Features include real-time trade updates, coin analytics, limit orders, DCA orders, and copy trading capabilities.",
  keywords: ["Telegram Bot", "Crypto Trading", "Trading Bot", "Copy Trading", "DCA Orders", "Coin Analytics", "Solana Trading", "Trading Automation"],
  openGraph: {
    title: "Telegram Trading Bot | Advanced Crypto Trading Automation",
    description: "Take your crypto trading to the next level with the Leap Telegram Bot. Features include real-time trade updates, coin analytics, limit orders, DCA orders, and copy trading.",
    url: "https://leap.io/telegram-bot",
    siteName: "Leap Trading Infrastructure",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Telegram Trading Bot | Advanced Crypto Trading Automation",
    description: "Take your crypto trading to the next level with the Leap Telegram Bot. Features include real-time trade updates, coin analytics, limit orders, DCA orders, and copy trading.",
  },
  alternates: {
    canonical: 'https://www.leap-blockchain.com/telegram-bot'
  }
};
  

const page = () =>{
return(
    <TelegramScreen/>
)
}

export default page;