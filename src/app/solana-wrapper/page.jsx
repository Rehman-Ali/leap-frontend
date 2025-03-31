import SolanaWrapperScreen from "@/app/_components/tools-components/solana-wrapper-tool";

export const metadata = {
  title: "Solana Wrapper Tool | Token Wrapping Solution",
  description: "Convert tokens between native and wrapped formats on Solana. Simple interface for token wrapping and unwrapping with real-time balance updates.",
  keywords: ["Solana Wrapper", "Token Wrapping", "Token Conversion", "Crypto Tools", "Token Management", "Solana Token"],
  openGraph: {
    title: "Solana Wrapper Tool | Token Wrapping Solution",
    description: "Convert tokens between native and wrapped formats on Solana. Simple interface for token wrapping and unwrapping with real-time balance updates.",
    url: "https://leap.io/solana-wrapper",
    siteName: "Leap Trading Infrastructure",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solana Wrapper Tool | Token Wrapping Solution",
    description: "Convert tokens between native and wrapped formats on Solana. Simple interface for token wrapping and unwrapping with real-time balance updates.",
  },
  alternates: {
    canonical: 'https://www.leap-blockchain.com/solana-wrapper'
  },
  other: {
    "google-site-verification": "KtTMBV0PsMKme0FfaQTOlUYnMc4y7jTfcKHDXF_4CzU"
  }
};

const SolanaWrapperPage = () => {
  return (
    <div>
      <SolanaWrapperScreen />
    </div>
  );
};

export default SolanaWrapperPage;
