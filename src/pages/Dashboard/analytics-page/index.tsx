const AnalyticsScreen = () => {
  return (
    <div className="h-full w-full max-w-[100vw] flex justify-center dark:bg-bodyColor bg-white">
      <div className="h-full w-full max-w-[1500px] p-2 lg:p-5">
        <div className="flex flex-col h-full items-center justify-center text-center">
          <span className="bg-gradient-to-b from-darkPrimary to-transparent bg-clip-text text-7xl lg:text-[8rem] text-blackfont-extrabold leading-none text-transparent">
            Analytics
          </span>
          <h2 className="font-heading my-2 text-2xl lg:text-3xl font-bold dark:text-white">
            Coming Soon
          </h2>
          <p className="text-sm lg:text-base dark:text-white">
            Track your nodes performance and more with our analytics page.
            <br />
            Check back soon for updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsScreen;
