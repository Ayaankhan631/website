export default function Features() {
  const features = [
    {
      title: "Manufacturer Pricing",
      desc: "Direct factory prices with maximum profit margins.",
      icon: "🏭",
    },
    {
      title: "Premium Quality",
      desc: "High-quality fabrics with strict quality checks.",
      icon: "⭐",
    },
    {
      title: "Pan India Delivery",
      desc: "Fast and secure shipping across India.",
      icon: "🚚",
    },
    {
      title: "Low MOQ",
      desc: "Minimum order starts from just 10 pieces.",
      icon: "📦",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Why Choose Us
          </h2>

          <p className="text-gray-500 mt-3">
            Trusted by wholesalers and retailers across India.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-3xl p-8 shadow hover:shadow-xl transition text-center"
            >
              <div className="text-5xl mb-5">{item.icon}</div>

              <h3 className="text-xl font-bold">
                {item.title}
              </h3>

              <p className="text-gray-500 mt-3">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}