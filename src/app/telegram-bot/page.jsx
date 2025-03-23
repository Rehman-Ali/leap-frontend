

import TelegramScreen from "@/pages/telegram-bot-page";

export const metadata = {
  title: "Telegram Trading Bot",
  description: "Take your crypto trading to the next level with the Leap Telegram Bot. Features include real-time trade updates, coin analytics, limit orders, DCA orders, and copy trading capabilities.",
  keywords: ["Telegram Bot", "Crypto Trading", "Trading Bot", "Copy Trading", "DCA Orders", "Coin Analytics", "Solana Trading"],
    other: {
      "google-site-verification": "KtTMBV0PsMKme0FfaQTOlUYnMc4y7jTfcKHDXF_4CzU",
    },
  };
  

const page = () =>{
return(
    <TelegramScreen/>
)
}

export default page;