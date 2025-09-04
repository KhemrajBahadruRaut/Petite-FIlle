import React from "react";

const WhatWeOffer = () => {
  const items = [
    {
      img: "/whatweoffer/offer3.webp",
      title: "Lorem ipsum",
      price: "$21",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    },
    {
      img: "/whatweoffer/offer2.webp",
      title: "Lorem ipsum",
      price: "$21",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    },
    {
      img: "/whatweoffer/offer1.webp",
      title: "Lorem ipsum",
      price: "$21",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    },
    {
      img: "/whatweoffer/offer4.webp",
      title: "Lorem ipsum",
      price: "$21",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    },
  ];

  return (
    <div className="bg-[#f8f5ef]">

    <section className="w-full  py-16 px-6 md:px-12 lg:px-20 container mx-auto">
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-700">
          A Taste of What We Offer
        </h2>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor. ipsum dolor sit amet, piscin elit, sed do eiusmod
          tempor incididunt
        </p>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col group">
            {/* Image Wrapper with Hover */}
            <div className="overflow-hidden">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-60 object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex justify-between mt-4 font-medium text-gray-700">
              <span>{item.title}</span>
              <span>{item.price}</span>
            </div>
            <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="flex justify-center">
        <button className="px-6 py-3 border border-gray-700 rounded-md text-gray-800 hover:bg-gray-100 transition">
          Take a look at our menu →
        </button>
      </div>
    </section>
        </div>

  );
};

export default WhatWeOffer;
