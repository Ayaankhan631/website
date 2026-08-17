"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Category = {
  id: string;
  name: string;
};

export default function AddProductPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const [categories, setCategories] = useState<Category[]>([]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [moq, setMoq] = useState("");
  const [description, setDescription] = useState("");

  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [sideImage, setSideImage] = useState<File | null>(null);

  // --------------------------------
  // LOAD CATEGORIES
  // --------------------------------

  const fetchCategories = useCallback(async () => {
    setCategoriesLoading(true);

    const { data, error } = await supabase
      .from("categories")
      .select("id,name")
      .order("name", { ascending: true });

    if (error) {
      console.error(error);
      alert(error.message);
      setCategoriesLoading(false);
      return;
    }

    setCategories(data ?? []);
    setCategoriesLoading(false);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // --------------------------------
  // UPLOAD IMAGE
  // --------------------------------

  async function uploadImage(file: File) {
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, file);

    if (error) {
      throw error;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    return publicUrl;
  }

  // --------------------------------
  // SAVE PRODUCT
  // --------------------------------

  async function saveProduct() {
    if (!name.trim()) {
      alert("Please enter Product Name");
      return;
    }

    if (!category) {
      alert("Please select Category");
      return;
    }

    if (!price.trim()) {
      alert("Please enter Price");
      return;
    }

    if (!moq.trim()) {
      alert("Please enter MOQ");
      return;
    }

    if (!frontImage) {
      alert("Please select Front Image");
      return;
    }

    try {
      setLoading(true);

      const front = await uploadImage(frontImage);

      let back = "";
      let side = "";

      if (backImage) {
        back = await uploadImage(backImage);
      }

      if (sideImage) {
        side = await uploadImage(sideImage);
      }

      const { error } = await supabase
        .from("products")
        .insert([
          {
            name: name.trim(),
            category,
            price: price.trim(),
            moq: moq.trim(),
            description: description.trim(),

            image: front,

            front_image: front,
            back_image: back || null,
            side_image: side || null,
          },
        ]);

      if (error) {
        throw error;
      }

      alert("✅ Product Added Successfully");

      router.push("/admin/products");
      router.refresh();

    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to add product.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="text-black">

      <h1 className="text-4xl font-bold mb-10">
        Add Product
      </h1>

      <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 space-y-6">

        {/* PRODUCT NAME */}

        <div>
          <label className="block font-semibold mb-2">
            Product Name
          </label>

          <input
            type="text"
            placeholder="Example: Korean Wide Leg Pants"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 text-black outline-none focus:border-black"
          />
        </div>

        {/* CATEGORY */}

        <div>
          <label className="block font-semibold mb-2">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={categoriesLoading}
            className="w-full border border-gray-300 rounded-xl p-4 text-black bg-white outline-none focus:border-black disabled:bg-gray-100"
          >
            <option value="">
              {categoriesLoading
                ? "Loading Categories..."
                : "Select Category"}
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

          {!categoriesLoading && categories.length === 0 && (
            <p className="text-sm text-red-600 mt-2">
              No categories found. Add a category first.
            </p>
          )}
        </div>

        {/* PRICE */}

        <div>
          <label className="block font-semibold mb-2">
            Price
          </label>

          <input
            type="text"
            placeholder="Example: 349"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 text-black outline-none focus:border-black"
          />
        </div>

        {/* MOQ */}

        <div>
          <label className="block font-semibold mb-2">
            Minimum Order Quantity
          </label>

          <input
            type="text"
            placeholder="Example: 10"
            value={moq}
            onChange={(e) => setMoq(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 text-black outline-none focus:border-black"
          />
        </div>

        {/* DESCRIPTION */}

        <div>
          <label className="block font-semibold mb-2">
            Description
          </label>

          <textarea
            rows={5}
            placeholder="Product description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 text-black outline-none focus:border-black"
          />
        </div>

        {/* FRONT IMAGE */}

        <div>
          <label className="block font-semibold mb-2">
            Front Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFrontImage(e.target.files?.[0] || null)
            }
            className="text-black"
          />
        </div>

        {/* BACK IMAGE */}

        <div>
          <label className="block font-semibold mb-2">
            Back Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setBackImage(e.target.files?.[0] || null)
            }
            className="text-black"
          />
        </div>

        {/* SIDE IMAGE */}

        <div>
          <label className="block font-semibold mb-2">
            Side Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setSideImage(e.target.files?.[0] || null)
            }
            className="text-black"
          />
        </div>

        {/* SAVE */}

        <div className="pt-4">

          <button
            onClick={saveProduct}
            disabled={loading}
            className="bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Saving Product..." : "Save Product"}
          </button>

        </div>

      </div>

    </main>
  );
}