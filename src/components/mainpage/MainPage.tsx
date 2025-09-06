"use client";
import { motion } from "framer-motion";
import React from "react";

const MainPage = () => {
  return (
    <div className="bg-white  pb-14">
      <div className="w-full grid grid-cols-1 md:grid-cols-2  bg-white container mx-auto">
        {/* Left Section */}
        <div className="flex flex-col justify-between items-center p-6">
          {/* Top Image */}
          <div className="flex justify-center w-full md:pt-40">
            <motion.img
              initial={{ x: 200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              src="/homepage/petiteFille.webp"
              alt="Left Section"
              className="w-3/4 max-w-sm md:max-w-md lg:max-w-lg object-contain"
            />
          </div>

          {/* Bottom Buttons */}
          <motion.div
            initial={{ x: 210, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, amount: 0.3 }}
            className="hidden md:flex flex-wrap gap-14 justify-center w-full py-6"
          >
            <button className="px-10  border border-[#B7AA99] text-[#B7AA99] py-3 shadow-md hover:rounded-tl-3xl hover:rounded-br-3xl transition-all duration-300">
              <span className="text-sm sm:text-2xl">Book A Table</span>
            </button>
            <button className="px-10 bg-[#B7AA99] text-white py-3 shadow-md hover:rounded-bl-3xl hover:rounded-tr-3xl transition-all duration-300">
              <span className="text-sm sm:text-2xl">Order Online</span>
            </button>
          </motion.div>
        </div>

        {/* Right Section */}
        <div className="flex justify-center items-center bg-white p-6 sm:pt-10">
      <motion.img
        src="/mainimage/main-image.webp"
        alt="Right Section"
        className="w-3/4 max-w-sm md:max-w-md lg:max-w-xl object-contain"
        initial={{ scale: 0.2, rotate: -90, opacity: 0 }}
        whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{
          duration: 1.5,
          ease: "easeOut",
        }}
        viewport={{ once: true, amount: 0.3 }}
      />
    </div>
        <div className="flex flex-wrap md:hidden gap-5 justify-center w-full py-6">
          <button className="px-10  border border-[#B7AA99] text-[#B7AA99] py-3 shadow-md hover:rounded-tl-3xl hover:rounded-br-3xl transition-all duration-300">
            <span className="text-sm sm:text-2xl">Book A Table aka</span>
          </button>
          <button className="px-10 bg-[#B7AA99] text-white py-3 shadow-md hover:rounded-bl-3xl hover:rounded-tr-3xl transition-all duration-300 rounded-tr-3xl rounded-bl-3xl">
            <span className="text-sm sm:text-2xl">Order Online</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
