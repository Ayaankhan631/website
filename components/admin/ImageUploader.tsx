"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ImageUploader({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  async function uploadImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, file);

    if (error) {
      alert(error.message);
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    onUpload(publicUrl);

    setUploading(false);
  }

  return (
    <div>

      <input
        type="file"
        accept="image/*"
        onChange={uploadImage}
      />

      {uploading && (
        <p className="mt-2 text-sm">
          Uploading...
        </p>
      )}

    </div>
  );
}