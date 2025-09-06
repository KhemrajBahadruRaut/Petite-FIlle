"use client";

import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <div className="bg-white">
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Centered faint background image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 pointer-events-none">
          <img src="/mainimage/main-image.webp" className="opacity-30" alt="" />
        </div>

        {/* Title */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-600 mb-4">
            About us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Lorem ipsum dolor sit amet, consectetur adipis scing elit sed do
            eiusmod tempor incididunt
          </p>
        </div>

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-start relative">
          {/* Left text */}
          <div className="md:col-span-6 text-gray-700 leading-relaxed space-y-4 pt-6 md:pt-20 text-sm sm:text-base">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Frame 1 with 2 images */}
          <div className="md:col-span-6 relative w-full max-w-[400px] h-[350px] sm:h-[350px] md:h-[400px] mx-auto">
            {/* Frame background */}
            <motion.img
              src="/about/frame/Frame1.webp"
              alt="Frame 1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              className="absolute inset-0 w-full h-full object-contain z-10"
            />

            {/* Image 1 inside frame */}
            <motion.img
              src="/about/img2.webp"
              alt="Barista"
              initial={{ x: 50, y: 50, opacity: 0 }}
              whileInView={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="absolute top-3 sm:right-48 md:right-44 w-42 sm:w-40 md:w-50 z-12"
            />

            {/* Image 2 inside frame */}
            <motion.img
              src="/about/img1.webp"
              alt="Chef"
              initial={{ x: -50, y: -50, opacity: 0 }}
              whileInView={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="absolute bottom-[-55px] sm:bottom-4 right-4 sm:right-6 w-42 sm:w-44 md:w-48 z-11"
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-start relative">
          {/* Frame 2 with 2 images */}
          <div className="md:col-span-6 max-sm:hidden relative w-full max-w-[400px] h-[300px] sm:h-[350px] md:h-[400px] mx-auto">
            {/* Frame background */}
            <motion.img
              src="/about/frame/Frame2.webp"
              alt="Frame 2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              className="absolute inset-0 w-full h-full object-contain z-10"
            />

            {/* Image 3 inside frame */}
            <motion.img
              src="/about/img3.webp"
              alt="Team"
              initial={{ x: -50, y: 50, opacity: 0 }}
              whileInView={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="absolute right-2 top-5 sm:right-3 w-32 sm:w-40 md:w-46 z-11"
            />

            {/* Image 4 inside frame */}
            <motion.img
              src="/about/img4.webp"
              alt="Discussion"
              initial={{ x: 50, y: -50, opacity: 0 }}
              whileInView={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="absolute bottom-5 left-2 sm:left-3 w-44 sm:w-52 md:w-60 z-12"
            />
          </div>

          {/* Right text */}
          <div className="md:col-span-6 text-gray-700 leading-relaxed space-y-4 pt-16 sm:pt-2 md:pt-20 text-sm sm:text-base">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
