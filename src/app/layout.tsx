"use client";

import "animate.css";
import "./globals.css";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import DashboardLayout from "@/layout/dashboard-layout"; // Import the DashboardLayout
import { inter } from "@/utils/fonts";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      </body>
    </html>
  );
}
