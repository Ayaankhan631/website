"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ImageUploader from "@/components/admin/ImageUploader";

export default function VariantsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [productId, setProductId] = useState("");
  const [color, setColor] = useState("");

  const [frontImage, setFrontImage] = useState("");
  const [backImage, setBackImage] = useState("");
  const [sideImage, setSideImage] = useState("");
  const [closeupImage, setCloseupImage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data } = await supabase
      .from("products")
      .select("id,name")
      .order("name");

    if (data) setProducts(data);
  }

  async function saveVariant() {
  if (!productId || !color) {
    alert("Please select product and enter colour");
    return;
  }

  const { error } = await supabase
    .from("product_variants")
    .insert([
      {
        product_id: productId,
        color: color,
        front_image: frontImage,
        back_image: backImage,
        side_image: sideImage,
        closeup_image: closeupImage,
      },
    ]);

  if (error) {
    alert(error.message);
    return;
  }

  alert("✅ Variant Added Successfully");

  setProductId("");
  setColor("");
  setFrontImage("");
  setBackImage("");
  setSideImage("");
  setCloseupImage("");
}


  return (
    <main className="max-w-6xl mx-auto">

      <h1 className="text-4xl font-bold mb-8 text-black">
        Product Variants
      </h1>

      <div className="bg-white rounded-2xl shadow p-8">

        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="w-full border rounded-xl p-3 mb-5 text-black"
        >
          <option value="">Select Product</option>

          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Colour"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full border rounded-xl p-3 mb-8 text-black"
        />

        {/* Front Image */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3 text-black">
            Front Image
          </h3>

          <ImageUploader onUpload={setFrontImage} />

          {frontImage && (
            <img
              src={frontImage}
              alt="Front"
              className="w-40 h-40 object-cover rounded-xl border mt-4"
            />
          )}
        </div>

        {/* Back Image */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3 text-black">
            Back Image
          </h3>

          <ImageUploader onUpload={setBackImage} />

          {backImage && (
            <img
              src={backImage}
              alt="Back"
              className="w-40 h-40 object-cover rounded-xl border mt-4"
            />
          )}
        </div>

        {/* Side Image */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3 text-black">
            Side Image
          </h3>

          <ImageUploader onUpload={setSideImage} />

          {sideImage && (
            <img
              src={sideImage}
              alt="Side"
              className="w-40 h-40 object-cover rounded-xl border mt-4"
            />
          )}
        </div>

        {/* Closeup Image */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3 text-black">
            Closeup Image
          </h3>

          <ImageUploader onUpload={setCloseupImage} />

          {closeupImage && (
            <img
              src={closeupImage}
              alt="Closeup"
              className="w-40 h-40 object-cover rounded-xl border mt-4"
            />
          )}
        </div>
        <button
  onClick={saveVariant}
  className="mt-6 bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800"
>
  Save Variant
</button>

      </div>

    </main>
  );
}