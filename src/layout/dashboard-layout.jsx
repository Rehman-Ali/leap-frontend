"use client";

import Sidebar from "@/layout/sidebar";
import DashboardHeader from "@/layout/dashboard-header";
import { useState } from "react";

export default function DashboardLayout({
  children,
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen dark:bg-bodyColor bg-white">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Content Area */}
      <div className="flex-grow lg:ml-64">
        {/* Dashboard Header */}
        <DashboardHeader toggleSidebar={toggleSidebar} />
        {/* Main Content */}
        <main className=" mw-7:pt-[70px]">{children}</main>
        {/* <main className=" mw-7:pt-[70px] p-4">{children}</main> */}
      </div>
    </div>
  );
}
