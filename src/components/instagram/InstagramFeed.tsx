import React from "react";

const InstagramFeed = () => {
  const images: string[] = [
    // replace with your images
    "https://source.unsplash.com/400x400/?coffee,1",
    "https://source.unsplash.com/400x400/?brunch,2",
    "https://source.unsplash.com/400x400/?dessert,3",
    "https://source.unsplash.com/400x400/?food,4",
    "https://source.unsplash.com/400x400/?drink,5",
    "https://source.unsplash.com/400x400/?cake,6",
    "https://source.unsplash.com/400x400/?pizza,7",
  ];

  const doubled = [...images, ...images];

  return (
    <div className="bg-[#f8f6f2]">

    <section className=" py-16 px-6 text-center overflow-hidden container mx-auto">
      <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">
        Instagram
      </h2>
      <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
        Join our community online. Follow us on Instagram for the latest updates,
        behind-the-scenes moments, and a glimpse into our cafe culture.
      </p>

      {/* Seamless left-to-right marquee */}
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-marquee-rtl will-change-transform">
          {doubled.map((src, i) => {
            const displayIndex = (i % images.length) + 1; // fixes “wrong numbers”
            return (
              <div
                key={i}
                className="mx-2 flex-shrink-0 w-64 h-64 overflow-hidden rounded-lg shadow"
                aria-hidden={i >= images.length} // hide duplicate from SR
              >
                <img
                  src={src}
                  alt={`Instagram post ${displayIndex}`}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
        </div>

  );
};

export default InstagramFeed;
