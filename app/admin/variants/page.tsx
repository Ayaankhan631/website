"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ImageUploader from "@/components/admin/ImageUploader";

type Product = {
  id: string;
  name: string;
};

type Variant = {
  id: string;
  product_id: string;
  color: string;
  front_image: string | null;
  back_image: string | null;
  side_image: string | null;
  closeup_image: string | null;
  created_at?: string;

  products?: {
    name: string;
  }[] | null;
};

export default function VariantsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);

  const [productId, setProductId] = useState("");
  const [color, setColor] = useState("");

  const [frontImage, setFrontImage] = useState("");
  const [backImage, setBackImage] = useState("");
  const [sideImage, setSideImage] = useState("");
  const [closeupImage, setCloseupImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [variantsLoading, setVariantsLoading] = useState(true);

  // -----------------------------
  // LOAD PRODUCTS
  // -----------------------------

  const fetchProducts = useCallback(async () => {
    const { data, error } = await supabase
      .from("products")
      .select("id, name")
      .order("name", { ascending: true });

    if (error) {
      console.error("Products Error:", error);
      alert(error.message);
      return;
    }

    setProducts(data ?? []);
  }, []);

  // -----------------------------
  // LOAD VARIANTS
  // -----------------------------

  const fetchVariants = useCallback(async () => {
    setVariantsLoading(true);

    const { data, error } = await supabase
      .from("product_variants")
      .select(`
        id,
        product_id,
        color,
        front_image,
        back_image,
        side_image,
        closeup_image,
        created_at,
        products (
          name
        )
      `)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("Variant Error:", error);
      alert(error.message);
      setVariantsLoading(false);
      return;
    }

    // Supabase relation response ko safely type karna
    const formattedVariants: Variant[] = (data ?? []).map((item: any) => ({
      id: item.id,
      product_id: item.product_id,
      color: item.color,
      front_image: item.front_image,
      back_image: item.back_image,
      side_image: item.side_image,
      closeup_image: item.closeup_image,
      created_at: item.created_at,
      products: item.products
        ? Array.isArray(item.products)
          ? item.products
          : [item.products]
        : null,
    }));

    setVariants(formattedVariants);

    setVariantsLoading(false);
  }, []);

  // -----------------------------
  // INITIAL LOAD
  // -----------------------------

  useEffect(() => {
    fetchProducts();
    fetchVariants();
  }, [fetchProducts, fetchVariants]);

  // -----------------------------
  // SAVE VARIANT
  // -----------------------------

  async function saveVariant() {
    if (!productId || !color.trim()) {
      alert("Please select product and enter colour.");
      return;
    }

    if (!frontImage) {
      alert("Please upload Front Image.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase
        .from("product_variants")
        .insert([
          {
            product_id: productId,
            color: color.trim(),
            front_image: frontImage,
            back_image: backImage || null,
            side_image: sideImage || null,
            closeup_image: closeupImage || null,
          },
        ]);

      if (error) {
        throw error;
      }

      alert("✅ Variant Added Successfully");

      // Reset form
      setProductId("");
      setColor("");
      setFrontImage("");
      setBackImage("");
      setSideImage("");
      setCloseupImage("");

      // Refresh variants
      await fetchVariants();
    } catch (error: any) {
      console.error("Save Variant Error:", error);
      alert(error.message || "Failed to add variant.");
    } finally {
      setLoading(false);
    }
  }

  // -----------------------------
  // DELETE VARIANT
  // -----------------------------

  async function deleteVariant(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this variant?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("product_variants")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete Error:", error);
      alert(error.message);
      return;
    }

    alert("✅ Variant Deleted");

    await fetchVariants();
  }

  return (
    <main className="text-black">
      {/* PAGE HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Product Variants
          </h1>

          <p className="text-gray-500 mt-2">
            Manage product colours and variant images.
          </p>
        </div>
      </div>

      {/* ADD VARIANT */}

      <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 mb-10">
        <h2 className="text-2xl font-bold mb-6">
          Add New Variant
        </h2>

        {/* PRODUCT */}

        <div className="mb-5">
          <label className="block font-semibold mb-2">
            Product
          </label>

          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 text-black bg-white outline-none focus:border-black"
          >
            <option value="">
              Select Product
            </option>

            {products.map((product) => (
              <option
                key={product.id}
                value={product.id}
              >
                {product.name}
              </option>
            ))}
          </select>
        </div>

        {/* COLOUR */}

        <div className="mb-8">
          <label className="block font-semibold mb-2">
            Colour
          </label>

          <input
            type="text"
            placeholder="Example: Black"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 text-black outline-none focus:border-black"
          />
        </div>

        {/* FRONT IMAGE */}

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">
            Front Image
          </h3>

          <ImageUploader
            onUpload={setFrontImage}
          />

          {frontImage && (
            <img
              src={frontImage}
              alt="Front"
              className="w-40 h-40 object-cover rounded-xl border mt-4"
            />
          )}
        </div>

        {/* BACK IMAGE */}

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">
            Back Image
          </h3>

          <ImageUploader
            onUpload={setBackImage}
          />

          {backImage && (
            <img
              src={backImage}
              alt="Back"
              className="w-40 h-40 object-cover rounded-xl border mt-4"
            />
          )}
        </div>

        {/* SIDE IMAGE */}

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">
            Side Image
          </h3>

          <ImageUploader
            onUpload={setSideImage}
          />

          {sideImage && (
            <img
              src={sideImage}
              alt="Side"
              className="w-40 h-40 object-cover rounded-xl border mt-4"
            />
          )}
        </div>

        {/* CLOSEUP IMAGE */}

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">
            Closeup Image
          </h3>

          <ImageUploader
            onUpload={setCloseupImage}
          />

          {closeupImage && (
            <img
              src={closeupImage}
              alt="Closeup"
              className="w-40 h-40 object-cover rounded-xl border mt-4"
            />
          )}
        </div>

        {/* SAVE */}

        <button
          onClick={saveVariant}
          disabled={loading}
          className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Variant"}
        </button>
      </div>

      {/* EXISTING VARIANTS */}

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="p-6 md:p-8 border-b">
          <h2 className="text-2xl font-bold">
            Existing Variants
          </h2>

          <p className="text-gray-500 mt-1">
            {variants.length} variant
            {variants.length !== 1 ? "s" : ""}
          </p>
        </div>

        {variantsLoading ? (
          <div className="py-20 text-center text-gray-500">
            Loading Variants...
          </div>
        ) : variants.length === 0 ? (
          <div className="py-20 text-center">
            <h3 className="text-xl font-semibold">
              No Variants Found
            </h3>

            <p className="text-gray-500 mt-2">
              Add your first product variant above.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-4">
                    Image
                  </th>

                  <th className="text-left p-4">
                    Product
                  </th>

                  <th className="text-left p-4">
                    Colour
                  </th>

                  <th className="text-left p-4">
                    Images
                  </th>

                  <th className="text-left p-4">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {variants.map((variant) => (
                  <tr
                    key={variant.id}
                    className="border-t hover:bg-gray-50"
                  >
                    {/* MAIN IMAGE */}

                    <td className="p-4">
                      {variant.front_image ? (
                        <img
                          src={variant.front_image}
                          alt={variant.color}
                          className="w-20 h-24 object-cover rounded-xl border"
                        />
                      ) : (
                        <div className="w-20 h-24 rounded-xl border flex items-center justify-center text-xs text-gray-400">
                          No Image
                        </div>
                      )}
                    </td>

                    {/* PRODUCT */}

                    <td className="p-4 font-semibold">
                      {variant.products?.[0]?.name ||
                        "Unknown Product"}
                    </td>

                    {/* COLOUR */}

                    <td className="p-4">
                      <span className="inline-flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full border bg-gray-200" />

                        {variant.color}
                      </span>
                    </td>

                    {/* ALL IMAGES */}

                    <td className="p-4">
                      <div className="flex gap-2">
                        {[
                          variant.front_image,
                          variant.back_image,
                          variant.side_image,
                          variant.closeup_image,
                        ]
                          .filter(
                            (image): image is string =>
                              Boolean(image)
                          )
                          .map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`${variant.color} ${index + 1}`}
                              className="w-12 h-14 object-cover rounded-lg border"
                            />
                          ))}
                      </div>
                    </td>

                    {/* ACTIONS */}

                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/admin/variants/edit/${variant.id}`}
                          className="text-blue-600 font-medium hover:underline"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() =>
                            deleteVariant(variant.id)
                          }
                          className="text-red-600 font-medium hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}