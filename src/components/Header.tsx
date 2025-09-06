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
          <a href="/">
            <img
              src="/logo/logo.webp"
              alt="logo"
              width={50}
              height={50}
              className="z-10 cursor-pointer hover:scale-115 transition-all duration-500"
            />
          </a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          {/* <div className="hoverborder-b"> */}
          <a href="/aboutUs" className="hover:text-[#B7AA99] relative group transition-all hover:scale-105 ">
            About Us
            <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-[#B7AA99] transition-all duration-300 group-hover:w-full"></span>
          </a>
          {/* </div> */}
          <a href="/gallery" className="hover:text-[#B7AA99] relative group  transition-all hover:scale-105">
            Gallery
            <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-[#B7AA99] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="/merchandise"
            className="hover:text-[#B7AA99] relative group  transition-all hover:scale-105"
          >
            Merchandise
            <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-[#B7AA99] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/catering" className="hover:text-[#B7AA99] relative group  transition-all hover:scale-105 ">
            Catering
            <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-[#B7AA99] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="careers" className="hover:text-[#B7AA99] relative group  transition-all hover:scale-105">
            Careers
            <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-[#B7AA99] transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>

        {/* Icons (right side) */}
        <div className="flex items-center gap-4">
          <span className="hidden md:block relative group hover:text-[#B7AA99] cursor-pointer  transition-all hover:scale-105 ">
            Menu
            <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-[#B7AA99] transition-all duration-300 group-hover:w-full"></span>
          </span>
          <PiUserCircle className="size-8" />
          <div className="p-2 rounded-full bg-gray-500">
            <MdOutlineShoppingCart className="text-white" />
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <HiX className="size-7" />
            ) : (
              <HiMenu className="size-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="flex flex-col items-center gap-4 py-4 bg-black/80 md:hidden">
          <a href="/aboutUs" className="hover:text-[#B7AA99]">
            About Us
          </a>
          <a href="/gallery" className="hover:text-[#B7AA99]">
            Gallery
          </a>
          <a href="merchandise" className="hover:text-[#B7AA99]">
            Merchandise
          </a>
          <a href="catering" className="hover:text-[#B7AA99]">
            Catering
          </a>
          <a href="careers" className="hover:text-[#B7AA99]">
            Careers
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
