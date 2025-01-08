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

  // Determine whether to include the Header/Footer
  const includeDashboardLayout = pathname
    ? ["/dashboard", "/nodes", "/analytics", "/affiliate", "/orders"].includes(
        pathname
      )
    : false;

  return (
    <html lang="en">
      {includeDashboardLayout ? (
        <body className="">
          <ThemeProvider attribute="class" defaultTheme="system">
            <DashboardLayout>{children}</DashboardLayout>
          </ThemeProvider>
        </body>
      ) : (
        <body className="bg-bodyColor">
          <ThemeProvider>
            <div
              className={`${inter.variable} container mx-auto min-h-screen flex flex-col`}
            >
              {/* Standard Header/Footer Layout */}
              {pathname !== "/login" ? <Header /> : ""}
              <main className="flex-grow">{children}</main>
              {pathname !== "/login" ? <Footer /> : ""}
            </div>
          </ThemeProvider>
        </body>
      )}
    </html>
  );
}
