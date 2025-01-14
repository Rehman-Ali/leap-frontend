"use client";

import "animate.css";
import "./globals.css";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import DashboardLayout from "@/layout/dashboard-layout"; // Import the DashboardLayout
import { inter } from "@/utils/fonts";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { mainnet } from "viem/chains";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}) {
  const pathname = usePathname();

  // Determine whether to include the DashboardLayout
  const includeDashboardLayout = pathname
    ? ["/dashboard", "/nodes", "/analytics", "/affiliate", "/orders"].includes(
        pathname
      )
    : false;

  return (
    <html lang="en">
      <body className={includeDashboardLayout ? "" : "bg-bodyColor"}>
        <DynamicContextProvider
          settings={{
            environmentId: "4d5e50a9-232a-4d0e-bfe9-ebb2d9734982",
            walletConnectors: [EthereumWalletConnectors],
          }}
        >
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <DynamicWagmiConnector>
                <ThemeProvider attribute="class" defaultTheme="dark">
                  {includeDashboardLayout ? (
                    <DashboardLayout>{children}</DashboardLayout>
                  ) : (
                    <div
                      className={`${inter.variable} container mx-auto min-h-screen flex flex-col`}
                    >
                      {/* Standard Header/Footer Layout */}
                      {pathname !== "/login" && <Header />}
                      <main className="flex-grow">{children}</main>
                      {pathname !== "/login" && <Footer />}
                    </div>
                  )}
                </ThemeProvider>
              </DynamicWagmiConnector>
            </QueryClientProvider>
          </WagmiProvider>
        </DynamicContextProvider>
      </body>
      
    </html>
  );
}
