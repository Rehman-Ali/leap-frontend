const OrderScreen = () => {
  return (
    <div className="h-full w-full max-w-[100vw] flex justify-center dark:bg-bodyColor bg-white">
      <div className="h-full w-full max-w-[1500px] p-2 lg:p-5">
        <div className="flex justify-between">
          <h1 className="font-semibold text-xl flex items-center dark:text-white">
            Pending Payments
            <span className="bg-darkPrimary text-black dark:text-white text-sm px-2 py-0.5 h-fit ml-5 rounded-lg">
              0
            </span>
          </h1>
        </div>
        <hr className="mt-4 mb-6" />
        <div className=""></div>
      </div>
    </div>
  );
};

export default OrderScreen;
