import Image from "next/image";
import { FaXTwitter, FaTelegram , FaDiscord} from "react-icons/fa6";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-bodycolor">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-10">
        {/* Top Section */}
        <div className="flex flex-wrap lg:flex-nowrap justify-between items-start gap-8">
          {/* Logo and Description */}
          <div className="w-full lg:w-1/2">
            <Image
              src="/assets/layout/logo.png"
              height={52}
              width={150}
              alt="Leap Logo"
              className="h-auto w-[150px]"
            />
            <p className="text-white text-sm lg:text-base mw-10:max-w-full max-w-[380px] font-inter py-4">
              Trade easier, faster, and more consistently than ever before.
            </p>
            <div className="flex gap-3">
              {[
                { icon: FaDiscord, href: "https://discord.gg/9UXPJgnZ5q", size: 22 },
                { icon: FaXTwitter, href: "https://x.com/leap_io?s=21&t=CmssjaT_wwKceUeLUz12aA", size: 20 },
                { icon: FaTelegram, href: "https://t.me/leaptrading_bot", size: 22 },
              ].map(({ icon: Icon, href, size }, idx) => (
                <a
                  key={idx}
                  href={href}
                  className="h-8 w-8 bg-[#393938] hover:bg-darkPrimary rounded-full flex items-center justify-center transition-all"
                >
                  <Icon size={size} className="text-[#37F94E] hover:text-black" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="w-full lg:w-1/5">
            <p className="text-lg lg:text-xl font-medium text-white">Page</p>
            <nav className="flex flex-col gap-3 mt-4">
              {[
                { name: "Home", href: "/" },
                { name: "RPC", href: "/rpc" },
                { name: "Telegram Bot", href: "/telegram-bot" },
                { name: "Trading Bot", href: "/trading-bot" },
                { name: "VPS", href: "/vps" },
                { name: "Articles", href: "/articles" },
              ].map(({ name, href }, idx) => (
                <Link
                  key={idx}
                  href={href}
                  className="text-sm lg:text-base text-white font-inter hover:text-darkPrimary transition-colors"
                >
                  {name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Section */}
          <div className="w-full lg:w-1/5">
            <p className="text-lg lg:text-xl font-medium text-white">
              Contact Us
            </p>
            <div className="mt-4">
              <a
                href="mailto:leapsolananode@gmail.com"
                className="text-sm lg:text-base text-white font-inter hover:text-darkPrimary transition-colors"
              >
                leapsolananode@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#393938] my-8"></div>
      </div>
    </footer>
  );
};

export default Footer;
