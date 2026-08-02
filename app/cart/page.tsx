"use client";

import Link from "next/link";
import { useCart } from "@/Context/CartContext";

export default function CartPage() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const message = cart
    .map(
      (item) =>
        `• ${item.name}\nQty: ${item.quantity}\nPrice: ${item.price}`
    )
    .join("\n\n");

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-10">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 text-lg">
            Your cart is empty.
          </p>

          <Link
            href="/"
            className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-xl"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-6">

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-6 border rounded-2xl p-5"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-contain bg-gray-100 rounded-xl"
                />

                <div className="flex-1">
                  <h2 className="text-2xl font-semibold">
                    {item.name}
                  </h2>

                  <p className="text-gray-600">
                    {item.price}
                  </p>

                  <div className="flex items-center gap-3 mt-4">

                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-9 h-9 border rounded-lg"
                    >
                      -
                    </button>

                    <span className="font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="w-9 h-9 border rounded-lg"
                    >
                      +
                    </button>

                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 font-semibold"
                >
                  Remove
                </button>
              </div>
            ))}

          </div>

          <div className="flex gap-4 mt-10">

            <button
              onClick={clearCart}
              className="px-6 py-3 border rounded-xl"
            >
              Clear Cart
            </button>

            <a
              href={`https://wa.me/919315281752?text=${encodeURIComponent(
                `Hello,\n\nI want to order:\n\n${message}`
              )}`}
              target="_blank"
              className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700"
            >
              Order on WhatsApp
            </a>

          </div>
        </>
      )}
    </main>
  );
}