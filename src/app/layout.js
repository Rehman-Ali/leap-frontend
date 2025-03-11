"use client";

import "animate.css";
import "./globals.css";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import DashboardLayout from "@/layout/dashboard-layout";
import { inter } from "@/utils/fonts";
import { usePathname, useRouter, notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import { useEffect, useState, Suspense } from "react";
import FullPageLoader from "./_components/loader";
import axios from "axios";
import { SERVER_URL } from "@/utils/server";
import Swal from "sweetalert2";
import Script from "next/script"; // ✅ Import next/script

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New loading state
  // Define private routes and admin routes
  const privateRoutes = [
    "/dashboard",
    "/nodes",
    "/analytics",
    "/affiliate",
    "/invoices",
    "/buy",
    "/buy-vps",
    "/vps-info"
  ];
  const adminRoutes = [
    "/admin-dashboard",
    "/subscriptions",
    "/users",
    "/articles-list",
    "/add-article",
    "/update-article"
  ];
  const publicRoutes = [
    "/",
    "/login",
    "/telegram-bot",
    "/rpc",
    "/trading-bot",
    "/vps",
    "/not-found"
  ];

  const token =
    typeof window !== "undefined" ? localStorage.getItem("u_t") : null;

  // useEffect(() => {
  //   const isPrivateRoute = privateRoutes.includes(pathname);
  //   const isAdminRoute = adminRoutes.includes(pathname);
  //   const isPublicRoute = publicRoutes.includes(pathname);
  //   const role = JSON.parse(localStorage.getItem("role"));
  //   const allRoutes = [...privateRoutes, ...adminRoutes, ...publicRoutes];

  //   if (!allRoutes.includes(pathname)) {
  //     if (pathname !== "/not-found") {
  //       router.replace("/not-found");
  //     }
  //     setIsLoading(false);
  //     return;
  //   }

  //   if (token) {
  //     if (isPrivateRoute) {
  //       if (role === "admin") {
  //         router.replace("/admin-dashboard");
  //       } else {
  //         setIsAuthorized(true);
  //       }
  //     } else if (isAdminRoute) {
  //       if (role !== "admin") {
  //         router.replace("/dashboard");
  //       } else {
  //         setIsAuthorized(true);
  //       }
  //     } else if (isPublicRoute) {
  //       setIsAuthorized(true); // ✅ Allow public route
  //     }
  //   } else {
  //     if (isPrivateRoute || isAdminRoute) {
  //       localStorage.setItem("c_path", pathname);
  //       router.replace("/login");
  //     } else if (isPublicRoute) {
  //       setIsAuthorized(true); // Allow public routes without login
  //     }
  //   }

  //   setIsLoading(false);
  // }, [pathname, token, router]);

  useEffect(() => {
    const isPrivateRoute = privateRoutes.includes(pathname);
    const isAdminRoute = adminRoutes.includes(pathname);
    const isPublicRoute = publicRoutes.includes(pathname);
    const role = JSON.parse(localStorage.getItem("role"));
    const allRoutes = [...privateRoutes, ...adminRoutes, ...publicRoutes];

    // 🔹 Check invalid route
    if (!allRoutes.includes(pathname)) {
      if (pathname !== "/not-found") {
        router.replace("/not-found");
      }
      setIsLoading(false);
      return;
    }

    if (token) {
      // 🔹 Token exists, so no redirect to login ever
      if (isPrivateRoute) {
        if (role === "admin") {
          router.replace("/admin-dashboard");
        } else {
          setIsAuthorized(true);
        }
      } else if (isAdminRoute) {
        if (role !== "admin") {
          router.replace("/dashboard");
        } else {
          setIsAuthorized(true);
        }
      } else if (isPublicRoute) {
        setIsAuthorized(true); // ✅ Allow public routes with token
      }
    } else {
      // 🔹 No token, handle access control
      if (isPrivateRoute || isAdminRoute) {
        localStorage.setItem("c_path", pathname);
        router.replace("/login");
      } else if (isPublicRoute) {
        setIsAuthorized(true); // Allow public routes without login
      }
    }

    setIsLoading(false);
  }, [pathname, token, router]);

  const handleLoginAndRegister = async (userData) => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/user/signin-and-signup`,
        {
          dp_user_id: userData.userId
        }
      );

      console.log(response.data, "Response received");
      localStorage.setItem("u_t", JSON.stringify(response.data.token.token));
      localStorage.setItem("role", JSON.stringify(response.data.token.role));
      let prev_path = localStorage.getItem("c_path");

      if (!prev_path) {
        router.push(
          response.data.token.role === "admin"
            ? "/admin-dashboard"
            : "/dashboard"
        );
      } else {
        router.push(prev_path);
        localStorage.removeItem("c_path");
      }
    } catch (error) {
      console.error(
        "Error during login or registration:",
        error.response?.data || error.message
      );

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

  if (isLoading) {
    return (
      <html lang="en">
        <body className="bg-bodyColor">
          <FullPageLoader />
        </body>
      </html>
    );
  }

  if (!isAuthorized) {
    return null; // Or a redirect component, or just null if already redirected
  }
  const includeDashboardLayout =
    privateRoutes.includes(pathname) || adminRoutes.includes(pathname);

  return (
    <html lang="en">
       {/* ✅ Google Analytics Script */}
       <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-EG8RE8E6ZQ"
      />
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EG8RE8E6ZQ');
          `,
        }}
      />
      <DynamicContextProvider
        theme="auto"
        settings={{
          environmentId: "890bd12b-48e4-4363-869d-e092bac005da", /// live key used alchemy site for RPC url
          // environmentId: "bba18406-90b4-4f4a-afc8-43778dd6c123", //// sandbox
          walletConnectors: [SolanaWalletConnectors],
          events: {
            onAuthSuccess: (args) => {
              handleLoginAndRegister(args.user);
            }
          }
        }}
      >
        <body className={includeDashboardLayout ? "" : "bg-bodyColor"}>
          <Suspense fallback={<FullPageLoader />}>
            <ThemeProvider attribute="class" defaultTheme="dark">
              {includeDashboardLayout ? (
                <DashboardLayout>{children}</DashboardLayout>
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
          </Suspense>
         
        </body>
      </DynamicContextProvider>
    </html>
  );
}
