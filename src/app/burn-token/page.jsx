import BurnTokenToolScreen from "@/app/_components/tools-components/burn-token-tool";

export const metadata = {
  title: "Token Burn Tool | Solana Token Management",
  description: "Easily burn Solana tokens with our secure token burn tool. Simple interface for managing token supply and implementing deflationary mechanisms.",
  keywords: ["Token Burn", "Solana Token", "Token Management", "Crypto Tools", "Token Supply", "Deflationary Token"],
  openGraph: {
    title: "Token Burn Tool | Solana Token Management",
    description: "Easily burn Solana tokens with our secure token burn tool. Simple interface for managing token supply and implementing deflationary mechanisms.",
    url: "https://leap.io/burn-token",
    siteName: "Leap Trading Infrastructure",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Token Burn Tool | Solana Token Management",
    description: "Easily burn Solana tokens with our secure token burn tool. Simple interface for managing token supply and implementing deflationary mechanisms.",
  },
  alternates: {
    canonical: 'https://www.leap-blockchain.com/burn-token'
  },
  other: {
    "google-site-verification": "KtTMBV0PsMKme0FfaQTOlUYnMc4y7jTfcKHDXF_4CzU"
  }
};

const BurnTokenPage = () => {
  return (
    <div>
      <BurnTokenToolScreen />
    </div>
  );
};

export default BurnTokenPage;
