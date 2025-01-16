"use client";

import "animate.css";
import "./globals.css";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import DashboardLayout from "@/layout/dashboard-layout"; // Import the DashboardLayout
import { inter } from "@/utils/fonts";
import { usePathname, useRouter } from "next/navigation";
import { ThemeProvider } from "next-themes";
import {
  DynamicContextProvider
  // DynamicWidget
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { mainnet } from "viem/chains";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { SERVER_URL } from "@/utils/server";
import axios from "axios";
const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http()
  }
});

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  // Determine whether to include the DashboardLayout
  const includeDashboardLayout = pathname
    ? ["/dashboard", "/nodes", "/analytics", "/affiliate", "/orders"].includes(
        pathname
      )
    : false;


  const handleLoginAndRegister = async (userData) => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/user/signin-and-signup`,
        { dp_user_id: userData.userId } // Directly passing an object, no need for JSON.stringify
      );
      console.log(response.data, "Response received");
      localStorage.setItem("u_t", response.data.token.token)
      router.push("/dashboard");
    } catch (error) {
      console.error(
        "Error during login or registration:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <html lang="en">
      <body className={includeDashboardLayout ? "" : "bg-bodyColor"}>
        <DynamicContextProvider
          settings={{
            // Find your environment id at https://app.dynamic.xyz/dashboard/developer
            environmentId: "9108f276-4108-4240-a727-8454153e419d",
            // environmentId: "4d5e50a9-232a-4d0e-bfe9-ebb2d9734982", // HM-comment it
            walletConnectors: [EthereumWalletConnectors],
            events: {
              onAuthSuccess: (args) => {
                console.log("first event call", args.user);
                handleLoginAndRegister(args.user);
              }
            },
            handlers: {
              handleAuthenticatedUser: async (args) => {
                console.log("2nd even call", args);
                await customUserObjectProcess(args.user);
              }
            }
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
                      {/* {pathname !== "/login" && <Footer />} */}
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
