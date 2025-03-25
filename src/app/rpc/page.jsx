import RPCScreen from "@/pages/rpc-page";

export const metadata = {
  title: "Solana RPC Node | High-Performance Trading Infrastructure",
  description: "Experience lightning-fast Solana RPC nodes with features like GRPC, JitoShred, Bloxroute BDM, and unlimited TPS. Optimized for high-frequency trading and MEV protection.",
  keywords: ["Solana RPC", "RPC Node", "GRPC", "JitoShred", "Bloxroute", "High Performance RPC", "Solana Infrastructure", "MEV Protection", "Trading RPC"],
  openGraph: {
    title: "Solana RPC Node | High-Performance Trading Infrastructure",
    description: "Experience lightning-fast Solana RPC nodes with features like GRPC, JitoShred, Bloxroute BDM, and unlimited TPS. Optimized for high-frequency trading.",
    url: "https://leap.io/rpc",
    siteName: "Leap Trading Infrastructure",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solana RPC Node | High-Performance Trading Infrastructure",
    description: "Experience lightning-fast Solana RPC nodes with features like GRPC, JitoShred, Bloxroute BDM, and unlimited TPS. Optimized for high-frequency trading.",
  },
};

  
const page = () =>{
return(
    <RPCScreen/>
)
}

export default page;