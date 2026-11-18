import React, { Suspense } from "react";
import type { Metadata } from "next";
import BlogListClient from "./BlogListClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://statusbathkitchen.com";

export const metadata: Metadata = {
  title: "Design Ideas, Home Guides & Modular Living Blog",
  description:
    "Explore master architectural guides, modular kitchen layouts, small bathroom makeover tips, wardrobe space planning, and premium interior materials for modern homes.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Design Ideas, Home Guides & Modular Living Blog | Status Bath and Kitchen",
    description:
      "Expert space planning tips, ergonomic modular kitchen layouts, luxury bathroom guides, and custom wardrobe insights from Status Bath & Kitchen.",
    url: `${siteUrl}/blog`,
    siteName: "Status Bath and Kitchen",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/site/look-kitchen.jpg",
        width: 1200,
        height: 630,
        alt: "Status Bath and Kitchen - Design Ideas & Living Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Design Ideas & Modular Architecture Blog | Status Bath and Kitchen",
    description:
      "Expert space planning tips, modular kitchen layouts, and luxury bathroom insights from our architects.",
    images: ["/images/site/look-kitchen.jpg"],
  },
};

export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white text-[#76716d]">
          Loading design articles...
        </div>
      }
    >
      <BlogListClient />
    </Suspense>
  );
}
