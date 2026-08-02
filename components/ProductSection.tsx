"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setProducts(data || []);
    }

    setLoading(false);
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section
      id="products"
      className="w-full bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="max-w-[1800px] mx-auto px-5 sm:px-8 lg:px-10">

        {/* Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 lg:mb-16">

          <div className="max-w-3xl">

            <span className="uppercase tracking-[0.25em] text-gray-500 text-xs sm:text-sm">
              OUR COLLECTION
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-black leading-tight">
              Premium Wholesale Products
            </h2>

            <p className="mt-5 text-base sm:text-lg text-gray-500 leading-7 sm:leading-8">
              Explore our latest premium wholesale collection.
              Manufactured with high-quality fabrics and designed
              for modern fashion retailers.
            </p>

          </div>

          {/* Search */}
          <div className="w-full lg:w-[420px]">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 sm:h-14 px-5 rounded-full border border-gray-300 bg-white text-black placeholder:text-gray-400 outline-none focus:border-black transition"
            />
          </div>

        </div>

        {/* Products */}
        {loading ? (

          <div className="flex justify-center items-center py-24">

            <div className="text-lg sm:text-xl font-medium text-gray-500">
              Loading Products...
            </div>

          </div>

        ) : filteredProducts.length > 0 ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">

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

          <div className="text-center py-20">

            <h3 className="text-2xl sm:text-3xl font-bold text-gray-400">
              No Products Found
            </h3>

          </div>

        )}

      </div>
    </section>
  );
}