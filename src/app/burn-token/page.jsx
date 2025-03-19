import BurnTokenToolScreen from "@/app/_components/tools-components/burn-token-tool";

export const metadata = {
  title: "Leap",
  description: "",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  other: {
    "google-site-verification": "KtTMBV0PsMKme0FfaQTOlUYnMc4y7jTfcKHDXF_4CzU"
  }
};

const BurnTokenPage = () => {
  return (
    <div>
      <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/home/hero-section/bg.png')" }}
      >
        <div className="flex items-center justify-center min-h-screen ">
          <div className="flex flex-col items-center justify-center mw-4:w-[340px] mw-9:w-[360px] mw-5:w-[400px] w-[600px] bg-[#1d1d1d] p-5 rounded-[12px]">
            <h1 className="text-[32px] mw-7:text-[24px] text-center font-inter text-darkPrimary font-medium">
              Disclaimer
            </h1>

            <p className="py-[10px] text-[16px] mw-7:text-[14px] font-inter text-white font-normal">
              The burn tool on the Sol-Incinerator tool is used to facilitate
              the irreversible burning of your tokens.
            </p>
            <p className="py-[10px] text-[16px] mw-7:text-[14px]  font-inter text-white font-normal">
              By using this tool, you are doing so at your own risk. The
              Sol-Incinerator is not responsible for any tokens burned as a
              result of its usage.
            </p>
            <p className="py-[10px] text-[16px] mw-7:text-[14px] font-inter text-white font-normal">
              By using the tool you explicitly accept full responsibility for
              any and all burns.
            </p>
            <p className="py-[10px] text-[16px] mw-7:text-[14px]  font-inter text-white font-normal">
              The Sol-Incinerator tool additionally does not assume liability
              for any mistakes, accidents, miss-intentions or any other actions
              that led to an undesired burn.
            </p>

            <button
              // onClick={() => setAgree(true)}
              className="my-[15px]  px-8 py-3 uppercase bg-darkPrimary font-inter text-sm sm:text-base text-[#231F20] font-semibold rounded-full cursor-pointer hover:bg-white transition duration-300"
            >
              Agree and close
            </button>
          </div>
        </div>
      </div>
      {/* <BurnTokenToolScreen /> */}
    </div>
  );
};

export default BurnTokenPage;
