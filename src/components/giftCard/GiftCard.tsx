import React from "react";

const GiftCard = () => {
  return (
    <div className="bg-white">
      <div className="flex flex-col md:flex-row items-center justify-center px-4 md:px-16 bg-white relative container mx-auto">
        {/* Image */}
        <div className="md:w-1/2 flex justify-center  md:mb-0">
          <img
            src="/giftcard/giftcard.webp"
            alt="eGift Card"
            className="h-auto rounded-lg pt-15 "
          />
        </div>

        {/* Text Content */}
        <div className="md:w-1/2 flex space-y-12! flex-col items-start md:pl-12">
          <h2 className="text-3xl md:text-5xl! font-serif text-gray-800 mb-4">
            eGift cards Available
          </h2>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button className="px-6 py-2 border border-gray-800 text-gray-800 rounded hover:bg-gray-100 transition">
            Purchase now &rarr;
          </button>
        </div>       
      </div>
    </div>
  );
};

export default GiftCard;
