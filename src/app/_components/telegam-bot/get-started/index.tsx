const TelegramGetStarted = () => {
  return (
    <div className="flex items-center justify-center  mb-[200px]">
      <div className=" flex flex-col items-center justify-center border border-[#131412] rounded-[16px] min-w-[960px]  bg-gradient-to-b from-[#121311] to-[#070806]   h-[340px] ">
        <p className="text-[60px] font-inter font-medium text-white">
        Get Started Today
        </p>
        <p className="text-[16px] font-inter text-[#c6c7c6]">
        Join today and claim a free trial of Leap Node
        </p>
        <button className="mt-[30px] w-[168px] h-[46px] bg-darkPrimary font-inter text-[#231F20] font-medium rounded-[50px] cursor-pointer hover:bg-white">
          Get Started Today
        </button>
      </div>
    </div>
  );
};

export default TelegramGetStarted;
