"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const highlights = [
  { value: "10+", label: "Years in Siliguri" },
  { value: "500+", label: "Homes completed" },
  { value: "One team", label: "From design to installation" },
  { value: "Aluminium & uPVC", label: "Window specialists" },
];

export default function AboutSection() {
  return (
    <section
      id="about-us"
      className="status-section py-12 sm:py-16 lg:py-[76px] bg-white scroll-mt-24"
    >
      <div className="status-container max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left: About Copy & CTA */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-medium text-[#ff5d55] uppercase tracking-wider block">
              About Status
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-[28px] font-medium text-[#332f2c] tracking-tight leading-snug">
              Siliguri&apos;s trusted name in modern homes for over 10 years
            </h2>
            <p className="text-xs sm:text-sm text-[#76716d] leading-relaxed max-w-xl font-normal">
              Status Bath &amp; Kitchen has been designing and fitting homes in Siliguri for more
              than a decade. One team handles your modular kitchen, wardrobes, and aluminium and
              uPVC windows. We measure your site, design to your space and lifestyle, and install
              everything ourselves with premium German and Austrian hardware. Hundreds of families
              across North Bengal trust us for spaces that look beautiful and last for years.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="status-btn-outline inline-flex items-center gap-2 px-6 py-2.5 rounded-md border border-[#4a4541] bg-white hover:bg-[#4a4541] text-[#4a4541] hover:text-white font-medium text-xs sm:text-sm transition-colors"
              >
                <span>Know more about us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right: Showroom Interior Image */}
          <div className="lg:col-span-6 relative aspect-[16/10] rounded-lg overflow-hidden bg-stone-100 shadow-xs">
            <Image
              src="/images/site/look-living.jpg"
              alt="Architectural living space with slim-frame aluminium windows and sliding glass doors"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Highlights Stats Strip */}
        <div className="mt-12 pt-8 border-t border-[#eae3da] grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {highlights.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="text-xl sm:text-2xl font-medium text-[#332f2c] tracking-tight">
                {item.value}
              </div>
              <div className="text-xs sm:text-sm text-[#76716d]">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

