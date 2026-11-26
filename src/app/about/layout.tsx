import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://statusbathkitchen.com";

export const metadata: Metadata = {
  title: "About Status Bath & Kitchen — Siliguri's Trusted Home Interiors Studio",
  description:
    "For over 10 years, Status Bath & Kitchen has designed and installed custom modular kitchens, wardrobes, WAW aluminium & Ambiiance uPVC windows, glass railings, and insect blinds across Siliguri and North Bengal.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${siteUrl}/about`,
    siteName: "Status Bath and Kitchen",
    title: "About Status Bath & Kitchen | Siliguri & North Bengal",
    description:
      "Over 10 years and 500+ homes completed across Siliguri & North Bengal by one dedicated design-to-installation team.",
    images: [
      {
        url: "/images/hero-kitchen.jpg",
        width: 1200,
        height: 630,
        alt: "Status Bath and Kitchen — Siliguri Experience Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Status Bath & Kitchen | Siliguri Experience Studio",
    description:
      "One in-house team for modular kitchens, wardrobes, WAW aluminium windows, Ambiiance uPVC windows, and Meshworkz insect blinds.",
    images: ["/images/hero-kitchen.jpg"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
