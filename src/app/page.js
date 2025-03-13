
import HomePageScreen from "@/pages/home-page";
import SolanaWrapperScreen from "@/pages/tools-page/solana-wrapper-tool";
import CreateTestTokenAccounts from "@/pages/tools-page/test-token-create";
import VaporToolScreen from "@/pages/tools-page/vapor-tool";



export const metadata = {
  title: "Leap",
  description: "",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  other: {
    "google-site-verification": "KtTMBV0PsMKme0FfaQTOlUYnMc4y7jTfcKHDXF_4CzU",
  },
};



export default function Home() {
  return (
  //  <SolanaWrapperScreen/>
  // <VaporToolScreen/>
  <HomePageScreen/>
  // <CreateTestTokenAccounts/>
  );
}
