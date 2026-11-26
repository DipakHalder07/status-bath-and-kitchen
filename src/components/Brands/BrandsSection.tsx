"use client";

import React from "react";
import Image from "next/image";

interface BrandPartner {
  name: string;
  logo: string;
  specialty: string;
}

const partnerBrands: BrandPartner[] = [
  {
    name: "WAW",
    logo: "/images/brands/waw.webp",
    specialty: "Aluminium Windows",
  },
  {
    name: "Ambiiance",
    logo: "/images/brands/ambiiance.png",
    specialty: "uPVC Windows",
  },
  {
    name: "Meshworkz",
    logo: "/images/brands/meshworkz.png",
    specialty: "Insect Blinds",
  },
  {
    name: "Hafele",
    logo: "/images/brands/hafele.svg",
    specialty: "Architectural Hardware",
  },
  {
    name: "Bosch",
    logo: "/images/brands/bosch.svg",
    specialty: "Built-In Appliances",
  },
  {
    name: "Siemens",
    logo: "/images/brands/siemens.svg",
    specialty: "Kitchen Appliances",
  },
  {
    name: "KAFF",
    logo: "/images/brands/kaff.webp",
    specialty: "Chimneys & Hobs",
  },
];

export default function BrandsSection() {
  return (
    <section
      id="brands"
      className="status-section py-12 sm:py-16 bg-[#fcfaf7] border-t border-stone-200/40 scroll-mt-24"
    >
      <div className="status-container max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-[#ff5d55] uppercase tracking-wider block">
              Authorized Partners
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-[28px] font-medium text-[#332f2c] tracking-tight">
              Brands we work with
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#76716d] max-w-md font-normal">
            Precision hardware, fenestration systems, insect screens, and appliances integrated
            into every custom home we build.
          </p>
        </div>

        {/* 7 Brand Partner Logo Cards (static, no hover state) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {partnerBrands.map((brand) => (
            <div
              key={brand.name}
              className="bg-white border border-[#e6e0d8] rounded-md px-4 py-5 flex flex-col items-center justify-between text-center min-h-[112px]"
            >
              <div className="relative w-full h-11 flex items-center justify-center">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  sizes="160px"
                  className="object-contain p-0.5"
                />
              </div>
              <span className="text-[11px] text-[#76716d] mt-2.5 leading-tight">
                {brand.specialty}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

