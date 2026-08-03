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
    <Link href={`/product/${id}`} className="group block">
      <div
        className="
          overflow-hidden
          rounded-3xl
          bg-white
          border
          border-gray-200
          transition-all
          duration-500
          hover:border-black
          hover:shadow-2xl
        "
      >
        {/* Image */}
        <div className="relative bg-[#fafafa] overflow-hidden">

          {/* Badge */}
          <span
            className="
              absolute
              top-4
              left-4
              z-20
              bg-black
              text-white
              text-[10px]
              sm:text-xs
              tracking-widest
              uppercase
              px-3
              py-2
              rounded-full
            "
          >
            New Arrival
          </span>

          {image ? (
            <img
              src={image}
              alt={name}
              className="
                w-full
                h-[260px]
                sm:h-[340px]
                md:h-[400px]
                lg:h-[440px]
                xl:h-[500px]
                object-contain
                p-6
                sm:p-8
                transition-all
                duration-700
                group-hover:scale-105
              "
            />
          ) : (
            <div
              className="
                h-[260px]
                sm:h-[340px]
                flex
                items-center
                justify-center
                text-gray-400
              "
            >
              No Image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 sm:p-7">

          <h3
            className="
              text-xl
              sm:text-2xl
              font-bold
              text-black
              leading-tight
            "
            style={{
              fontFamily: "var(--font-cormorant)",
            }}
          >
            {name}
          </h3>

          <p
            className="
              mt-2
              text-gray-500
              text-sm
              sm:text-base
            "
          >
            Premium Wholesale Collection
          </p>

          <div className="flex justify-between items-end mt-6">

            <div>

              <p
                className="
                  text-2xl
                  sm:text-3xl
                  font-black
                  text-gray-700
                "
              >
                ₹{price}
              </p>

              <p
                className="
                  text-xs
                  sm:text-sm
                  text-gray-700
                  mt-1
                "
              >
                MOQ • 20 Pieces
              </p>

            </div>

            <span
              className="
                bg-green-100
                text-green-700
                px-3
                py-2
                rounded-full
                text-xs
                sm:text-sm
                font-semibold
              "
            >
              Ready Stock
            </span>

          </div>

          <div className="mt-6">

            <div
              className="
                w-full
                py-3
                sm:py-4
                rounded-2xl
                bg-black
                text-white
                text-center
                text-sm
                sm:text-base
                font-semibold
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