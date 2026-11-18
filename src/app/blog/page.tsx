import React, { Suspense } from "react";
import type { Metadata } from "next";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "Design Ideas, Home Guides & Interior Trends | Status Bath and Kitchen",
  description:
    "Explore master architectural guides, modular kitchen layouts, small bathroom makeover tips, wardrobe space planning, and premium interior materials for modern Indian homes.",
  openGraph: {
    title: "Design Ideas, Home Guides & Interior Trends | Status Bath and Kitchen",
    description:
      "Explore master architectural guides, modular kitchen layouts, small bathroom makeover tips, wardrobe space planning, and premium interior materials.",
    type: "website",
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

