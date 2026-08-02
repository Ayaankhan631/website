import Link from "next/link";

const categories = [
  {
    name: "Formal Trouser",
    image: "/Product/Formal-Trouser/Khaki/Khaki-front.png",
    link: "/product/formal-trouser",
  },
  {
    name: "Korean Pants",
    image: "/Product/Korean-Pants/Black/Black_front.png",
    link: "/product/korean-pants",
  },
];

export default function CategorySection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Shop by Category
          </h2>

          <p className="text-gray-500 mt-3">
            Explore our premium wholesale collections.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">

          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.link}
              className="group"
            >
              <div className="rounded-3xl overflow-hidden border bg-gray-50 hover:shadow-xl transition">

                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-[450px] object-contain bg-white group-hover:scale-105 transition duration-500"
                />

                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold">
                    {category.name}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    View Collection →
                  </p>
                </div>

              </div>
            </Link>
          ))}

        </div>

      </div>
    </section>
  );
}