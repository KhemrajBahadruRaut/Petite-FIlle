"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";

const rows: { images: string[]; direction: "left" | "right" }[] = [
  {
    direction: "left",
    images: ["/gallery/img1.webp", "/gallery/img2.webp", "/gallery/img3.webp", "/gallery/img4.webp" , "/gallery/img5.webp", "/gallery/img6.webp", "/gallery/img7.webp", "/gallery/img8.webp"],
  },
  {
    direction: "right",
    images: ["/gallery/img1.webp", "/gallery/img2.webp", "/gallery/img3.webp", "/gallery/img4.webp" , "/gallery/img5.webp", "/gallery/img6.webp", "/gallery/img7.webp", "/gallery/img8.webp"],
  },
  {
    direction: "left",
    images: ["/gallery/img1.webp", "/gallery/img2.webp", "/gallery/img3.webp", "/gallery/img4.webp" , "/gallery/img5.webp", "/gallery/img6.webp", "/gallery/img7.webp", "/gallery/img8.webp"],
  },
];

export default function Gallery() {
  return (
    <div className="bg-white">

    <section className="py-12 px-4 container mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-700 mb-2">Gallery</h2>
      <p className="text-center text-gray-500 mb-8">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique cupiditate <br />
        necessitatibus, autem rerum temporibus.
      </p>

      <div className="space-y-8">
        {rows.map((row, rowIndex) => (
          <Marquee
            key={`row-${rowIndex}`}
            direction={row.direction}
            speed={50}
            pauseOnHover
            gradient={false}
          >
            {row.images.map((src, imgIndex) => (
              <div key={`row-${rowIndex}-img-${imgIndex}`} className="mx-3">
                <Image
                  src={src}
                  alt={`gallery-row-${rowIndex}-img-${imgIndex}`}
                  width={200} // same as w-60
                  height={120} // same as h-40
                  className="object-cover "
                  loading={rowIndex === 0 && imgIndex < 2 ? "eager" : "lazy"}
                  priority={rowIndex === 0 && imgIndex === 0}
                />
              </div>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
        </div>

  );
}
