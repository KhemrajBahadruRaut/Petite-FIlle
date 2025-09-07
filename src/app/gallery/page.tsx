"use client";
import React from "react";
import Marquee from "react-fast-marquee";

const rows = [
  [
    "/gallery/img1.webp",
    "/gallery/img2.webp",
    "/gallery/img2.webp",
    "/gallery/img3.webp",
    "/gallery/img4.webp",
  ],
  [
    "/gallery/img5.webp",
    "/gallery/img6.webp",
    "/gallery/img7.webp",
    "/gallery/img7.webp",
    "/gallery/img8.webp",
  ],
  [
    "/gallery/img9.webp",
    "/gallery/img10.webp",
    "/gallery/img11.webp",
    "/gallery/img12.webp",
    "/gallery/img12.webp",
  ],
];

export default function Page() {
  return (
    <div className="bg-white">
      <section className="py-12 px-4 container mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-2">
          Gallery
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique cupiditate <br /> necessitatibus, autem rerum temporibus.
        </p>

        <div className="space-y-8">
          {/* Row 1 */}
          <Marquee direction="left" speed={50} pauseOnHover gradient={false}>
            {rows[0].map((src, idx) => (
              <img
                key={`row1-${idx}`}
                src={src}
                alt={`row1-img-${idx}`}
                className="w-60 h-40 object-cover rounded-xl shadow-md text-gray-500"
              />
            ))}
          </Marquee>

          {/* Row 2 - opposite direction */}
          <Marquee direction="right" speed={50} pauseOnHover gradient={false}>
            {rows[1].map((src, idx) => (
              <img
                key={`row2-${idx}`}
                src={src}
                alt={`row2-img-${idx}`}
                className="w-60 h-40 object-cover rounded-xl shadow-md text-gray-500"
              />
            ))}
          </Marquee>

          {/* Row 3 */}
          <Marquee direction="left" speed={50} pauseOnHover gradient={false}>
            {rows[2].map((src, idx) => (
              <img
                key={`row3-${idx}`}
                src={src}
                alt={`row3-img-${idx}`}
                className="w-60 h-40 object-cover rounded-xl shadow-md text-gray-500"
              />
            ))}
          </Marquee>
        </div>
      </section>
    </div>
  );
}

