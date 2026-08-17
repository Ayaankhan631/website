"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  const fetchProducts = useCallback(async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setProducts(data ?? []);
  }, []);

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;

    const { error: variantError } = await supabase
      .from("product_variants")
      .delete()
      .eq("product_id", id);

    if (variantError) {
      alert(variantError.message);
      return;
    }

    const { error: productError } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (productError) {
      alert(productError.message);
      return;
    }

    setProducts((prev) =>
      prev.filter((product) => product.id !== id)
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 0);

    const channel = supabase
      .channel("products-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "products",
        },
        () => {
          fetchProducts();
        }
      )
      .subscribe();

    return () => {
      clearTimeout(timer);
      supabase.removeChannel(channel);
    };
  }, [fetchProducts]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-black">
            Products
          </h2>

          <p className="text-gray-500 mt-1">
            Total Products : {filteredProducts.length}
          </p>
        </div>

        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80 rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="overflow-hidden rounded-3xl border bg-white shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-5 text-left">Image</th>
              <th className="p-5 text-left">Product</th>
              <th className="p-5 text-left">Price</th>
              <th className="p-5 text-left">Category</th>
              <th className="p-5 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center text-gray-500"
                >
                  No Products Found
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 rounded-xl object-cover border"
                    />
                  </td>

                  <td className="p-4 font-semibold">
                    {product.name}
                  </td>

                  <td className="p-4">
                    ₹{product.price}
                  </td>

                  <td className="p-4">
                    {product.category}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <Link
                        href={`/admin/products/edit/${product.id}`}
                        className="rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}