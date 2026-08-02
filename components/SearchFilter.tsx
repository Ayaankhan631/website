"use client";

import { useState } from "react";

export default function SearchFilter() {
  const [search, setSearch] = useState("");

  return (
    <section className="bg-white py-10 border-b">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-4">

          {/* Search */}
          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-xl px-5 py-3 w-full"
          />

          {/* Category */}
          <select className="border rounded-xl px-5 py-3">
            <option>All Categories</option>
            <option>Formal Trouser</option>
            <option>Korean Pants</option>
          </select>

          {/* Color */}
          <select className="border rounded-xl px-5 py-3">
            <option>All Colors</option>
            <option>Black</option>
            <option>Beige</option>
            <option>Khaki</option>
            <option>Wine</option>
            <option>Brown</option>
          </select>

        </div>

      </div>
    </section>
  );
}