"use client";

import { useEffect, useState, useCallback } from "react";
import ProductCard from "./ProductCard";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
};

export default function ProductSection() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

const fetchProducts = useCallback(async () => {
  try {
    console.log("FETCH STARTED");

    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select(
        "id, name, price, moq, category, description, color, image, front_image, back_image, side_image"
      );

    console.log("PRODUCT DATA:", data);
    console.log("PRODUCT ERROR:", error);

    if (error) {
      console.error("SUPABASE PRODUCT ERROR:", error);
      setProducts([]);
      return;
    }

    setProducts(data ?? []);
  } catch (err) {
    console.error("FETCH PRODUCTS FAILED:", err);
    setProducts([]);
  } finally {
    setLoading(false);
  }
}, []);
  useEffect(() => {
    console.log("ProductSection Mounted");
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section
      id="products"
      className="w-full bg-white py-14 sm:py-20 lg:py-28"
    >
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Heading */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-10 mb-12 lg:mb-16">
          <div className="max-w-3xl">
            <span className="uppercase tracking-[0.35em] text-gray-500 text-xs sm:text-sm">
              OUR COLLECTION
            </span>

            <h2
              className="mt-4 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-black"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Premium Wholesale Products
            </h2>

            <p className="mt-6 text-gray-600 text-base sm:text-lg leading-8">
              Explore our premium wholesale collection of Korean trousers,
              cargo pants, formal trousers and fashion essentials.
            </p>
          </div>

          <div className="w-full lg:w-[420px]">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 sm:h-14 px-6 rounded-full border border-gray-300 bg-white text-black placeholder:text-gray-400 outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 rounded-full border-4 border-gray-300 border-t-black animate-spin"></div>
              <p className="text-lg text-gray-500">
                Loading Products...
              </p>
            </div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center py-28">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-400">
                No Products Found
              </h3>

              <p className="mt-3 text-gray-500">
                Try searching with another keyword.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}