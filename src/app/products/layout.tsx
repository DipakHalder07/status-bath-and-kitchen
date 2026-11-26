import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://statusbathkitchen.com";

export const metadata: Metadata = {
  title: {
    default: "Designs & Solutions — Modular Kitchens, Wardrobes, Doors & Windows",
    template: "%s | Status Bath and Kitchen",
  },
  description:
    "Explore modular kitchen layouts, custom wardrobes, architectural doors, WAW aluminium windows, Ambiiance uPVC windows, glass railings, insect blinds, and built-in appliances in Siliguri.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${siteUrl}/products`,
    siteName: "Status Bath and Kitchen",
    title: "Designs & Solutions — Status Bath and Kitchen Siliguri",
    description:
      "Custom designed on site and installed in Siliguri & North Bengal: modular kitchens, wardrobes, doors, WAW aluminium & Ambiiance uPVC windows, glass railings, and insect blinds.",
    images: [
      {
        url: "/images/hero-kitchen.jpg",
        width: 1200,
        height: 630,
        alt: "Status Bath and Kitchen — Custom Home Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Designs & Solutions | Status Bath and Kitchen",
    description:
      "Modular kitchens, wardrobes, doors, WAW aluminium & Ambiiance uPVC windows, glass railings, and Meshworkz insect blinds.",
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
