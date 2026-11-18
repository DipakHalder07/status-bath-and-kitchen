import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const ceraFont = localFont({
  src: [
    {
      path: "../../public/fonts/CeraGodrejInterio-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/CeraGodrejInterio-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/CeraGodrejInterio-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/CeraGodrejInterio-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-cera",
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
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
    <html lang="en" className={`${ceraFont.variable} h-full antialiased font-sans`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-[#4a4541] selection:bg-red-100 selection:text-red-900">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
