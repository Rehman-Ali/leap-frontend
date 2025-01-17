"use client";

import "animate.css";
import "./globals.css";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import DashboardLayout from "@/layout/dashboard-layout";
import { inter } from "@/utils/fonts";
import { usePathname, useRouter } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { http } from "viem";
import { mainnet } from "viem/chains";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import FullPageLoader from "./_components/loader";
import axios from 'axios';
import { SERVER_URL } from "@/utils/server";
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
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Routes that require authentication (private)
  const privateRoutes = [
    "/dashboard",
    "/nodes",
    "/analytics",
    "/affiliate",
    "/orders"
  ];

  // Check if the token exists
  const token =
    typeof window !== "undefined" ? localStorage.getItem("u_t") : null;

  useEffect(() => {
    // Check if the current route is private
    const isPrivateRoute = privateRoutes.includes(pathname);

    if (isPrivateRoute && !token) {
      // If unauthorized, redirect to login immediately
      router.replace("/login");
    } else {
      // If authorized, allow rendering
      setIsAuthorized(true);
    }
  }, [pathname, token, router]);


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


  //Prevent rendering until authorization check is complete
  if (!isAuthorized && privateRoutes.includes(pathname)) {
    return (
      <html lang="en">
        <body className="bg-bodyColor">
          <FullPageLoader />
        </body>
      </html>
    ); // Block rendering entirely until redirect or authorization is confirmed
  }

  const includeDashboardLayout = privateRoutes.includes(pathname);





  return (
    <html lang="en">
      <body className={includeDashboardLayout ? "" : "bg-bodyColor"}>
        <DynamicContextProvider
          settings={{
            environmentId: "9108f276-4108-4240-a727-8454153e419d",
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
                      {pathname !== "/login" && <Header />}
                      <main className="flex-grow">{children}</main>
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