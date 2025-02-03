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
import axios from "axios";
import { SERVER_URL } from "@/utils/server";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import "@solana/wallet-adapter-react-ui/styles.css"; // Optional UI styles for wallets

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  // Solana wallet adapters
  const wallets = [new PhantomWalletAdapter()];

  // Define routes
  const privateRoutes = [
    "/dashboard",
    "/nodes",
    "/analytics",
    "/affiliate",
    "/orders",
    "/buy",
    "/admin-dashboard",
    "/subscriptions",
    "/users",
    "/articles-list",
    "/add-article",
  ];
  const publicRoutes = [
    "/",
    "/login",
    "/telegram-bot",
    "/rpc",
    "/trading-bot",
    "/vps",
  ]; // Add all public routes here

  // Check for token
  const token =
    typeof window !== "undefined" ? localStorage.getItem("u_t") : null;

  useEffect(() => {
    const isPrivateRoute = privateRoutes.includes(pathname);
    const isPublicRoute = publicRoutes.includes(pathname);

    if (token) {
      // If the user has a token and tries to access a public route, redirect to a private route
      if (isPublicRoute) {
        let role = JSON.parse(localStorage.getItem("role"));
        if (role === "admin") {
          router.replace("/admin-dashboard"); // Redirect to the first private route (e.g., dashboard)
        } else {
          router.replace(privateRoutes[0]); // Redirect to the first private route (e.g., dashboard)
        }
      } else {
        setIsAuthorized(true);
      }
    } else {
      // If the user does not have a token and tries to access a private route, redirect to login
      if (isPrivateRoute) {
        localStorage.setItem("c_path", pathname);
        router.replace("/login");
      } else {
        setIsAuthorized(true);
      }
    }
  }, [pathname, token, router]);

  const handleLoginAndRegister = async (userData) => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/user/signin-and-signup`,
        {
          dp_user_id: userData.userId,
        }
      );
      console.log(response.data, "Response received");
      localStorage.setItem("u_t", JSON.stringify(response.data.token.token));
      localStorage.setItem("role", JSON.stringify(response.data.token.role));
      let prev_path = localStorage.getItem("c_path");
      if (prev_path === null || prev_path === undefined) {
        if (response.data.token.role === "admin") {
          router.push("/admin-dashboard");
        } else {
          router.push("/dashboard");
        }
      } else {
        console.log("else working");
        router.push(prev_path);
        localStorage.removeItem("c_path");
      }
    } catch (error) {
      console.error(
        "Error during login or registration:",
        error.response?.data || error.message
      );
    }
  };

  // Prevent rendering until authorization check is complete
  if (!isAuthorized) {
    return (
      <html lang="en">
        <body className="bg-bodyColor">
          <FullPageLoader />
        </body>
      </html>
    );
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
              },
            },
            handlers: {
              handleAuthenticatedUser: async (args) => {
                console.log("2nd even call", args);
                await customUserObjectProcess(args.user);
              },
            },
          }}
        >
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <DynamicWagmiConnector>
                <ThemeProvider attribute="class" defaultTheme="dark">
                  {includeDashboardLayout ? (
                    //  {/* Solana Payment Checkout */}
                    <ConnectionProvider endpoint="https://api.devnet.solana.com">
                      <WalletProvider wallets={wallets} autoConnect>
                        <DashboardLayout>{children}</DashboardLayout>
                      </WalletProvider>
                    </ConnectionProvider>
                  ) : (
                    <div
                      className={`${inter.variable} container mx-auto min-h-screen flex flex-col`}
                    >
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
