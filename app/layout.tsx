import "./globals.css";
import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { CartProvider } from "@/Context/CartContext";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "TAKAI | Premium Wholesale Fashion",
  description:
    "TAKAI is a premium wholesale clothing manufacturer specializing in Korean trousers, cargo pants, wide-leg trousers and fashion apparel.",

  keywords: [
    "TAKAI",
    "Wholesale Clothing",
    "Korean Pants",
    "Cargo Pants",
    "Manufacturer",
    "Wholesale Fashion",
  ],

  authors: [{ name: "TAKAI" }],

  creator: "TAKAI",

  applicationName: "TAKAI",

  metadataBase: new URL("https://takai.in"),

  openGraph: {
    title: "TAKAI | Premium Wholesale Fashion",
    description:
      "Premium Wholesale Clothing Manufacturer",
    url: "https://takai.in",
    siteName: "TAKAI",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "TAKAI",
    description: "Premium Wholesale Clothing Manufacturer",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} antialiased`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}