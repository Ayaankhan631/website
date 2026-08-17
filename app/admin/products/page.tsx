"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  front_image: string;
  back_image: string;
  side_image: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
  }

  async function deleteProduct(id: string) {
    const ok = confirm("Delete this product?");
    if (!ok) return;

    await supabase.from("products").delete().eq("id", id);

    loadProducts();
  }

  return (
    <div className="p-10">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-black">
          Products
        </h1>

        <Link
          href="/admin/products/new"
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          + Add Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4 text-black">Image</th>
              <th className="text-left p-4 text-black">Name</th>
              <th className="text-left p-4 text-black">Category</th>
              <th className="text-left p-4 text-black">Price</th>
              <th className="text-left p-4 text-black">Action</th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr
                key={product.id}
                className="border-t"
              >

                <td className="p-4">

                  {product.front_image ? (

                    <img
                      src={product.front_image}
                      alt={product.name}
                      className="w-20 h-24 object-cover rounded"
                    />

                  ) : (

                    <div className="w-20 h-24 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                      No Image
                    </div>

                  )}

                </td>

                <td className="p-4 text-black font-semibold">
                  {product.name}
                </td>

                <td className="p-4 text-black">
                  {product.category}
                </td>

                <td className="p-4 text-black">
                  ₹{product.price}
                </td>

                <td className="p-4">

                  <Link
                    href={`/admin/products/edit/${product.id}`}
                    className="text-blue-600 mr-5"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}