import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full min-h-screen bg-white">
      <div className="max-w-[1800px] mx-auto min-h-screen px-5 sm:px-8 lg:px-10 py-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* LEFT */}
        <div className="order-2 lg:order-1">

          {/* Brand */}
          <div className="mb-10 lg:-mt-10">

            <h2
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase leading-none"
              style={{
                fontFamily: "var(--font-cormorant)",
                letterSpacing: "0.12em",
                color: "#111111",
              }}
            >
              TAKAI
              <span className="align-super text-lg sm:text-xl lg:text-2xl xl:text-3xl ml-1 font-normal">
                ™
              </span>
            </h2>

            <p
              className="mt-3 text-sm sm:text-base lg:text-lg xl:text-xl uppercase tracking-[0.28em] text-gray-600"
              style={{
                fontFamily: "var(--font-cormorant)",
              }}
            >
              Premium Fashion Manufacturer
            </p>

          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-black">
            About Us
          </h1>

          {/* Description */}
          <p className="mt-6 text-base sm:text-lg lg:text-xl leading-8 lg:leading-9 text-gray-600 max-w-2xl">
            TAKAI is a premium clothing manufacturer and wholesale brand
            dedicated to delivering trend-driven fashion with exceptional
            quality. We specialize in Korean trousers, cargo pants, formal
            trousers, and contemporary apparel crafted using premium fabrics
            and precise tailoring. Designed for retailers, resellers, and
            fashion businesses, our collections combine modern style,
            comfort, and durability at competitive factory prices. With
            reliable manufacturing, consistent quality, and nationwide
            delivery, TAKAI is your trusted partner for building a successful
            fashion business. Experience premium craftsmanship, wholesale
            excellence, and timeless designs that keep your customers coming
            back.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">

            <Link href="#products">
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-black text-white text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-xl">
                Explore Collection
              </button>
            </Link>

            <a
              href="https://wa.me/919315281752"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-black text-lg font-semibold hover:bg-black hover:text-white transition-all duration-300 text-center"
            >
              WhatsApp Us
            </a>

          </div>

        </div>

        {/* RIGHT */}
        <div className="order-1 lg:order-2 relative flex items-center justify-center h-[420px] sm:h-[600px] lg:h-[900px]">

          {/* Background Circle */}
          <div className="absolute w-[280px] h-[280px] sm:w-[450px] sm:h-[450px] lg:w-[700px] lg:h-[700px] rounded-full bg-gray-100"></div>

          {/* Product 1 */}
          <div className="absolute left-2 sm:left-8 lg:left-0 bottom-5 lg:bottom-10 rotate-[-8deg] hover:rotate-0 transition-all duration-500">

            <div className="bg-white rounded-3xl shadow-2xl p-3 sm:p-5 lg:p-6">

              <Image
                src="/Product/Korean-Pants/Beige/Beige_front.png"
                alt="Korean Pant"
                width={360}
                height={600}
                className="object-contain w-[140px] sm:w-[220px] lg:w-[360px] h-auto"
              />

            </div>

          </div>

          {/* Product 2 */}
          <div className="absolute right-2 sm:right-8 lg:right-0 top-5 lg:top-10 rotate-[8deg] hover:rotate-0 transition-all duration-500">

            <div className="bg-white rounded-3xl shadow-2xl p-3 sm:p-5 lg:p-6">

              <Image
                src="/Product/Formal-Trouser/Beige/Beige-front.png"
                alt="Formal Trouser"
                width={360}
                height={600}
                className="object-contain w-[140px] sm:w-[220px] lg:w-[360px] h-auto"
              />

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}