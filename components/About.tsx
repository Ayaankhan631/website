export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        <div>
          <img
            src="/Banner/about.jpg"
            alt="About Us"
            className="rounded-3xl"
          />
        </div>

        <div>
          <h2 className="text-4xl font-bold">
            About AYAAN
          </h2>

          <p className="mt-6 text-gray-600 leading-8">
            We are a leading manufacturer and wholesaler of premium
            trousers and fashion wear. Our mission is to provide
            retailers and resellers with high-quality products at
            factory prices.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-10">
            <div>
              <h3 className="text-3xl font-bold">500+</h3>
              <p className="text-gray-500">Retailers</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">50+</h3>
              <p className="text-gray-500">Cities</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">10000+</h3>
              <p className="text-gray-500">Orders Delivered</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">5★</h3>
              <p className="text-gray-500">Customer Rating</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}