import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://statusbathkitchen.com";

export const metadata: Metadata = {
  title: "About Us — Design Philosophy, Craftsmanship & Facility",
  description:
    "Learn how Status Bath and Kitchen transforms homes with automated German precision joinery, Austrian soft-close hardware, and bespoke architectural kitchens, bathrooms, and wardrobes.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${siteUrl}/about`,
    siteName: "Status Bath and Kitchen",
    title: "About Us — Design Philosophy & Craftsmanship | Status Bath and Kitchen",
    description:
      "Explore the architectural engineering and material science behind our bespoke modular kitchens, luxury bathrooms, doors, and custom wardrobes.",
    images: [
      {
        url: "/images/status/about_hero_poster.jpg",
        width: 1200,
        height: 630,
        alt: "Status Bath and Kitchen - Design Philosophy & Showroom",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Status Bath and Kitchen | Craftsmanship & Architecture",
    description:
      "Explore the architectural engineering and material science behind our bespoke modular kitchens, luxury bathrooms, and wardrobes.",
    images: ["/images/status/about_hero_poster.jpg"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

