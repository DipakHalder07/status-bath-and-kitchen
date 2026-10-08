import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Status Bath and Kitchen | Modular Kitchens, Bathrooms, Wardrobes, Doors & Windows",
  description:
    "Status Bath and Kitchen designs, supplies and installs modular kitchens, bathrooms, wardrobes, doors and windows, along with kitchen appliances and accessories.",
  keywords: [
    "Status Bath and Kitchen",
    "Modular Kitchens",
    "Bathrooms",
    "Wardrobes",
    "Doors",
    "Windows",
    "Kitchen Appliances",
    "Kitchen Accessories",
  ],
  icons: {
    icon: "/images/status-bk-icon.png",
    apple: "/images/status-bk-apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-gray-900 selection:bg-red-100 selection:text-red-900">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
