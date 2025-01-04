const NodeGetStarted = () => {
  return (
    <div className="flex items-center justify-center mb-16 md:mb-20 lg:mb-24 px-4">
      <div className="flex flex-col items-center justify-center border border-[#131412] rounded-lg w-full max-w-[960px] bg-gradient-to-b from-[#121311] to-[#070806] h-auto py-8 md:py-12">
        <p className="text-3xl md:text-4xl lg:text-5xl font-inter font-medium text-white text-center mb-4">
          Don&apos;t waste any more time
        </p>
        <p className="text-sm md:text-base text-[#c6c7c6] text-center mb-6">
          Join today and claim a free trial of Leap Node
        </p>
        <button className="w-40 h-12 bg-darkPrimary font-inter text-[#231F20] font-medium rounded-full cursor-pointer hover:bg-white transition duration-300">
          Get Started Today
        </button>
      </div>
    </div>
  );
};

export default NodeGetStarted;
