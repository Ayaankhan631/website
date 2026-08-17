import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ProductDetails from "@/components/ProductDetails";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

type Variant = {
  color: string;
  front_image: string | null;
  back_image: string | null;
  side_image: string | null;
  closeup_image: string | null;
};

export default async function ProductPage({
  params,
}: PageProps) {
  const { id } = await params;

  // Fetch Product
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) {
    notFound();
  }

  // Fetch Variants
  const { data: variants, error: variantError } = await supabase
    .from("product_variants")
    .select("*")
    .eq("product_id", id);

  console.log("Variant Error:", variantError);
  console.log("Variants:", variants);

  // Remove duplicate colours
  const uniqueVariants: Variant[] =
    variants && variants.length > 0
      ? Object.values(
          variants.reduce<Record<string, Variant>>((acc, variant) => {
            acc[variant.color] = variant as Variant;
            return acc;
          }, {})
        )
      : [];

  const formattedProduct = {
    ...product,
    variants:
      uniqueVariants.length > 0
        ? uniqueVariants.map((variant) => ({
            color: variant.color,
            images: [
              variant.front_image,
              variant.back_image,
              variant.side_image,
              variant.closeup_image,
            ].filter(
              (img): img is string => Boolean(img)
            ),
          }))
        : [
            {
              color: product.color,
              images: [product.image],
            },
          ],
  };

  return (
    <main className="w-full min-h-screen bg-white">
      <div className="max-w-[1800px] mx-auto px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition"
        >
          ← Back to Home
        </Link>

        <ProductDetails product={formattedProduct} />
      </div>
    </main>
  );
}