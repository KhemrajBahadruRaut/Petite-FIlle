import React from "react";

const MainPage = () => {
  return (
    <div className="bg-white">

    <div className="w-full grid grid-cols-1 md:grid-cols-2  bg-white container mx-auto">
      {/* Left Section */}
      <div className="flex flex-col justify-between items-center p-6">
        {/* Top Image */}
        <div className="flex justify-center w-full pt-55">
          <img
            src="/homepage/petiteFille.webp"
            alt="Left Section"
            className="w-3/4 max-w-sm md:max-w-md lg:max-w-lg object-contain"
          />
        </div>

        {/* Bottom Buttons */}
        <div className="flex gap-14 justify-center w-full py-6">
          <button className="px-10 md:px-10 border border-[#B7AA99] text-[#B7AA99] py-4 shadow-md">
            <span className="text-2xl">Book A Table</span>
          </button>
          <button className="px-10 md:px-10 bg-[#B7AA99] text-white py-3 shadow-md">
            <span className="text-2xl">Order Online</span>
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex justify-center items-center bg-white p-6">
        <img
          src="/mainimage/main-image.webp"
          alt="Right Section"
          className="w-3/4 max-w-sm md:max-w-md lg:max-w-xl object-contain"
        />
      </div>
    </div>
        </div>

  );
};

export default MainPage;
