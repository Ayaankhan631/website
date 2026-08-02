"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import ImageUploader from "@/components/admin/ImageUploader";
import ProductList from "@/components/admin/ProductList";

export default function ProductsPage() {
  // Product States
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [moq, setMoq] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");

  // Images
  const [frontImage, setFrontImage] = useState("");

  // Products List
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data } = await supabase
      .from("products")
      .select("id,name")
      .order("name");

    setProducts(data || []);
  }

  async function saveProduct() {
  const { error } = await supabase.from("products").insert([
    {
      name,
      price,
      moq,
      category,
      description,
      color,
      image: frontImage,
    },
  ]);

  if (error) {
    alert(error.message);
    return;
  }

  alert("✅ Product Added Successfully!");

  setName("");
  setPrice("");
  setMoq("");
  setCategory("");
  setDescription("");
  setColor("");
  setFrontImage("");

  fetchProducts();
}

  return (
    <main className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold text-black mb-8">
        Product Management
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-2xl font-semibold text-black mb-6">
          Add New Product
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-xl px-4 py-3 bg-white text-black placeholder:text-gray-500"
          />

          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded-xl px-4 py-3 bg-white text-black placeholder:text-gray-500"
          />

          <input
            type="text"
            placeholder="MOQ"
            value={moq}
            onChange={(e) => setMoq(e.target.value)}
            className="border rounded-xl px-4 py-3 bg-white text-black placeholder:text-gray-500"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-xl px-4 py-3 bg-white text-black placeholder:text-gray-500"
          />

        </div>

        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded-xl px-4 py-3 mt-5 w-full h-40 bg-white text-black placeholder:text-gray-500"
        />

        <input
          type="text"
          placeholder="Default Colour"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="border rounded-xl px-4 py-3 mt-5 w-full bg-white text-black placeholder:text-gray-500"
        />

        <div className="mt-8">

          <h3 className="text-lg font-semibold text-black mb-3">
            Front Image
          </h3>

          <ImageUploader onUpload={setFrontImage} />

          {frontImage && (
            <img
              src={frontImage}
              alt="Front"
              className="w-44 h-44 object-cover rounded-xl border mt-4"
            />
          )}

        </div>

       <button
  onClick={saveProduct}
  className="mt-8 bg-black text-white px-8 py-3 rounded-xl"
>
  Save Product
</button>

      </div>

      <div className="mt-10">
        <ProductList />
      </div>

    </main>
  );
}