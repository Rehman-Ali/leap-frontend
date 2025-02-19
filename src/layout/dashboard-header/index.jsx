import LightDarkButton from "@/app/_components/dashboard/light-dark-btn";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardHeader({ toggleSidebar }) {
  const { user, handleLogOut } = useDynamicContext();
  const [clientUser, setClientUser] = useState(null);
    console.log(user, 'user======')

  useEffect(() => {
    // Ensure `user` is only set after hydration
    setClientUser(user);
  }, [user]);

  const onLogoutHandler = () => {
    handleLogOut();
    localStorage.removeItem("u_t");
    localStorage.removeItem("role");
    setTimeout(() => {
      redirect("/");
    }, 2000);
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-bodyColor w-full flex h-14 items-center justify-between gap-4 border-b dark:border-b-gray-600 px-4 lg:h-[60px] lg:px-6">
      <button
        className="mw-10:flex text-black dark:text-white justify-center items-center font-semibold gap-2.5 text-sm px-5 py-2 rounded-md hover:scale-[1.01] transition-all duration-200 transform-gpu shrink-0 hidden"
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="radix-:r0:"
        data-state="closed"
        onClick={toggleSidebar}
      >
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </button>
      <div className="flex items-center gap-5 ml-auto">
        <LightDarkButton />
        <div className="flex gap-2 items-center">
          <div
            data-tooltip-id="tooltip"
            data-tooltip-content="Wallet Connected"
            className="w-2 h-2 rounded-full bg-green-500"
          />
          {clientUser && (
            <div
              data-tooltip-id="tooltip"
              data-tooltip-content="Account Public Key"
              className="font-semibold text-sm text-black dark:text-white"
            >
              {clientUser.userId.slice(0, 3)}...{clientUser.userId.slice(-3)}
            </div>
          )}
        </div>
        <div onClick={() => onLogoutHandler()}>
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-auto text-black dark:text-white cursor-pointer hover:opacity-90"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
        </div>
      </div>
    </header>
  );
}
