"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ImageUploader from "@/components/admin/ImageUploader";

type Category = {
  id: string;
  name: string;
};

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [moq, setMoq] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);

  const [frontImage, setFrontImage] = useState("");
  const [backImage, setBackImage] = useState("");
  const [sideImage, setSideImage] = useState("");

  // ================================
  // FETCH PRODUCT
  // ================================

  const fetchProduct = useCallback(async () => {
    if (!id) return;

    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Product Error:", error);
      alert(error.message);
      setLoading(false);
      return;
    }

    setName(data?.name ?? "");
    setPrice(String(data?.price ?? ""));
    setMoq(String(data?.moq ?? ""));
    setCategory(data?.category ?? "");
    setDescription(data?.description ?? "");
    setColor(data?.color ?? "");

    setFrontImage(data?.front_image || data?.image || "");
    setBackImage(data?.back_image || "");
    setSideImage(data?.side_image || "");

    setLoading(false);
  }, [id]);

  // ================================
  // FETCH CATEGORIES
  // ================================

  const fetchCategories = useCallback(async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name")
      .order("name", { ascending: true });

    if (error) {
      console.error("Category Error:", error);
      alert(error.message);
      return;
    }

    setCategories(data ?? []);
  }, []);

  // ================================
  // LOAD DATA
  // ================================

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [fetchProduct, fetchCategories]);

  // ================================
  // UPDATE PRODUCT
  // ================================

  async function updateProduct() {
    if (!name.trim()) {
      alert("Please enter Product Name");
      return;
    }

    if (!price.trim()) {
      alert("Please enter Price");
      return;
    }

    if (!category) {
      alert("Please select Category");
      return;
    }

    try {
      setUpdating(true);

      const { error } = await supabase
        .from("products")
        .update({
          name: name.trim(),
          price: price.trim(),
          moq: moq.trim(),
          category,
          description: description.trim(),
          color: color.trim(),

          image: frontImage,
          front_image: frontImage,
          back_image: backImage,
          side_image: sideImage,
        })
        .eq("id", id);

      if (error) {
        throw error;
      }

      alert("✅ Product Updated Successfully");

      router.push("/admin/products");
      router.refresh();
    } catch (error: any) {
      console.error("Update Error:", error);
      alert(error.message || "Failed to update product");
    } finally {
      setUpdating(false);
    }
  }

  // ================================
  // LOADING
  // ================================

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-black text-lg font-semibold">
          Loading Product...
        </p>
      </main>
    );
  }

  // ================================
  // PAGE
  // ================================

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}

        <h1 className="text-4xl font-bold text-black mb-8">
          Edit Product
        </h1>

        {/* FORM */}

        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 space-y-6">

          {/* PRODUCT NAME */}

          <div>
            <label className="block font-semibold text-black mb-2">
              Product Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
              className="w-full border border-gray-300 rounded-xl p-3 text-black bg-white outline-none focus:border-black"
            />
          </div>

          {/* PRICE */}

          <div>
            <label className="block font-semibold text-black mb-2">
              Price
            </label>

            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full border border-gray-300 rounded-xl p-3 text-black bg-white outline-none focus:border-black"
            />
          </div>

          {/* MOQ */}

          <div>
            <label className="block font-semibold text-black mb-2">
              MOQ
            </label>

            <input
              type="text"
              value={moq}
              onChange={(e) => setMoq(e.target.value)}
              placeholder="Example: 10"
              className="w-full border border-gray-300 rounded-xl p-3 text-black bg-white outline-none focus:border-black"
            />
          </div>

          {/* CATEGORY DROPDOWN */}

          <div>
            <label className="block font-semibold text-black mb-2">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 text-black bg-white outline-none focus:border-black"
            >
              <option value="">
                Select Category
              </option>

              {categories.map((item) => (
                <option
                  key={item.id}
                  value={item.name}
                >
                  {item.name}
                </option>
              ))}
            </select>

            {categories.length === 0 && (
              <p className="text-sm text-gray-500 mt-2">
                No categories found. Create a category first.
              </p>
            )}
          </div>

          {/* DESCRIPTION */}

          <div>
            <label className="block font-semibold text-black mb-2">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product Description"
              rows={6}
              className="w-full border border-gray-300 rounded-xl p-3 text-black bg-white outline-none focus:border-black resize-none"
            />
          </div>

          {/* COLOUR */}

          <div>
            <label className="block font-semibold text-black mb-2">
              Colour
            </label>

            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="Example: Black"
              className="w-full border border-gray-300 rounded-xl p-3 text-black bg-white outline-none focus:border-black"
            />
          </div>

          {/* FRONT IMAGE */}

          <div>
            <h3 className="font-semibold text-black mb-3">
              Front Image
            </h3>

            <ImageUploader
              onUpload={setFrontImage}
            />

            {frontImage && (
              <img
                src={frontImage}
                alt="Front"
                className="w-44 h-44 object-cover rounded-xl border mt-4"
              />
            )}
          </div>

          {/* BACK IMAGE */}

          <div>
            <h3 className="font-semibold text-black mb-3">
              Back Image
            </h3>

            <ImageUploader
              onUpload={setBackImage}
            />

            {backImage && (
              <img
                src={backImage}
                alt="Back"
                className="w-44 h-44 object-cover rounded-xl border mt-4"
              />
            )}
          </div>

          {/* SIDE IMAGE */}

          <div>
            <h3 className="font-semibold text-black mb-3">
              Side Image
            </h3>

            <ImageUploader
              onUpload={setSideImage}
            />

            {sideImage && (
              <img
                src={sideImage}
                alt="Side"
                className="w-44 h-44 object-cover rounded-xl border mt-4"
              />
            )}
          </div>

          {/* BUTTONS */}

          <div className="flex flex-col sm:flex-row gap-4 pt-6">

            <button
              onClick={updateProduct}
              disabled={updating}
              className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
            >
              {updating
                ? "Updating..."
                : "Update Product"}
            </button>

            <button
              onClick={() => router.back()}
              disabled={updating}
              className="border border-gray-300 text-black px-8 py-3 rounded-xl hover:bg-gray-100 transition"
            >
              Cancel
            </button>

          </div>

        </div>
      </div>
    </main>
  );
}