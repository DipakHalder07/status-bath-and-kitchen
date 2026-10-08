"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function PromoBanners() {
  const { openConsultation, showToast } = useCart();

  return (
    <section className="w-full space-y-12 py-10 bg-white">
      {/* 2-Column Frosted Split Banners: Kitchens & Home Interiors */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Banner 1: Modular Kitchen */}
          <div
            id="modular-kitchen"
            className="relative rounded-none sm:rounded-sm overflow-hidden aspect-[4/3] sm:aspect-[16/10] bg-stone-900 group shadow-xs flex items-center justify-center p-6 cursor-pointer"
            onClick={() => openConsultation("Modular Kitchen")}
          >
            <img
              src="https://interio.com/media/wysiwyg/Modular_Kitchen_MK.jpg"
              alt="Modular Kitchens"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />

            {/* Centered Frosted Glass Card */}
            <div className="relative z-10 w-full max-w-xs sm:max-w-sm rounded-xl bg-black/40 backdrop-blur-md p-6 sm:p-8 text-center text-white border border-white/10 shadow-xl group-hover:bg-black/50 transition-colors">
              <span className="text-xs uppercase tracking-wider text-white/80 block mb-1">
                Modular Kitchens
              </span>
              <h3 className="text-xl sm:text-2xl font-bold leading-tight mb-4 text-white">
                Looking for a new kitchen?
              </h3>
              <span className="inline-block text-sm font-semibold text-white border-b border-white pb-0.5 hover:text-[#ff5247] hover:border-[#ff5247] transition-colors">
                Book a consultation
              </span>
            </div>
          </div>

          {/* Banner 2: Home Interiors */}
          <div
            id="home-interiors"
            className="relative rounded-none sm:rounded-sm overflow-hidden aspect-[4/3] sm:aspect-[16/10] bg-stone-900 group shadow-xs flex items-center justify-center p-6 cursor-pointer"
            onClick={() => openConsultation("Home Interiors")}
          >
            <img
              src="https://interio.com/media/wysiwyg/Home_Interiors_HI.jpg"
              alt="Home Interiors"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />

            {/* Centered Frosted Glass Card */}
            <div className="relative z-10 w-full max-w-xs sm:max-w-sm rounded-xl bg-black/40 backdrop-blur-md p-6 sm:p-8 text-center text-white border border-white/10 shadow-xl group-hover:bg-black/50 transition-colors">
              <span className="text-xs uppercase tracking-wider text-white/80 block mb-1">
                Home Interiors
              </span>
              <h3 className="text-xl sm:text-2xl font-bold leading-tight mb-4 text-white">
                Looking to design your space?
              </h3>
              <span className="inline-block text-sm font-semibold text-white border-b border-white pb-0.5 hover:text-[#ff5247] hover:border-[#ff5247] transition-colors">
                Book a consultation
              </span>
              <div className="mt-2 text-xs text-white/70">Available in Mumbai</div>
            </div>
          </div>
        </div>
      </div>

      {/* Exchange Banner: Upgrade Your Space, Enjoy hassle free Exchange! */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        <div className="rounded-none sm:rounded-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 bg-[#f5f0ea]">
          {/* Left: Bed Image */}
          <div className="relative aspect-[16/10] sm:aspect-auto">
            <img
              src="https://interio.com/media/wysiwyg/Untitled_design_16_.jpg"
              alt="Exchange Old Furniture"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Right: Copy & Button */}
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-start">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1c1c1c] leading-tight">
              Upgrade Your Space, <br />
              Enjoy hassle free Exchange!
            </h3>
            <p className="text-sm sm:text-base text-gray-700 mt-3 sm:mt-4 font-normal">
              Exchange your old furniture and save up to ₹5000
            </p>
            <div className="mt-6 sm:mt-8">
              <button
                type="button"
                onClick={() => showToast("Opening Furniture Exchange program...")}
                className="px-8 py-3 rounded-md border border-gray-900 bg-white hover:bg-stone-50 text-sm font-bold text-gray-900 transition-colors shadow-2xs cursor-pointer"
              >
                Explore Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
