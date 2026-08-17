"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [products, setProducts] = useState(0);
  const [variants, setVariants] = useState(0);
  const [categories, setCategories] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const { count: productCount } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    const { count: variantCount } = await supabase
      .from("product_variants")
      .select("*", { count: "exact", head: true });

    const { data } = await supabase
      .from("products")
      .select("category");

    const uniqueCategories = [
      ...new Set((data ?? []).map((x) => x.category).filter(Boolean)),
    ];

    setProducts(productCount ?? 0);
    setVariants(variantCount ?? 0);
    setCategories(uniqueCategories.length);
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl p-8 shadow">
          <p className="text-gray-500">Products</p>
          <h2 className="text-5xl font-bold text-black mt-4">
            {products}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow">
          <p className="text-gray-500">Variants</p>
          <h2 className="text-5xl font-bold text-black mt-4">
            {variants}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow">
          <p className="text-gray-500">Categories</p>
          <h2 className="text-5xl font-bold text-black mt-4">
            {categories}
          </h2>
        </div>

      </div>
    </div>
  );
}