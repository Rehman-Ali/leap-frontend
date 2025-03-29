import HomePageScreen from "@/pages/home-page";
// import BurnTokenToolScreen from "@/pages/tools-page/burn-token-tool";
// import SolanaWrapperScreen from "@/pages/tools-page/solana-wrapper-tool";
// import CreateTestTokenAccounts from "@/pages/tools-page/test-token-create";
// import VaporToolScreen from "@/pages/tools-page/vapor-tool";



export const metadata = {
  title: "Leap - High-Performance Trading Infrastructure for Solana",
  description: "Experience unmatched performance with Leap's comprehensive suite of tools: High-speed RPC nodes, Low-latency VPS hosting, and Advanced Telegram Trading Bot",
  keywords: ["Solana RPC", "High-Performance VPS", "Telegram Trading Bot", "Crypto Trading Infrastructure", "Solana Trading Tools", "MEV Protection", "DCA Trading", "Copy Trading"],
  openGraph: {
    title: "Leap - High-Performance Trading Infrastructure for Solana",
    description: "Experience unmatched performance with Leap's comprehensive suite of tools: High-speed RPC nodes, Low-latency VPS hosting, and Advanced Telegram Trading Bot",
    url: "https://leap.io",
    siteName: "Leap Trading Infrastructure",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leap - High-Performance Trading Infrastructure for Solana",
    description: "Experience unmatched performance with Leap's comprehensive suite of tools: High-speed RPC nodes, Low-latency VPS hosting, and Advanced Telegram Trading Bot",
  },
};



export default function Home() {
  return (
  //  <SolanaWrapperScreen/>
  // <VaporToolScreen/>
  // <BurnTokenToolScreen/>
  <HomePageScreen/>
  // <CreateTestTokenAccounts/>
  );
}
