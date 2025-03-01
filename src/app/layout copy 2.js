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
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { useEffect, useState, Suspense } from "react";
import FullPageLoader from "./_components/loader";
import axios from "axios";
import { DYNAMIC_XYZ_TOKEN, SERVER_URL } from "@/utils/server";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import "@solana/wallet-adapter-react-ui/styles.css";
import Swal from "sweetalert2";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

 
  // Solana wallet adapters
  const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

  // Define private routes and admin routes
  const privateRoutes = ["/dashboard", "/nodes", "/analytics", "/affiliate", "/orders", "/buy", "/buy-vps"];
  const adminRoutes = ["/admin-dashboard", "/subscriptions", "/users", "/articles-list", "/add-article", "/update-article"];
  const publicRoutes = ["/", "/login", "/telegram-bot", "/rpc", "/trading-bot", "/vps"];

  const token = typeof window !== "undefined" ? localStorage.getItem("u_t") : null;

  useEffect(() => {
    const isPrivateRoute = privateRoutes.includes(pathname);
    const isAdminRoute = adminRoutes.includes(pathname);
    const isPublicRoute = publicRoutes.includes(pathname);
    const role = JSON.parse(localStorage.getItem("role"));

    if (token) {
      if (isPublicRoute) {
        if (role === "admin") {
          router.replace("/admin-dashboard");
        } else {
          router.replace(privateRoutes[0]);
        }
      } else if (isPrivateRoute) {
        if (role === "admin") {
          router.replace(adminRoutes[0]);
        } else {
          setIsAuthorized(true);
        }
      } else if (isAdminRoute) {
        if (role !== "admin") {
          router.replace(privateRoutes[0]);
        } else {
          setIsAuthorized(true);
        }
      }
    } else {
      if (isPrivateRoute || isAdminRoute) {
        localStorage.setItem("c_path", pathname);
        router.replace("/login");
      } else {
        setIsAuthorized(true);
      }
    }
  }, [pathname, token, router]);

  useEffect(() => {
    console.log("Available Wallets:",  SolanaWalletConnectors);
  }, []);

  const handleLoginAndRegister = async (userData) => {
    try {
      const response = await axios.post(`${SERVER_URL}/api/user/signin-and-signup`, {
        dp_user_id: userData.userId
      });

      console.log(response.data, "Response received");
      localStorage.setItem("u_t", JSON.stringify(response.data.token.token));
      localStorage.setItem("role", JSON.stringify(response.data.token.role));
      let prev_path = localStorage.getItem("c_path");

      if (!prev_path) {
        router.push(response.data.token.role === "admin" ? "/admin-dashboard" : "/dashboard");
      } else {
        router.push(prev_path);
        localStorage.removeItem("c_path");
      }
    } catch (error) {
      console.error("Error during login or registration:", error.response?.data || error.message);

      setTimeout(() => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
      }, 1000);

      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response?.data.message || "Login failed",
        showConfirmButton: false,
        timer: 2500
      });
    }
  };

  if (!isAuthorized) {
    return (
      <html lang="en">
        <body className="bg-bodyColor">
          <FullPageLoader />
        </body>
      </html>
    );
  }

  const includeDashboardLayout = privateRoutes.includes(pathname) || adminRoutes.includes(pathname);

  return (
    <html lang="en">
      <body className={includeDashboardLayout ? "" : "bg-bodyColor"}>
        <Suspense fallback={<FullPageLoader />}>
          <DynamicContextProvider
            settings={{
              environmentId: "890bd12b-48e4-4363-869d-e092bac005da",
              walletConnectors: [EthereumWalletConnectors],
              events: {
                onAuthSuccess: (args) => {
                  handleLoginAndRegister(args.user);
                }
              }
            }}
          >
            <ThemeProvider attribute="class" defaultTheme="dark">
              {includeDashboardLayout ? (
                <ConnectionProvider endpoint="https://solana-mainnet.g.alchemy.com/v2/4VXLhF5hI-rUSBOadb5UeDp4YZ0Gc31p">
                  <WalletProvider wallets={wallets} autoConnect>
                    <DashboardLayout>{children}</DashboardLayout>
                  </WalletProvider>
                </ConnectionProvider>
              ) : (
                <div className={`${inter.variable} container mx-auto min-h-screen flex flex-col`}>
                  {pathname !== "/login" && <Header />}
                  <main className="flex-grow">{children}</main>
                  {pathname !== "/login" && <Footer />}
                </div>
              )}
            </ThemeProvider>
          </DynamicContextProvider>
        </Suspense>
      </body>
    </html>
  );
}
