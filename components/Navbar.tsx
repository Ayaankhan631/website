"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/Context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-[1800px] mx-auto h-16 sm:h-20 px-4 sm:px-6 lg:px-10 flex items-center justify-between">
{/* Brand */}
<Link href="/" className="flex items-center">
  <span
    className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase"
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
  </span>
</Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-12">
            <Link
              href="/"
              className="text-black font-medium hover:text-gray-700 transition"
            >
              Home
            </Link>

            <Link
              href="/#products"
              className="text-black font-medium hover:text-gray-700 transition"
            >
              Products
            </Link>

            <Link
              href="/#about"
              className="text-black font-medium hover:text-gray-700 transition"
            >
              About
            </Link>

            <Link
              href="/#contact"
              className="text-black font-medium hover:text-gray-700 transition"
            >
              Contact
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3 lg:gap-5">

            {/* WhatsApp */}
            <a
              href="https://wa.me/919315281752"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              WhatsApp
            </a>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-gray-300 hover:border-black hover:bg-gray-100 transition"
            >
              <span className="text-2xl">🛒</span>

              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden flex items-center justify-center w-12 h-12 rounded-full border border-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setMenuOpen(false)}
          />

          <div className="fixed top-0 left-0 w-80 max-w-[85%] h-screen bg-white z-50 shadow-2xl p-8 flex flex-col">

            <div className="flex justify-between items-center mb-12">
              <h2
                className="text-3xl font-bold"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  letterSpacing: "0.12em",
                }}
              >
                TAKAI
              </h2>

              <button
                onClick={() => setMenuOpen(false)}
                className="text-4xl"
              >
                ×
              </button>
            </div>

            <nav className="flex flex-col gap-8 text-xl">

              <Link href="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>

              <Link href="/#products" onClick={() => setMenuOpen(false)}>
                Products
              </Link>

              <Link href="/#about" onClick={() => setMenuOpen(false)}>
                About
              </Link>

              <Link href="/#contact" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>

            </nav>

            <a
              href="https://wa.me/919315281752"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto bg-green-600 text-white text-center py-4 rounded-xl font-semibold"
            >
              WhatsApp
            </a>

          </div>
        </>
      )}
    </>
  );
}