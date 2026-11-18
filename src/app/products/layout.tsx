import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://statusbathkitchen.com";

export const metadata: Metadata = {
  title: {
    default: "All Products — Modular Kitchens, Bathrooms, Wardrobes, Doors & Windows",
    template: "%s | Status Bath and Kitchen",
  },
  description:
    "Explore our full collection of precision-engineered modular kitchens, luxury bathroom suites, custom wardrobes, architectural doors, and designer windows at Status Bath & Kitchen.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${siteUrl}/products`,
    siteName: "Status Bath and Kitchen",
    title: "All Products — Modular Kitchens, Bathrooms, Wardrobes, Doors & Windows",
    description:
      "Explore handcrafted modular kitchens, bathroom vanities, fitted wardrobes, and architectural doors & windows. Custom-tailored and quoted on request at our showroom.",
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
      "Explore handcrafted modular kitchens, bathroom vanities, fitted wardrobes, and architectural doors & windows at our showroom.",
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
