import React, { Suspense } from "react";
import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://statusbathkitchen.com";

export const metadata: Metadata = {
  title: "Professional Modular Kitchen, Bathroom & Cabinet Care Services",
  description:
    "Explore certified care services by Status Bath and Kitchen: precision repainting, cabinet refurbishing, modular kitchen AMC, deep sanitization, space densification, and in-home 3D design consultation.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Care Services & Annual Maintenance | Status Bath and Kitchen",
    description:
      "Factory-grade repainting, modular kitchen AMC, deep cabinet sanitization, and complimentary 3D design consultations by Status Bath & Kitchen.",
    url: `${siteUrl}/services`,
    siteName: "Status Bath and Kitchen",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero-kitchen.jpg",
        width: 1200,
        height: 630,
        alt: "Status Bath and Kitchen - Care Services & Maintenance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Care Services & Annual Maintenance | Status Bath and Kitchen",
    description:
      "Factory-grade repainting, modular kitchen AMC, cabinet refurbishing, and complimentary 3D consultations.",
    images: ["/images/hero-kitchen.jpg"],
  },
};

export default function ServicesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white text-[#76716d]">
          Loading services...
        </div>
      }
    >
      <ServicesClient />
    </Suspense>
  );
}
