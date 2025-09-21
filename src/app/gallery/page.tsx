"use client";

import React, { useState } from "react";
import Marquee from "react-fast-marquee";
// import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const rows: { images: string[]; direction: "left" | "right" }[] = [
  {
    direction: "left",
    images: ["/gallery/img1.webp", "/gallery/img2.webp", "/gallery/img3.webp", "/gallery/img4.webp", "/gallery/img5.webp", "/gallery/img6.webp", "/gallery/img7.webp", "/gallery/img8.webp"],
  },
  {
    direction: "right",
    images: ["/gallery/img1.webp", "/gallery/img2.webp", "/gallery/img3.webp", "/gallery/img4.webp", "/gallery/img5.webp", "/gallery/img6.webp", "/gallery/img7.webp", "/gallery/img8.webp"],
  },
  {
    direction: "left",
    images: ["/gallery/img1.webp", "/gallery/img2.webp", "/gallery/img3.webp", "/gallery/img4.webp", "/gallery/img5.webp", "/gallery/img6.webp", "/gallery/img7.webp", "/gallery/img8.webp"],
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="bg-white pb-20">

      <div className="relative container mx-auto">
        <div className="hidden sm:flex absolute -translate-x-1/2 top-15  p-4 pointer-events-none">
          <img
            src="/mainimage/main-image.webp"
            alt=""
            width={300}
            height={300}
            className="opacity-30 object-contain"
            // priority
          />
        </div>
        <div className="hidden sm:flex absolute bottom-[-100px] right-[-150px] p-4 pointer-events-none">
          <img
            src="/mainimage/main-image.webp"
            alt=""
            width={300}
            height={300}
            className="opacity-30 object-contain"
            // priority
          />
        </div>

        <section className="py-16 px-4 container mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'fairplaybold' }}>Our Gallery</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'arial' }}>
              Discover the beauty of our work through these carefully curated moments that showcase our dedication to excellence.
            </p>
          </motion.div>

          <div className="space-y-8">
            {rows.map((row, rowIndex) => (
              <motion.div
                key={`row-${rowIndex}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: rowIndex * 0.2 }}
                viewport={{ once: true }}
              >
                <Marquee
                  direction={row.direction}
                  speed={40}
                  pauseOnHover
                  gradient={false}
                >
                  {row.images.map((src, imgIndex) => (
                    <motion.div
                      key={`row-${rowIndex}-img-${imgIndex}`}
                      className="mx-3 cursor-pointer"
                      onClick={() => openModal(src)}
                    >
                      <div className="overflow-hidden shadow-md">
                        <img
                          src={src}
                          alt={`gallery-row-${rowIndex}-img-${imgIndex}`}
                          width={240}
                          height={160}
                          className="object-cover transition-transform duration-500 hover:scale-110"
                          loading={rowIndex === 0 && imgIndex < 2 ? "eager" : "lazy"}
                          // priority={rowIndex === 0 && imgIndex === 0}
                        />
                      </div>
                    </motion.div>
                  ))}
                </Marquee>
              </motion.div>
            ))}
          </div>
        </section>

      </div>

      {/* Modal for image preview */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="relative max-w-4xl w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-12 right-0 text-white text-3xl z-10"
                onClick={closeModal}
                aria-label="Close modal"
              >
                &times;
              </button>
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={selectedImage}
                  alt="Enlarged gallery image"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}