"use client";

import { useCart } from "@/Context/CartContext";

type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
};

export default function AddToCartButton({
  product,
}: {
  product: Product;
}) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="
w-full
h-10
rounded-md
bg-[#FF9F00]
hover:bg-[#FB8C00]
text-black
text-sm
font-semibold
transition-all
duration-300
"
    >
      Add to Cart
    </button>
  );
}