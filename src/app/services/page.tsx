import React, { Suspense } from "react";
import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Professional Furniture, Modular Kitchen & Bathroom Care Services | Status Bath and Kitchen",
  description:
    "Explore certified care services by Status & Godrej Interio: repainting, reupholstery, deep sanitization, modular kitchen AMC, space densification, and free in-home 3D design consultation.",
  openGraph: {
    title: "Our Services | Status Bath and Kitchen",
    description:
      "Factory-grade repainting, sofa reupholstery, deep cleaning, annual maintenance contracts (AMC), and modular restoration across India.",
    type: "website",
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

