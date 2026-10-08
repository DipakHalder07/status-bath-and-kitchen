"use client";

import React from "react";
import { ArrowRight, Phone } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function PhilosophySection() {
  const { openConsultation, showToast } = useCart();

  return (
    <section id="philosophy" className="py-16 sm:py-20 bg-white">
      <div id="about" className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        {/* We enhance modern businesses and working environments */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left: Text & Actions */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <div className="text-xs sm:text-sm font-bold text-[#ff5247] uppercase tracking-wide">
              Shop for your business
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1c1c1c] tracking-tight leading-tight">
              We enhance modern businesses and working environments
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl font-normal">
              Your workspace needs to foster collaboration and productivity. We design products and workspaces that do both.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => showToast("Navigating to Interio Commercial B2B solutions...")}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-[#ff5247] hover:bg-[#e0453b] text-white font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer hover:shadow-md"
              >
                <span>Go to business</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => openConsultation("Commercial Workspace")}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md border border-gray-900 bg-white hover:bg-stone-50 text-gray-900 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                <span>Enquire now</span>
                <Phone className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Modern Office Image */}
          <div className="lg:col-span-6 rounded-none sm:rounded-sm overflow-hidden shadow-xs">
            <img
              src="https://interio.com/media/wysiwyg/Untitled_design_50_.jpg"
              alt="Interio Modern Workspace Furniture"
              className="w-full h-auto object-cover hover:scale-101 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
