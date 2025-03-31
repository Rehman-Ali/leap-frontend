import VPSScreen from "@/pages/vps-page";

export const metadata = {
  title: "VPS Hosting | Low-Latency Trading Infrastructure",
  description: "High-performance VPS hosting for Solana trading.Our VPS are hosted in the same rack as our nodes to provide the lowest possible latency for your trading operations.",
  keywords: ["VPS Hosting", "Virtual Private Server", "Low Latency VPS", "Trading VPS", "Solana VPS", "High Performance VPS", "Trading Infrastructure"],
  openGraph: {
    title: "VPS Hosting | Low-Latency Trading Infrastructure",
    description: "High-performance VPS hosting for Solana trading.Our VPS are hosted in the same rack as our nodes to provide the lowest possible latency.",
    url: "https://leap.io/vps",
    siteName: "Leap Trading Infrastructure",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VPS Hosting | Low-Latency Trading Infrastructure",
    description: "High-performance VPS hosting for Solana trading.Our VPS are hosted in the same rack as our nodes to provide the lowest possible latency.",
  },
  alternates: {
    canonical: 'https://www.leap-blockchain.com/vps'
  }
};
  

const page = () =>{


    
return(
    <VPSScreen/>
)
}

export default page;