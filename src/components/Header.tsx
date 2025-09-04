"use client";

import React, { useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { PiUserCircle } from "react-icons/pi";
import { HiMenu, HiX } from "react-icons/hi";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white text-white ">
      <div className="flex items-center justify-between px-5 py-3 border bg-black/20 rounded-full container mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/logo/logo.webp"
            alt="logo"
            width={50}
            height={50}
            className="z-10"
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#" className="hover:text-[#B7AA99]">About Us</a>
          <a href="#" className="hover:text-[#B7AA99]">Gallery</a>
          <a href="#" className="hover:text-[#B7AA99]">Merchandise</a>
          <a href="#" className="hover:text-[#B7AA99]">Catering</a>
          <a href="#" className="hover:text-[#B7AA99]">Careers</a>
        </nav>

        {/* Icons (right side) */}
        <div className="flex items-center gap-4">
          <span className="hidden md:block">Menu</span>
          <PiUserCircle className="size-8" />
          <div className="p-2 rounded-full bg-gray-500">
            <MdOutlineShoppingCart className="text-white" />
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX className="size-7" /> : <HiMenu className="size-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="flex flex-col items-center gap-4 py-4 bg-black/80 md:hidden">
          <a href="#" className="hover:text-[#B7AA99]">About Us</a>
          <a href="#" className="hover:text-[#B7AA99]">Gallery</a>
          <a href="#" className="hover:text-[#B7AA99]">Merchandise</a>
          <a href="#" className="hover:text-[#B7AA99]">Catering</a>
          <a href="#" className="hover:text-[#B7AA99]">Careers</a>
        </nav>
      )}
    </header>
  );
};

export default Header;
