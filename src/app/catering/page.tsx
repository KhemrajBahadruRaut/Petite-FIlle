"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BiRightArrow } from "react-icons/bi";
import Link from "next/link";

interface Package {
  id: number;
  image: string;
  title: string;
  desc: string;
  price: string;
}

const packages: Package[] = [
  {
    id: 1,
    image: "/gallery/img1.webp",
    title: "The Sunrise Spread",
    desc: "The ultimate start to a productive day.",
    price: "$185 AUD / 10 people",
  },
  {
    id: 2,
    image: "/gallery/img2.webp",
    title: "The Lunch Feast",
    desc: "A hearty meal to keep you going.",
    price: "$250 AUD / 10 people",
  },
  {
    id: 3,
    image: "/gallery/img3.webp",
    title: "The Evening Delight",
    desc: "Wind down with tasty bites.",
    price: "$200 AUD / 10 people",
  },
];

const Page = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? packages.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === packages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-12 bg-white text-center">
      {/* Heading */}
      <h2 className="text-3xl font-serif text-gray-800">Catering</h2>
      <p className="mt-2 text-gray-600 max-w-xl mx-auto">
        From your daily ritual to your special events, we bring quality and care
        to every cup and every plate.
      </p>

      {/* Carousel Heading */}
      <h3 className="mt-10 text-2xl font-serif text-gray-700 mb-5">
        Choose from our packages
      </h3>

      {/* Carousel */}
      <div className="bg-[#F8F3EA] border ">
        <div className="relative max-w-5xl mx-auto ">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-8  transition-all duration-500">
            {/* Image */}
            <div className="w-full md:w-1/2  ">
              <Image
                src={packages[current].image}
                alt={packages[current].title}
                width={500}
                height={350}
                className=" w-full h-60 object-cover rounded-3xl"
              />
            </div>

            {/* Text */}
            <div className="w-full md:w-1/2 text-left md:text-center">
              <h4 className="text-2xl font-serif text-gray-800 mb-2">
                “{packages[current].title}”
              </h4>
              <p className="text-gray-600 italic mb-4">
                {packages[current].desc}
              </p>
              <p className="text-gray-800 mb-4">
                Starting at{" "}
                <span className="font-semibold text-lg">
                  {packages[current].price}
                </span>
              </p>
              <button className="px-6 py-2 border text-gray-700 border-gray-700 rounded-lg hover:bg-gray-100 transition">
                Select This Package
              </button>
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={prevSlide}
            aria-label="Previous"
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next"
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-50"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* --- Extra Section 1: Build Your Own --- */}
      <div className="mt-20 px-6 max-w-3xl mx-auto text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 pointer-events-none">
                  <Image
                    src="/mainimage/main-image.webp"
                    alt=""
                    width={500}
                    height={450}
                    className="opacity-30 object-contain"
                    priority
                  />
                </div>
        <h3 className="text-2xl font-serif text-gray-800">
          We Cater to Your Unique Taste.
        </h3>
        <p className="mt-3 text-gray-600">
          Love our packages but want to tweak them? Or have something entirely
          different in mind? Create the perfect menu for your event with our
          easy <strong>Build Your Own</strong> tool.
        </p>
        <div className="mt-6 flex justify-center">
          <button className="px-4 flex items-center hover:bg-yellow-700 hover:text-white transition-all duration-100 text-yellow-800 gap-3 py-1 border border-yellow-900 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-900">
            Build your own <span > <BiRightArrow/> </span>
          </button>
        </div>
        <p className="mt-2 text-sm text-yellow-700">
          Make sure your order is at least 48 hours before the event
        </p>
      </div>

      {/* --- Extra Section 2: Contact --- */}
      <div className="mt-20 bg-[#F5F1E8] py-12 px-6 text-center rounded-lg">
        <h3 className="text-2xl font-serif text-gray-800 mb-4">
          Not Sure Where to Start?
        </h3>
        <p className="text-gray-600 max-w-xl mx-auto">
          Our catering manager is always happy to help. Get in touch for
          personal advice.
        </p>
        <button className="mt-6 px-6 py-2 bg-yellow-800 text-white rounded-md hover:bg-gray-800 transition">
          <Link href="/contacts">
          Contact us
          </Link>
        </button>
      </div>
    </section>
  );
};

export default Page;
