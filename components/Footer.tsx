export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">

        <div>
          <h2 className="text-3xl font-bold">
            AYAAN
          </h2>

          <p className="mt-4 text-gray-400">
            Premium Wholesale Clothing Manufacturer.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-xl mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-400">
            <li>Home</li>
            <li>Products</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-xl mb-4">
            Contact
          </h3>

          <p className="text-gray-400">
            📞 +91 93152 81752
          </p>

          <p className="text-gray-400 mt-2">
            ✉ info@ayaanfashion.com
          </p>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500">
        © 2026 TAKAI. All Rights Reserved.
      </div>
    </footer>
  );
}