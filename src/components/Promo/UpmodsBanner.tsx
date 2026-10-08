"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function UpmodsBanner() {
  const { openConsultation } = useCart();

  return (
    <section id="your-way" className="py-8 sm:py-12 lg:py-14 bg-white scroll-mt-24">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-20">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#1c1c1c] tracking-tight">
            Status Kitchens. Designed Your Way!
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Pick the layout, shutters, countertop, appliances and accessories. We plan, supply and install it all.
          </p>
        </div>

        <div
          className="relative w-full aspect-[4/3] sm:aspect-[16/9] bg-[#f5f0ea] cursor-pointer group select-none overflow-hidden"
          onClick={() => openConsultation("Modular Kitchen")}
          role="button"
          tabIndex={0}
          aria-label="Book a modular kitchen design consultation"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              openConsultation("Modular Kitchen");
            }
          }}
        >
          <img
            src="/images/site/banner-kitchen.jpg"
            alt="White modular kitchen with an island, range hood and glass pendant lights"
            className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-[1.01]"
            width={1600}
            height={900}
            loading="lazy"
          />

          <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8">
            <span className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-[#ff5247] group-hover:bg-[#e0453b] text-white font-bold text-xs sm:text-sm rounded-full shadow-lg transition-colors">
              Book a design consultation
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
