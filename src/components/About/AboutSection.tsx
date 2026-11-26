"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteBrand } from "@/data/statusData";

export default function AboutSection() {
  return (
    <section
      id="about-us"
      className="status-section py-12 sm:py-16 bg-white border-b border-stone-200/50 scroll-mt-24"
    >
      <div className="status-container max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left: Concise Story & CTA */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-medium text-[#ff5d55] uppercase tracking-wider block">
              About {siteBrand.shortName}
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-[28px] font-medium text-[#332f2c] tracking-tight leading-snug">
              Spaces designed, crafted &amp; installed by one team
            </h2>
            <p className="text-xs sm:text-sm text-[#76716d] leading-relaxed max-w-lg font-normal">
              We bring together modular kitchens, WAW aluminium &amp; Ambiiance uPVC windows,
              wardrobes, glass railings, appliances, and Meshworkz insect blinds — tailored from
              on-site measurement to final installation.
            </p>
            <div className="pt-1">
              <Link
                href="/about"
                className="status-btn-outline inline-flex items-center gap-2 px-6 py-2.5 rounded-md border border-[#4a4541] bg-white hover:bg-[#4a4541] text-[#4a4541] hover:text-white font-medium text-xs sm:text-sm transition-colors"
              >
                <span>Know more about us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right: Single Clean Image */}
          <div className="lg:col-span-6 relative aspect-[16/10] rounded-md overflow-hidden bg-stone-100 shadow-xs">
            <img
              src="/images/site/look-living.jpg"
              alt="Architectural living space with slim-frame aluminium windows and sliding glass doors"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

