export default function AdminPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl p-8 shadow">
          <h2 className="text-gray-500">Products</h2>
          <p className="text-5xl font-bold mt-4">0</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow">
          <h2 className="text-gray-500">Variants</h2>
          <p className="text-5xl font-bold mt-4">0</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow">
          <h2 className="text-gray-500">Categories</h2>
          <p className="text-5xl font-bold mt-4">0</p>
        </div>

      </div>
    </div>
  );
}