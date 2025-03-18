"use client";
import { useTheme } from "next-themes";
import { MdLightMode } from "react-icons/md";
import { LuMoonStar } from "react-icons/lu";
const LightDarkButton = () => {
  const { theme, setTheme } = useTheme();

  const handelLightDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div onClick={() => handelLightDarkMode()}>
      <div className="mr-[7px] w-[40px] h-[40px] flex items-center justify-center mw-sm4:w-[36px] mw-sm4:h-[36px] mw-sm4:ml-[0px]">
        <button className="hover:w-[40px] hover:bg-darkPrimary hover:h-[40px] hover:rounded-[50px] hover:shadow-headerIconShadow hover:flex hover:justify-center hover:items-center">
          {theme === "dark"
            ? <LuMoonStar className="text-2xl text-nav-color text-black dark:text-white" />
            : <MdLightMode className="text-2xl text-an-view text-black dark:text-white" />}
        </button>
      </div>
    </div>
  );
};

export default LightDarkButton;
