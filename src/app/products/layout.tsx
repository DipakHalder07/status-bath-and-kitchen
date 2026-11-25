import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://statusbathkitchen.com";

export const metadata: Metadata = {
  title: {
    default: "All Products — Modular Kitchens, Windows, Wardrobes, Glass Railings & Insect Blinds",
    template: "%s | Status Bath and Kitchen",
  },
  description:
    "Explore our full collection of modular kitchens, WAW aluminium windows, Ambiiance uPVC windows, custom wardrobes, glass railings, appliances, and Meshworkz insect blinds at Status Bath & Kitchen.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${siteUrl}/products`,
    siteName: "Status Bath and Kitchen",
    title: "All Products — Modular Kitchens, Windows, Wardrobes, Glass Railings & Insect Blinds",
    description:
      "Explore handcrafted modular kitchens, WAW aluminium & Ambiiance uPVC windows, fitted wardrobes, glass railings, and insect blinds. Custom-tailored and quoted on request at our showroom.",
    images: [
      {
        url: "/images/hero-kitchen.jpg",
        width: 1200,
        height: 630,
        alt: "Status Bath and Kitchen - All Modular Collections",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Products | Status Bath and Kitchen",
    description:
      "Explore handcrafted modular kitchens, WAW & Ambiiance windows, fitted wardrobes, glass railings, and insect blinds at our showroom.",
    images: ["/images/hero-kitchen.jpg"],
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
