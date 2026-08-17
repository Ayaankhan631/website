"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ImageUploader from "@/components/admin/ImageUploader";

export default function EditVariantPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [color, setColor] = useState("");

  const [frontImage, setFrontImage] = useState("");
  const [backImage, setBackImage] = useState("");
  const [sideImage, setSideImage] = useState("");
  const [closeupImage, setCloseupImage] = useState("");

  // -----------------------------
  // LOAD VARIANT
  // -----------------------------

  const fetchVariant = useCallback(async () => {
    if (!id) return;

    setLoading(true);

    const { data, error } = await supabase
      .from("product_variants")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Variant Error:", error);
      alert(error.message);
      setLoading(false);
      return;
    }

    setColor(data?.color ?? "");

    setFrontImage(data?.front_image ?? "");
    setBackImage(data?.back_image ?? "");
    setSideImage(data?.side_image ?? "");
    setCloseupImage(data?.closeup_image ?? "");

    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchVariant();
  }, [fetchVariant]);

  // -----------------------------
  // UPDATE VARIANT
  // -----------------------------

  async function updateVariant() {
    if (!color.trim()) {
      alert("Please enter colour.");
      return;
    }

    if (!frontImage) {
      alert("Please upload Front Image.");
      return;
    }

    try {
      setSaving(true);

      const { error } = await supabase
        .from("product_variants")
        .update({
          color: color.trim(),

          front_image: frontImage,
          back_image: backImage || null,
          side_image: sideImage || null,
          closeup_image: closeupImage || null,
        })
        .eq("id", id);

      if (error) {
        throw error;
      }

      alert("✅ Variant Updated Successfully");

      router.push("/admin/variants");
      router.refresh();
    } catch (error: any) {
      console.error("Update Variant Error:", error);
      alert(error.message || "Failed to update variant.");
    } finally {
      setSaving(false);
    }
  }

  // -----------------------------
  // LOADING
  // -----------------------------

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-black">
        <div className="text-xl font-medium">
          Loading Variant...
        </div>
      </main>
    );
  }

  // -----------------------------
  // PAGE
  // -----------------------------

  return (
    <main className="text-black">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Edit Variant
        </h1>

        <p className="text-gray-500 mt-2">
          Update colour and variant images.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">

        {/* COLOUR */}

        <div className="mb-8">
          <label className="block font-semibold mb-2">
            Colour
          </label>

          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Example: Black"
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
            <div className="mt-4">
              <img
                src={frontImage}
                alt="Front"
                className="w-44 h-44 object-cover rounded-xl border"
              />
            </div>
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
            <div className="mt-4">
              <img
                src={backImage}
                alt="Back"
                className="w-44 h-44 object-cover rounded-xl border"
              />
            </div>
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
            <div className="mt-4">
              <img
                src={sideImage}
                alt="Side"
                className="w-44 h-44 object-cover rounded-xl border"
              />
            </div>
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
            <div className="mt-4">
              <img
                src={closeupImage}
                alt="Closeup"
                className="w-44 h-44 object-cover rounded-xl border"
              />
            </div>
          )}
        </div>

        {/* BUTTONS */}

        <div className="flex flex-col sm:flex-row gap-4 pt-4">

          <button
            onClick={updateVariant}
            disabled={saving}
            className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
          >
            {saving ? "Updating..." : "Update Variant"}
          </button>

          <button
            onClick={() => router.back()}
            disabled={saving}
            className="border border-gray-300 px-8 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            Cancel
          </button>

        </div>

      </div>
    </main>
  );
}