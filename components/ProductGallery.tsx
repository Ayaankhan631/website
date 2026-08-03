"use client";

import { useEffect, useState } from "react";

type Props = {
  images: string[];
  name: string;
};

export default function ProductGallery({
  images,
  name,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [images]);

  const nextImage = () => {
    setSelectedIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="w-full">

      {/* Desktop Layout */}

      <div className="hidden lg:grid lg:grid-cols-[110px_1fr] gap-6">

        {/* Thumbnails */}

        <div className="flex flex-col gap-4 overflow-y-auto max-h-[80vh] pr-1">

          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`rounded-2xl overflow-hidden border-2 transition-all duration-300 bg-white

                ${selectedIndex === index
                  ? "border-black shadow-lg scale-105"
                  : "border-gray-200 hover:border-black"
                }`}
            >
              <img
                src={image}
                alt={`${name}-${index}`}
                className="w-24 h-24 object-contain p-2"
              />
            </button>
          ))}

        </div>

        {/* Main Image */}

        <div className="relative rounded-3xl border border-gray-200 bg-white shadow-xl overflow-hidden h-[80vh] flex items-center justify-center">

          <img
            src={images[selectedIndex]}
            alt={name}
            className="
w-full
h-full
object-contain
p-4
sm:p-6
lg:p-8
transition-all
duration-500
hover:scale-105
"
          />
          {/* Navigation */}

          {images.length > 1 && (
            <>
              <button
                onClick={previousImage}
                className="
                  absolute
                  left-5
                  top-1/2
                  -translate-y-1/2
                  w-12
                  h-12
                  rounded-full
                  bg-white
                  shadow-lg
                  border
                  border-gray-200
                  hover:bg-black
                  hover:text-white
                  transition-all
                "
              >
                &#8249;
              </button>

              <button
                onClick={nextImage}
                className="
                  absolute
                  right-5
                  top-1/2
                  -translate-y-1/2
                  w-12
                  h-12
                  rounded-full
                  bg-white
                  shadow-lg
                  border
                  border-gray-200
                  hover:bg-black
                  hover:text-white
                  transition-all
                "
              >
                &#8250;
              </button>

              <div
                className="
                  absolute
                  bottom-5
                  left-1/2
                  -translate-x-1/2
                  bg-white
                  px-5
                  py-2
                  rounded-full
                  shadow-lg
                  text-sm
                  font-medium
                "
              >
                {selectedIndex + 1} / {images.length}
              </div>
            </>
          )}

        </div>

      </div>

      {/* ---------------- MOBILE ---------------- */}

      <div className="lg:hidden">

        {/* Main Image */}

        <div className="relative rounded-3xl border border-gray-200 bg-white shadow-lg h-[420px] sm:h-[520px] flex items-center justify-center overflow-hidden">

          <img
            src={images[selectedIndex]}
            alt={name}
            className="
w-full
h-full
object-contain
p-3
sm:p-5
transition-all
duration-500
"
          />

          {images.length > 1 && (
            <>
              <button
                onClick={previousImage}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  w-10
                  h-10
                  rounded-full
                  bg-white
                  shadow-md
                  border
                "
              >
                &#8249;
              </button>

              <button
                onClick={nextImage}
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  w-10
                  h-10
                  rounded-full
                  bg-white
                  shadow-md
                  border
                "
              >
                &#8250;
              </button>
              <div
                className="
                  absolute
                  bottom-4
                  left-1/2
                  -translate-x-1/2
                  bg-white
                  px-4
                  py-2
                  rounded-full
                  shadow-lg
                  text-sm
                  font-medium
                "
              >
                {selectedIndex + 1} / {images.length}
              </div>
            </>
          )}

        </div>

        {/* Mobile Thumbnails */}

        <div
          className="
    flex
    gap-3
    mt-5
    overflow-x-auto
    pb-3
    snap-x
    snap-mandatory
    scrollbar-hide
    scroll-smooth
  "
        >

          {images.map((image, index) => (

            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300

                ${selectedIndex === index
                  ? "border-black"
                  : "border-gray-200"
                }`}
            >

              <img
                src={image}
                alt={`${name}-${index}`}
                className="
  w-20
  h-20
  sm:w-24
  sm:h-24
  object-contain
  p-2
  bg-white
"
              />

            </button>

          ))}

        </div>

      </div>

    </div>
  );
}