"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Category = {
  id: string;
  name: string;
  created_at?: string;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchCategories = useCallback(async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error(error);
      alert(error.message);
      setLoading(false);
      return;
    }

    setCategories(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  async function addCategory() {
    const categoryName = name.trim();

    if (!categoryName) {
      alert("Please enter category name.");
      return;
    }

    try {
      setSaving(true);

      const { error } = await supabase
        .from("categories")
        .insert([
          {
            name: categoryName,
          },
        ]);

      if (error) {
        throw error;
      }

      alert("✅ Category Added Successfully");

      setName("");
      fetchCategories();
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to add category.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteCategory(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("✅ Category Deleted");

    fetchCategories();
  }

  async function editCategory(category: Category) {
    const newName = window.prompt(
      "Enter new category name:",
      category.name
    );

    if (newName === null) return;

    const trimmedName = newName.trim();

    if (!trimmedName) {
      alert("Category name cannot be empty.");
      return;
    }

    const { error } = await supabase
      .from("categories")
      .update({
        name: trimmedName,
      })
      .eq("id", category.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("✅ Category Updated");

    fetchCategories();
  }

  return (
    <main className="text-black">

      {/* HEADER */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Categories
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your product categories.
        </p>
      </div>

      {/* ADD CATEGORY */}

      <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 mb-10">

        <h2 className="text-2xl font-bold mb-6">
          Add New Category
        </h2>

        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="Example: Korean Pants"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addCategory();
              }
            }}
            className="flex-1 border border-gray-300 rounded-xl p-3 text-black outline-none focus:border-black"
          />

          <button
            onClick={addCategory}
            disabled={saving}
            className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
          >
            {saving ? "Adding..." : "Add Category"}
          </button>

        </div>

      </div>

      {/* CATEGORY LIST */}

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

        <div className="p-6 md:p-8 border-b">

          <h2 className="text-2xl font-bold">
            Existing Categories
          </h2>

          <p className="text-gray-500 mt-1">
            {categories.length}{" "}
            {categories.length === 1 ? "category" : "categories"}
          </p>

        </div>

        {loading ? (
          <div className="py-20 text-center text-gray-500">
            Loading Categories...
          </div>
        ) : categories.length === 0 ? (
          <div className="py-20 text-center">

            <h3 className="text-xl font-semibold">
              No Categories Found
            </h3>

            <p className="text-gray-500 mt-2">
              Add your first category above.
            </p>

          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>
                  <th className="text-left p-4">
                    Category
                  </th>

                  <th className="text-left p-4">
                    Actions
                  </th>
                </tr>

              </thead>

              <tbody>

                {categories.map((category) => (
                  <tr
                    key={category.id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="p-4 font-semibold">
                      {category.name}
                    </td>

                    <td className="p-4">

                      <div className="flex gap-5">

                        <button
                          onClick={() =>
                            editCategory(category)
                          }
                          className="text-blue-600 font-medium hover:underline"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteCategory(category.id)
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