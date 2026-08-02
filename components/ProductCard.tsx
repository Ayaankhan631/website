import Link from "next/link";

type ProductCardProps = {
  id: string;
  name: string;
  price: string;
  image: string;
};

export default function ProductCard({
  id,
  name,
  price,
  image,
}: ProductCardProps) {
  return (
    <Link href={`/product/${id}`}>

      <div className="group overflow-hidden rounded-3xl bg-white border border-gray-200 hover:border-black transition-all duration-500 hover:shadow-2xl cursor-pointer">

        {/* Image */}
        <div className="relative bg-[#fafafa] overflow-hidden">

          {/* Badge */}
          <span className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20 bg-black text-white text-[10px] sm:text-xs tracking-widest uppercase px-3 py-2 rounded-full">
            New Arrival
          </span>

          {/* Product Image */}
          {image ? (
            <img
              src={image}
              alt={name}
              className="
                w-full
                h-[280px]
                sm:h-[360px]
                md:h-[420px]
                lg:h-[470px]
                xl:h-[500px]
                object-contain
                p-5
                sm:p-7
                lg:p-8
                transition-all
                duration-700
                group-hover:scale-105
              "
            />
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}

        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 lg:p-8">

          {/* Product Name */}
          <h3 className="text-xl sm:text-2xl font-bold text-black leading-tight line-clamp-2">
            {name}
          </h3>

          {/* Subtitle */}
          <p className="mt-2 text-sm sm:text-base text-gray-500">
            Premium Wholesale Collection
          </p>

          {/* Price */}
          <div className="flex items-end justify-between mt-6">

            <div>

              <p className="text-2xl sm:text-3xl font-black text-black">
                ₹{price}
              </p>

              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                MOQ • 20 Pieces
              </p>

            </div>

            <span className="px-3 py-2 rounded-full bg-green-100 text-green-700 text-xs sm:text-sm font-semibold whitespace-nowrap">
              Ready Stock
            </span>

          </div>

          {/* Button */}
          <div className="mt-6">

            <div
              className="
                w-full
                py-3 sm:py-4
                rounded-2xl
                bg-black
                text-white
                text-center
                font-semibold
                text-base sm:text-lg
                transition-all
                duration-300
                group-hover:bg-gray-800
              "
            >
              View Details →
            </div>

          </div>

        </div>

      </div>

    </Link>
  );
}