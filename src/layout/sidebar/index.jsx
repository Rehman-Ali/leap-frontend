"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoClose } from "react-icons/io5";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const pathname = usePathname();
  const [role, setRole] = useState("");

  useEffect(() => {
    let userRole = JSON.parse(localStorage.getItem("role"));
    setRole(userRole);
  }, []);

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-bodyColor dark:text-white  text-[#000000]  border-r dark:border-r-gray-600 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0`}
      >
        <div className="pl-[20px] pt-[13px]  pb-[8px] flex justify-between items-center border-b  dark:border-b-gray-600">
          <Image
            src="/assets/logo1.png"
            height={102}
            width={300}
            alt="logo"
            className="h-[38px] w-[120px]"
          />

          <button
            className="mr-[5px] lg:hidden text-[#00000] dark:text-white"
            onClick={toggleSidebar}
          >
            <IoClose size={20} />
          </button>
        </div>

        {role !== "admin" ? (
          <nav className="mt-[10px] grid items-start px-2 text-sm font-medium lg:px-4 gap-1">
            <Link
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all  font-inter   ${
                pathname === "/dashboard"
                  ? "bg-darkPrimary text-white font-semibold"
                  : "text-black dark:text-white hover:text-darkPrimary"
              } `}
              href="/dashboard"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Dashboard
            </Link>
            <Link
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all     ${
                pathname === "/nodes"
                  ? "bg-darkPrimary text-white font-semibold"
                  : "text-black dark:text-white hover:text-darkPrimary"
              } `}
              href="/nodes"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect>
                <rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect>
                <line x1="6" x2="6.01" y1="6" y2="6"></line>
                <line x1="6" x2="6.01" y1="18" y2="18"></line>
              </svg>
              Nodes
            </Link>
            <Link
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all  ${
                pathname === "/analytics"
                  ? "bg-darkPrimary text-white font-semibold"
                  : "text-black dark:text-white hover:text-darkPrimary"
              } `}
              href="/analytics"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 3v18h18"></path>
                <path d="m19 9-5 5-4-4-3 3"></path>
              </svg>
              Analytics
            </Link>
            <Link
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all  ${
                pathname === "/orders"
                  ? "bg-darkPrimary text-white font-semibold"
                  : "text-black dark:text-white hover:text-darkPrimary"
              } `}
              href="/orders"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
              Orders
            </Link>
            <Link
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all  ${
                pathname === "/affiliate"
                  ? "bg-darkPrimary text-white font-semibold"
                  : "text-black dark:text-white hover:text-darkPrimary"
              } `}
              href="/affiliate"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
                <path d="M12 18V6"></path>
              </svg>
              Affiliate
            </Link>
            <a
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-darkPrimary"
              href="#"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
              Status
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-gray-600 dark:text-white"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" x2="21" y1="14" y2="3"></line>
              </svg>
            </a>
            <a
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-darkPrimary"
              href="https://docs.leap-blockchain.com/"
              target="_blank"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
              </svg>
              Whitepaper
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-gray-600 dark:text-white"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" x2="21" y1="14" y2="3"></line>
              </svg>
            </a>
          </nav>
        ) : (
          <nav className="mt-[10px] grid items-start px-2 text-sm font-medium lg:px-4 gap-1">
            <Link
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all  font-inter   ${
                pathname === "/admin-dashboard"
                  ? "bg-darkPrimary text-white font-semibold"
                  : "text-black dark:text-white hover:text-darkPrimary"
              } `}
              href="/admin-dashboard"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Dashboard
            </Link>
            <Link
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all  ${
                pathname === "/users"
                  ? "bg-darkPrimary text-white font-semibold"
                  : "text-black dark:text-white hover:text-darkPrimary"
              } `}
              href="/users"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
                <path d="M12 18V6"></path>
              </svg>
              Users
            </Link>
            <Link
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all  ${
                pathname === "/subscriptions"
                  ? "bg-darkPrimary text-white font-semibold"
                  : "text-black dark:text-white hover:text-darkPrimary"
              } `}
              href="/subscriptions"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
                <path d="M12 18V6"></path>
              </svg>
              Subscriptions
            </Link>
            <Link
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all  ${
                pathname === "/articles-list" || pathname === "/add-article" 
                  ? "bg-darkPrimary text-white font-semibold"
                  : "text-black dark:text-white hover:text-darkPrimary"
              } `}
              href="/articles-list"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 3v18h18"></path>
                <path d="m19 9-5 5-4-4-3 3"></path>
              </svg>
              Articles
            </Link>
          </nav>
        )}
      </div>

      {/* Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
