import Image from "next/image";

const NodeHeroSection = () => {
  return (
    <div className="relative mt-24 min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/assets/home/hero-section/bg.png')] bg-cover bg-center scale-[1.2] transition-transform duration-1000 -z-10"></div>

      {/* Content */}
      <div className="relative flex flex-col h-full z-10">
        {/* Hero Section */}
        <div className="flex flex-col justify-center items-center px-4 space-y-4">
          <h1 className="text-white text-center text-4xl sm:text-5xl lg:text-6xl font-inter font-medium">
            Leap <span className="text-darkPrimary">Node</span>
          </h1>
          <p className="text-[#C6C7C6] text-center text-base sm:text-lg font-inter font-medium">
            Land transactions faster and more consistently than ever before
          </p>
        </div>

        {/* Features Section */}
        <div className="flex flex-col items-center justify-center mt-16">
          <p className="text-white text-center text-3xl sm:text-4xl lg:text-5xl font-inter font-medium">
            Features
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mt-8 px-4">
          {[
            { src: "/assets/node/node1.png", text: "GRPC" },
            { src: "/assets/node/node2.png", text: "JitoShred" },
            { src: "/assets/node/node3.png", text: "Bloxroute BDM" },
            { src: "/assets/node/node1.png", text: "Unlimited TPS" },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-4 w-full sm:w-[45%] lg:w-[23%] bg-[#131412] rounded-lg p-6"
            >
              <Image
                src={feature.src}
                height={48}
                width={48}
                alt="feature logo"
                className="object-contain"
              />
              <p className="text-lg sm:text-xl text-white font-inter font-medium">
                {feature.text}
              </p>
            </div>
          ))}
        </div>

        {/* Benchmark Section */}
        <div className="flex flex-col items-center justify-center mt-24 px-4">
          <p className="text-white text-center text-base sm:text-lg font-inter ">
            Land transactions faster and more consistently than ever before
          </p>
          <button className="mt-5 w-32 sm:w-36 h-12 bg-darkPrimary text-sm sm:text-base font-inter text-[#231F20] font-medium rounded-full cursor-pointer hover:bg-white transition duration-300">
            Join Now
          </button>
          <p className="text-white pb-[20px] text-center text-4xl sm:text-5xl lg:text-6xl font-inter font-medium mt-6">
            Benchmark
          </p>
          <Image
            src="/assets/node/benchmark.jpg"
            height={600}
            width={1170}
            alt="benchmark logo"
            className="mt-6 w-full max-w-4xl h-auto object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default NodeHeroSection;
