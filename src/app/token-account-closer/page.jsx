import VaporToolScreen from "@/app/_components/tools-components/token-account-closer";
import CreateTestTokenAccounts from "../_components/tools-components/leap tool file/test-token-create";

export const metadata = {
  title: "Token Account Closer | Solana Token Management",
  description: "Close unused token accounts on Solana to recover rent. Simple tool for managing and cleaning up token accounts with real-time balance verification.",
  keywords: ["Token Account", "Solana Token", "Account Management", "Crypto Tools", "Token Cleanup", "Rent Recovery"],
  openGraph: {
    title: "Token Account Closer | Solana Token Management",
    description: "Close unused token accounts on Solana to recover rent. Simple tool for managing and cleaning up token accounts with real-time balance verification.",
    url: "https://leap.io/token-account-closer",
    siteName: "Leap Trading Infrastructure",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Token Account Closer | Solana Token Management",
    description: "Close unused token accounts on Solana to recover rent. Simple tool for managing and cleaning up token accounts with real-time balance verification.",
  },
  alternates: {
    canonical: 'https://www.leap-blockchain.com/token-account-closer'
  },
  other: {
    "google-site-verification": "KtTMBV0PsMKme0FfaQTOlUYnMc4y7jTfcKHDXF_4CzU"
  }
};

const VaporToolPage = () => {
  return (
    <div>
      <VaporToolScreen />
      {/* <CreateTestTokenAccounts/> */}
    </div>
  );
};

export default VaporToolPage;
