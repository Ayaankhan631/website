"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  console.log("Route Params:", params);
  console.log("Product ID:", id);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [moq, setMoq] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  async function fetchProduct() {
    console.log("Fetching Product ID:", id);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    console.log("Fetched Data:", data);
    console.log("Fetch Error:", error);

    if (error) {
      alert(error.message);
      return;
    }

    setName(data.name ?? "");
    setPrice(data.price ?? "");
    setMoq(data.moq ?? "");
    setCategory(data.category ?? "");
    setDescription(data.description ?? "");
    setColor(data.color ?? "");
  }

  async function updateProduct() {
    console.log("Updating Product:", id);

    const { data, error } = await supabase
      .from("products")
      .update({
        name,
        price,
        moq,
        category,
        description,
        color,
      })
      .eq("id", id)
      .select();

    console.log("Updated Data:", data);
    console.log("Update Error:", error);

    if (error) {
      alert(error.message);
      return;
    }

   alert("✅ Product Updated Successfully");

router.replace("/admin/products");
  }

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-black">
        Edit Product
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <input
          className="w-full border rounded-xl p-3 mb-4 text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
        />

        <input
          className="w-full border rounded-xl p-3 mb-4 text-black"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />

        <input
          className="w-full border rounded-xl p-3 mb-4 text-black"
          value={moq}
          onChange={(e) => setMoq(e.target.value)}
          placeholder="MOQ"
        />

        <input
          className="w-full border rounded-xl p-3 mb-4 text-black"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />

        <textarea
          className="w-full border rounded-xl p-3 mb-4 text-black h-40"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <input
          className="w-full border rounded-xl p-3 mb-6 text-black"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="Colour"
        />

        <button
          onClick={updateProduct}
          className="bg-black text-white px-8 py-3 rounded-xl"
        >
          Update Product
        </button>
      </div>
    </main>
  );
}