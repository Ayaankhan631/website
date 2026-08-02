import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col">

        <div className="p-8 border-b border-gray-800">
          <h1 className="text-2xl font-bold tracking-wide">
            AYAAN ADMIN
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Wholesale Dashboard
          </p>
        </div>

        <nav className="flex-1 p-6 space-y-3">

          <Link
            href="/admin"
            className="block px-4 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            📊 Dashboard
          </Link>

          <Link
            href="/admin/products"
            className="block px-4 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            📦 Products
          </Link>

          <Link
            href="/admin/variants"
            className="block px-4 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            🎨 Variants
          </Link>

          <Link
            href="/admin/categories"
            className="block px-4 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            🗂 Categories
          </Link>

          <Link
            href="/admin/settings"
            className="block px-4 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            ⚙ Settings
          </Link>

        </nav>

        <div className="p-6 border-t border-gray-800 text-sm text-gray-400">
          © 2026 AYAAN
        </div>

      </aside>

      {/* Main Content */}
      <div className="flex-1">

        {/* Topbar */}
        <header className="h-20 bg-white border-b flex items-center justify-between px-8">

          <h2 className="text-3xl font-bold text-black">
            Admin Dashboard
          </h2>

          <div className="flex items-center gap-4">

            <input
              type="text"
              placeholder="Search..."
              className="border rounded-xl px-4 py-2 w-72 outline-none focus:ring-2 focus:ring-black"
            />

            <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center font-bold">
              A
            </div>

          </div>

        </header>

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
}