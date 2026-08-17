"use client";

import { useState } from "react";
import ProductGallery from "./ProductGallery";
import AddToCartButton from "./AddToCartButton";

type Variant = {
  color: string;
  images: string[];
};

type Product = {
  id: string;
  name: string;
  price: string;
  moq: string;
  description: string;
  variants: Variant[];
};

export default function ProductDetails({
  product,
}: {
  product: Product;
}) {

  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0]
  );

  const colorMap: Record<string, string> = {
    Black: "#000000",
    Beige: "#F5F5DC",
    Coffee: "#6F4E37",
    Brown: "#8B4513",
    White: "#FFFFFF",
    Grey: "#808080",
    Gray: "#808080",
    Navy: "#001F54",
    Blue: "#2563EB",
    Olive: "#556B2F",
    Green: "#16A34A",
    Pink: "#916861",
    Red: "#DC2626",
    Yellow: "#FACC15",
    Khaki: "#ae9674",
    Wine: "#6d202f",
  };

  // MOQ may come in as "20" or "20 pcs" etc. — pull out the number safely.
  const moqNumber = parseInt(product.moq, 10) || 1;

  const formattedPrice = Number.isFinite(Number(product.price))
    ? Number(product.price).toLocaleString("en-IN")
    : product.price;

  const fallbackImage = "/placeholder-product.png";
  const cartImage = selectedVariant.images?.[0] ?? fallbackImage;

  return (

    <div
  className="
    grid
    grid-cols-1
    xl:grid-cols-[56%_44%]
    gap-8
    lg:gap-14
    items-start
  "
>

      {/* LEFT */}
<ProductGallery
  images={selectedVariant.images}
  name={product.name}
/>

      {/* RIGHT */}

      <div
  className="
    xl:sticky
    xl:top-8
    h-fit
    text-black
    mt-6
    xl:mt-0
  "
>

        {/* Product Name */}

        <h1
          className="
text-2xl
sm:text-4xl
lg:text-5xl
font-bold
leading-tight
"
          style={{
            fontFamily: "var(--font-cormorant)",
          }}
        >
          {product.name}
        </h1>

        {/* Price */}

        <h2 className="
text-3xl
sm:text-4xl
font-black
mt-4
">
          ₹{formattedPrice}
        </h2>

        {/* MOQ */}

        <p className="mt-2 text-base sm:text-lg text-gray-700">
          Minimum Order Quantity :
          <span className="font-semibold text-black ml-2">
            {product.moq} Pieces
          </span>
        </p>

        <hr className="my-8 border-gray-200" />

        {/* Description */}

        <div>

          <h3 className="text-2xl font-bold">
            Product Description
          </h3>

          <p className="
mt-5
text-base
sm:text-lg
leading-7
sm:leading-8
text-gray-700
">
            {product.description}
          </p>

        </div>

        <hr className="my-8 border-gray-200" />

        {/* Colours */}

        <div>

          <h3 className="text-2xl font-bold">
            Available Colours
          </h3>

          <p className="text-gray-600 mt-3 mb-5">

            Selected Colour :

            <span className="ml-2 font-semibold text-black">
              {selectedVariant.color}
            </span>

          </p>

          <div className="flex flex-wrap gap-2 sm:gap-3">

            {product.variants.map((variant) => (

              <button
                key={variant.color}
                type="button"
                aria-pressed={selectedVariant.color === variant.color}
                onClick={() => setSelectedVariant(variant)}
                className={`flex items-center gap-3 px-4 sm:px-5 py-3 rounded-full border-2 transition-all duration-300

                ${
                  selectedVariant.color === variant.color
                    ? "border-black bg-black text-white shadow-lg"
                    : "border-gray-300 bg-white text-black hover:border-black hover:shadow-md"
                }`}
              >

                <span
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-gray-300"
                  style={{
                    backgroundColor:
                      colorMap[variant.color] || "#cccccc",
                  }}
                />

                <span className="font-medium text-sm sm:text-base">
                  {variant.color}
                </span>

              </button>

            ))}

          </div>

        </div>

        <hr className="my-8 border-gray-200" />

        {/* Action Buttons */}

        <div className="w-full max-w-md">

          <AddToCartButton
            product={{
              id: `${product.id}-${selectedVariant.color}`,
              name: `${product.name} (${selectedVariant.color})`,
              price: product.price,
              image: cartImage,
              quantity: moqNumber,
            }}
          />

          <a
            href={`https://wa.me/919315281752?text=${encodeURIComponent(
              `Hello,\n\nI am interested in your product.\n\nProduct : ${product.name}\n\nColour : ${selectedVariant.color}\n\nPrice : ₹${product.price}\n\nMOQ : ${product.moq} Pieces\n\nPlease share your wholesale catalogue.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-4
              w-full
              h-12
              rounded-xl
              bg-[#25D366]
              hover:bg-[#1EBE5D]
              text-black
              font-semibold
              flex
              items-center
              justify-center
              transition-all
              duration-300
              hover:shadow-lg
            "
          >
            Order on WhatsApp
          </a>

        </div>

        {/* Features */}

        <div
className="
mt-10
grid
grid-cols-1
md:grid-cols-2
gap-4
"
>

          <div className="border rounded-2xl p-4">

            <h4 className="font-semibold text-lg">
              🚚 Fast Delivery
            </h4>

            <p className="text-gray-600 text-sm mt-2">
              Pan India wholesale shipping available.
            </p>

          </div>

          <div className="border rounded-2xl p-4">

            <h4 className="font-semibold text-lg">
              🏭 Manufacturer
            </h4>

            <p className="text-gray-600 text-sm mt-2">
              Factory direct pricing with premium quality.
            </p>

          </div>

          <div className="border rounded-2xl p-4">

            <h4 className="font-semibold text-lg">
              💎 Premium Fabric
            </h4>

            <p className="text-gray-600 text-sm mt-2">
              High-quality materials with excellent finishing.
            </p>

          </div>

          <div className="border rounded-2xl p-4">

            <h4 className="font-semibold text-lg">
              📦 Bulk Orders
            </h4>

            <p className="text-gray-600 text-sm mt-2">
              Best pricing for retailers and wholesalers.
            </p>

          </div>

        </div>
      </div>

    </div>

  );
}