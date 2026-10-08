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
  title: "STATUS Doors & Windows | Premium Doors, Windows & Living Solutions",
  description:
    "Explore STATUS Doors & Windows. Precision-engineered premium architectural systems, doors, windows, and luxury living solutions crafted with superior quality.",
  keywords: [
    "STATUS Doors & Windows",
    "Luxury Doors",
    "Architectural Windows",
    "Premium Living",
    "Interiors India",
  ],
  icons: {
    icon: "/images/status-logo-dark.png",
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
